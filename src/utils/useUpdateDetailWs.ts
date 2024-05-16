import { useEffect, useRef, useState, useCallback } from "react";
import { bindInfo, waiterId } from "@/hooks/useGlobalState";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getRecoil, setRecoil } from "recoil-nexus";
import { tableId, tableOrderId } from "@/pages/order/hooks/useTableListRecoil";
import { getUuid } from "@/utils/tool";
import Config from "react-native-config";
import { getUniqueSign } from "@/utils";
import { useNavigate } from "react-router-native";
import { ProductDetailModalProps } from "../detail/components/modal";
import store from "@/services/store";
import { homeTableList } from "./useTableListRecoil";

export interface IUpdateFuncs {
  customRegularUpdateFunc?: (msgData: IMsgData) => void;
  updateFunc?: (msgData: IMsgData) => void;
}

export interface IMsgData {
  tableId: string;
  id: string;
  event: "update" | "clear" | "uncommit";
  "Pad-macId": string;
}

let timer: NodeJS.Timer | null = null;
let receiveLock = false;

export const useUpdateDetailWs = (props: IUpdateFuncs = {}) => {
  const websocket = useRef<WebSocket>();
  // const timerRef = useRef<NodeJS.Timer>();
  const [wsKey, setWsKey] = useState<string>();
  const [userId] = useRecoilState(waiterId);
  const accountInfo = getRecoil(bindInfo);
  const wsSign = useRef<string>();
  const navigate = useNavigate();
  const [curTableId] = useRecoilState(tableId);
  const [curOrderId] = useRecoilState(tableOrderId);
  const setTableList = useSetRecoilState(homeTableList);

  const updateTableInfo = useCallback(async () => {
    const [, res] = await store.tableList({});
    setTableList(res);
  }, [setTableList]);

  const regularUpdateFunc = useCallback(
    async (msgData: IMsgData) => {
      let macId = "";
      try {
        macId = await getUniqueSign();
      } catch (err) {}
      if (
        !!macId &&
        !!msgData?.["Pad-macId"] &&
        macId === msgData?.["Pad-macId"]
      )
        return;
      if (
        !!curOrderId &&
        !!curTableId &&
        msgData?.tableId === curTableId &&
        msgData?.id === curOrderId
      ) {
        const modalProps = {
          visible: true,
          title: "温馨提示",
          showCancel: true,
          // showClose: true
        };
        if (msgData?.event === "update") {
          setRecoil(ProductDetailModalProps, {
            ...modalProps,
            content: "当前订单正在其他设备上操作，请刷新并查看最新订单信息",
            type: "warning",
            onConfirm: () => {
              updateTableInfo();
              props?.updateFunc && props?.updateFunc(msgData);
            },
          });
        } else if (msgData?.event === "clear") {
          setRecoil(ProductDetailModalProps, {
            ...modalProps,
            content: "当前订单正在其他设备上操作结账，请联系服务员处理",
            type: "warning",
            onConfirm: () => {
              navigate("/order/table", {
                state: {
                  showPasswordPopup: true,
                },
              });
            },
          });
        }
      }
    },
    [curOrderId, curTableId, navigate, props, updateTableInfo]
  );

  const initWs = useCallback(() => {
    if (!!wsKey) {
      const currentSign = getUuid();
      wsSign.current = currentSign;
      websocket.current = new WebSocket(
        `${Config.BARB_WEBSOCKET_URL}?id=${wsKey}`
      );
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      timer = setInterval(() => {
        if (websocket.current?.readyState === WebSocket.OPEN) {
          console.log("connect");
          websocket.current?.send("connect");
        }
      }, 5000);
      websocket.current.onopen = () => {
        // console.log('open', websocket.current?.readyState);
      };
      websocket.current.onmessage = (e) => {
        if (receiveLock) return;
        receiveLock = true;
        // 节流一秒
        setTimeout(() => (receiveLock = false), 1000);
        const data = { ...JSON.parse(e.data || "{}") };
        console.log("onmessage=========", data);
        regularUpdateFunc(data);
        props?.customRegularUpdateFunc && props?.customRegularUpdateFunc(data);
      };
      websocket.current.onclose = (e) => {
        // console.log('close', websocket.current?.readyState);
        if (currentSign === wsSign.current && e?.code !== 3000) {
          clearInterval(timer as NodeJS.Timer);
          timer = null;
          setTimeout(() => {
            initWs();
          }, 1000);
        }
      };
      websocket.current.onerror = () => {
        console.log("onerror");
        // clearInterval(timer as NodeJS.Timer);
        // initWs();
      };
    }
  }, [props, regularUpdateFunc, wsKey]);

  useEffect(() => {
    if (accountInfo && userId) {
      setWsKey(
        `tableChangeForPad_${accountInfo?.system_book_code}_${accountInfo?.account_num}`
      );
    }
  }, [accountInfo, userId]);

  useEffect(() => {
    //websocket
    if (!wsKey) {
      return;
    }
    if (userId) {
      initWs();
    }
    return () => {
      clearInterval(timer as NodeJS.Timer);
      timer = null;
      // ws不能实例化多个同链接，会掉入断开重连的循环，导致传给ws实例的回调函数混乱，所以必须区分手动关闭，手动关闭的时候不再重连
      websocket.current?.close(3000, "self");
    };
  }, [initWs, userId, wsKey]);
};

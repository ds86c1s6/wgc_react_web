import CreateWebSocket, { IMEvent } from "./createWebsocket";

export const initWebsocket = (userId: string) => {
  const protocol = document.location.protocol;
  const wsHead = protocol === "https" ? "wss:" : "ws:";
  const socket = new CreateWebSocket({ url: wsHead + "//127.0.0.1:8087" });
  // 实例化完成需要主动启动连接
  socket.connect();

  // 连接事件
  socket.addEventListener(IMEvent.CONNECTED, () => {
    // 连接时发送用户的注册信息（或者将token加载连接上）
    const data = JSON.stringify({
      type: IMEvent.USER_REG,
      payload: userId,
    });
    socket?.sendMessage(data);
  });

  // 接收消息事件
  socket.addEventListener(IMEvent.MESSAGE, (data) => {
    console.log("接收消息");
  });

  // 意外断开事件
  socket.addEventListener(IMEvent.DISCONNECTED, () => {
    console.log("意外断开");
  });

  // 主动断开事件
  socket.addEventListener(IMEvent.CLOSE, () => {
    console.log("主动断开");
  });

  // 心跳检测
  socket.addEventListener(IMEvent.HEARTBEAT, () => {
    const data = JSON.stringify({
      type: IMEvent.HEARTBEAT,
      payload: {
        time: new Date().getTime(),
      },
    });
    socket?.sendMessage(data);
  });
  return socket;
};

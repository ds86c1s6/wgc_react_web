/**
 * 网页新消息闪烁功能
 *
 * 启动：message.start(msg)
 * 关闭：message.stop();
 */
import { useState } from "react";

const messageFactory = (
  interval: number = 600
): { isBlink: boolean; startBilnk: Function; stopBlink: Function } => {
  const [isBlink, setIsBlink] = useState<NodeJS.Timer | string>("");
  const oldTitle = document.title;
  let time = 0;
  // 开始闪烁
  const startBilnk = (msg) => {
    isBlink && stopBlink();
    const tmp = setInterval(() => {
      time++;
      document.title = time % 2 === 0 ? oldTitle : msg;
    }, interval);
    setIsBlink(tmp);
  };
  // 结束闪烁
  const stopBlink = () => {
    document.title = oldTitle;
    time = 0;
    clearInterval(isBlink);
    setIsBlink("");
  };
  return { isBlink: !!isBlink, startBilnk, stopBlink };
};

export default messageFactory;

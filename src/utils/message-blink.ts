/**
 * 网页新消息闪烁功能
 *
 * 启动：message.start(msg)
 * 关闭：message.stop();
 */
import { useState } from "react";
const messageFactory = (msg: string, interval: number = 600) => {
  const [isBlink, setIsBlink] = useState<NodeJS.Timer | string>("");
  const oldTitle = document.title;
  const newTitle = msg;
  let time = 0;
  // 开始闪烁
  const startBilnk = () => {
    const tmp: NodeJS.Timer = setInterval(() => {
      time++;
      let title = "";
      if (time % 2 === 0) {
        title = oldTitle;
      } else {
        title = newTitle;
      }
      document.title = title;
    }, interval);
    setIsBlink(tmp);
  };
  // 结束闪烁
  const stopBlink = () => {
    document.title = oldTitle;
    clearInterval(isBlink);
    setIsBlink("");
  };
  return { isBlink: !!isBlink, startBilnk, stopBlink };
};

export default messageFactory;

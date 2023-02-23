/**
 * 网页新消息闪烁功能
 *
 * 启动：message.start(msg)
 * 关闭：message.stop();
 */

const message = {
  timer: null,
  oldTitle: document.title,
  time: 0,
  // 开始闪烁
  start: (msg, intervalTime = 600) => {
    message.timer = setInterval(() => {
      message.time++;
      let title = "";
      if (message.time % 2 === 0) {
        title = message.oldTitle;
      } else {
        title = msg;
      }
      document.title = title;
    }, intervalTime);
  },
  // 结束闪烁
  stop: () => {
    document.title = message.oldTitle;
    clearInterval(message.timer);
    message.timer = null;
  },
};

export default message;

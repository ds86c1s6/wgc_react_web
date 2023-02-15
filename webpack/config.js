const os = require("os");

// 获取可远程访问网络ip
const getNetworkIp = () => {
  let hostip = "";
  try {
    // 获取网络接口对象
    const network = os.networkInterfaces();
    Object.values(network).forEach((i) => {
      i.forEach((subi) => {
        if (
          subi.family === "IPv4" &&
          subi.address !== "127.0.0.1" &&
          !subi.internal // 可远程访问
        ) {
          hostip = subi.address;
        }
      });
    });
    if (!hostip) {
      hostip = "localhost";
    }
  } catch (e) {
    hostip = "localhost";
  }
};

module.exports = {
  // 获取可远程访问网络ip
  getNetworkIp,
  isProd: process.env.NODE_ENV === "prod",
  isSit: process.env.NODE_ENV === "sit",
  isDev: process.env.NODE_ENV === "dev",
};

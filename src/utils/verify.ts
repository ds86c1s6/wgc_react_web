export type RegVerify = (value: string) => boolean;

// 邮箱
export const isEmail: RegVerify = (value) =>
  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value);

// 手机号
export const isPhoneNumber: RegVerify = (value) => /^1[0-9]{10}$/.test(value);

// 身份证号
export const isIdCard: RegVerify = (value) =>
  /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
    value
  );

// 是否是ios设备
export const isIOS = (): boolean => {
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
};

// 是否是安卓设备
export const isAndroid = (): boolean => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
  return isAndroid;
};

// 是否是移动设备
export const isMobile = (): boolean => {
  const userAgent = navigator.userAgent;
  const agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  return agents.some((i) => userAgent.includes(i));
};

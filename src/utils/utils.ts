// 手机号脱敏
export const desensitizePhone = (phone: string) => {
  const reg = /(\d{3})\d{4}(\d{4})/;
  return phone.replace(reg, "$1****$2");
};

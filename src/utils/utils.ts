// 手机号脱敏
export const desensitizePhone = (phone: string) => {
  const reg = /(\d{3})\d{4}(\d{4})/;
  return phone.replace(reg, "$1****$2");
};

/**
 *
 * @param promise
 * @param errorText
 * @returns
 * const [err, data] = await to(getUserInfo());
 */
export const to = <T, U = Error>(
  promise: Promise<T>,
  errorText?: object
): Promise<[U, undefined] | [null, T]> => {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorText) {
        const parsedError = Object.assign({}, err, errorText);
        return [parsedError, undefined];
      }
      return [err, undefined];
    });
};

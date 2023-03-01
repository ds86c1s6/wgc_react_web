import { fileToBase64 } from "./file";

// 根据图片路径转为base64
export function imgUrlToBase64(
  url: string,
  option?: { width: number; fileType?: string; quality?: number }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const width = option?.width;
    const fileType = option?.fileType ?? "image/png";
    const quality = option?.quality ?? 0.92;
    const image = new Image();
    image.setAttribute("crossOrigin", "Anonymous");
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = image.width / image.height;
      canvas.width = width ?? image.width;
      canvas.height = width ? parseInt(`${width / scale}`) : image.height;
      const context = canvas.getContext("2d");
      context?.clearRect(0, 0, canvas.width, canvas.height);
      context?.drawImage(image, 0, 0, canvas.width, canvas.height);
      // canvas接口压缩
      const res = canvas.toDataURL(fileType, quality);
      resolve(res);
    };
    image.onerror = (error) => reject(error);
    image.src = url;
  });
}

interface PressImg {
  file: File; // 图片文件
  width?: number; // 宽
  quality?: number; // 压缩后的图片质量，默认0.92
}
// 压缩file类型图片文件，返回base64
export function pressImg(params: PressImg): Promise<string | null> {
  return new Promise(async (resolve, reject) => {
    const width = params?.width;
    const quality = params?.quality ?? 0.92;
    const fileType = params?.file?.type;
    const file = params.file;
    if (!file || fileType.indexOf("image") === -1) return resolve(null);
    try {
      // 文件类型转为base64
      const base64 = await fileToBase64(file);
      // base64压缩
      const pressedBase64 = await imgUrlToBase64(base64, {
        width,
        fileType,
        quality,
      });
      resolve(pressedBase64);
    } catch (error) {
      reject(error);
    }
  });
}

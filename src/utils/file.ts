// https://blog.51cto.com/hefeng6500/3089448  xhr下各对象
// https://juejin.cn/post/7224456119439917117  文件系统

// base64转Arraybuffer
export function base64ToArraybuffer(data: string): Uint8Array {
  if (!data) return;
  const stringBase64 = data.split(",")[1];
  // 解码
  const byteString = window.atob(stringBase64);
  const len = byteString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = byteString.charCodeAt(i);
  }
  return bytes;
}

// base64转Blob
export function base64ToBlob(data: string): Blob {
  if (!data) return;
  const arrayBuffer = base64ToArraybuffer(data);
  const contentType = data[0].split(":")[1];
  return new Blob([arrayBuffer], { type: contentType });
}

// base64转File
export function base64ToFile(data: string, filename: string): File {
  if (!data) return;
  const arrayBuffer = base64ToArraybuffer(data);
  const contentType = data[0].split(":")[1];
  return new File([arrayBuffer], filename, { type: contentType });
}

// blob/file转base64
export function fileToBase64(data: Blob | File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(<string>e.target.result);
    };
    fileReader.readAsDataURL(data);
    fileReader.onerror = () => {
      reject(new Error("file to Base64 error"));
    };
  });
}

// 下载文件
export const download = (data: Blob, filename: string, mime: string) => {
  const blob = new Blob([data], { type: mime || "application/octet-stream" });
  if (typeof (window.navigator as any).msSaveBlob !== "undefined") {
    (window.navigator as any).msSaveBlob(blob, filename);
  } else {
    const blobURL =
      window.URL && window.URL.createObjectURL
        ? window.URL.createObjectURL(blob)
        : window.webkitURL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", filename);

    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    document.body.appendChild(tempLink);
    tempLink.click();

    setTimeout(function () {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }, 200);
  }
};

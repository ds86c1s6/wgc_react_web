// 获取该目录下所有model的集合
const context = require['context']('./', true, /\.ts$/);
export default context.keys().filter((i: string) => {
  // 只导出model文件
  if(context(i) && context(i).default && context(i).default.namespace) {
    return true;
  }
  return false
}).map((key:string) => context(key))
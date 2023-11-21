/**
将数据转成Map存储再进行处理，根据如下代码可知，实现结构转变只需要循环一次，并且这种方式的时间复杂度为O(n) ，空间复杂度为O(n)，比递归的性能要好很多，我们项目中肯定是追求性能最优。具体实现思路如下：
声明一个空数组result存放结果，声明一个Map对象存放以id为key，以{ ...item, children: [] }为value的数据
对数组for...of 循环
循环中，itemMap存储数据Map数据，并为每一项创建children属性
pid为0说明是根数据，把pid为0的这一项放到result中
pid不为0说明该项为子数据且已存在父级数据（因为itemMap(pid)存在），所以只需要把该项数据push到父级数据的children属性。
 */
function recurrenceFilter(data) {
  const result = []; // 存放结果集
  const itemMap = {}; //
  for (const item of data) {
    itemMap[item.id] = { ...item, children: [] };
    const id = item.id;
    const pid = item.pid;
    const treeItem = itemMap[id];
    if (pid === 0) {
      result.push(treeItem);
    } else {
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}

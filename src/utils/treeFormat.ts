/**
 * 将特定的扁平结构数组转为树形结构
 * @param {Array} list 数组
 * @param {Object} options 数组中每个数据项的标识，父节点标识，子节点标书数组
 */
export function transformTree(list, options = {}) {
  const {
    key = 'id',
    child = 'children',
    parent = 'parent'
  } = options;

  const tree = [];
  const record = {};

  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i];
    const id = item[key];

    if (!id) {
      continue;
    }

    if (record[id]) {
      item[child] = record[id];
    } else {
      item[child] = record[id] = [];
    }

    if (item[parent]) {
      const parentId = item[parent];

      if (!record[parentId]) {
        record[parentId] = [];
      }

      record[parentId].push(item);
    } else {
      tree.push(item);
    }
  }

  return tree;
}

/**
 * 将树形结构转成扁平化数组
 * @param {Array} sourceTree tree的数据源 
 * @param {*} uniqueKey  唯一键，根据该key值转换
 */
export const FlatTreeToArr = (source) => {
  const flatData = [];
  for (let i = 0; i < source.length; i++) {
    flatData.push(source[i]);
    if (source[i].children?.length) {
      const result = FlatTreeToArr(source[i].children);
      flatData.push(...result);
    }
  }
  return flatData;
};



/**
 * 获取指定值所在的tree的所有上级
 * 返回指定parent的key集合
 * @param {object} options 对应配置
 *      source  数据源
 *      targetKey 查找值的字段名
 *      targetValue 查找的值
 *      parentKey 对应上级的字段名
 */
export const GetTreeTargetParents = (options = {}) => {
  options = {
    source: [],
    targetKey: 'id',
    targetValue: '',
    parentKey: 'parentId',
    ...options
  };
  const { source, targetKey, targetValue, parentKey } = options;
  if (!targetValue) return [];
  let parentList = [];
  let allList = FlatTreeToArr(source);
  const findTargetInArr = (value) => {
    const targetItem = allList.find((item) => item[targetKey] === value);
    if (targetItem) {
      parentList.push(targetItem);
      findTargetInArr(targetItem[parentKey]);
    }
  };
  findTargetInArr(targetValue);
  return parentList;
};
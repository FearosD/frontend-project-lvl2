import _ from 'lodash';

const getStatusKey = (obj1, obj2, key) => {
  const obj1HasKey = _.has(obj1, key);
  const obj2HasKey = _.has(obj2, key);
  if (!obj1HasKey) return 'added';
  if (!obj2HasKey) return 'deleted';
  if (_.isEqual(obj1[key], obj2[key])) return 'unchanged';
  if (_.isObject(obj1[key]) && _.isObject(obj2[key])) return 'new tree';
  return 'changed';
};

const getValue = (obj1, obj2, key) => {
  const mergeObject = { ...obj1, ...obj2 };
  const status = getStatusKey(obj1, obj2, key);
  if (status !== 'changed') return mergeObject[key];
  const oldValue = obj1[key];
  const newValue = obj2[key];
  return { oldValue, newValue };
};

const generateTree = (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 });
  const sortedKeys = _.sortBy(keys);
  const arraygDiff = sortedKeys.map((key) => {
    const tree = {
      key,
      status: getStatusKey(file1, file2, key),
      value:
        getStatusKey(file1, file2, key) === 'new tree'
          ? generateTree(file1[key], file2[key])
          : getValue(file1, file2, key),
    };

    return tree;
  });
  return arraygDiff;
};

export default generateTree;

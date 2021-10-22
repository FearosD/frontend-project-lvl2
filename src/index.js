import parser from './parser.js';
import generateTree from './tree.js';
import stringifyDiff from './formatter.js';

const gendiff = (filepath1, filepath2) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  const tree = generateTree(file1, file2);
  const stringDiff = stringifyDiff(tree);
  return stringDiff;
};

export default gendiff;

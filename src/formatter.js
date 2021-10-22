import _ from 'lodash';

const setSymbol = (node) => {
  let symbol = '';
  const { status } = node;
  switch (status) {
    case 'added':
      symbol = '+ ';
      break;
    case 'deleted':
      symbol = '- ';
      break;
    case 'unchanged':
      symbol = '  ';
      break;
    default:
      symbol = '';
  }
  return symbol;
};

const spacer = (n) => ' '.repeat(n);

const setChangedString = (node, n) => {
  const { oldValue, newValue } = node.value;
  return `${spacer(n)}- ${node.key}: ${oldValue} \n${spacer(n)}+ ${
    node.key
  }: ${newValue}`;
};

const setValueObjectString = (node, n) => {
  const entries = Object.entries(node);
  const stringArray = entries.map(([key, value]) => {
    const str = _.isObject(value)
      ? `${spacer(n + 2)}${key}: {\n${setValueObjectString(value, n + 2)}`
      : `${spacer(n + 2)}${key}: ${value}`;
    return str;
  });
  const string = stringArray.join('\n');
  return `${string}\n${spacer(n)}}`;
};

const stringifyDiff = (tree) => {
  const iter = (nodes, n) => {
    const stringArray = nodes.map((node) => {
      const { status } = node;
      const symbol = setSymbol(node);
      const { key } = node;
      const { value } = node;
      if (status === 'new tree') return `${spacer(n + 2)}${key}: {\n${iter(value, n + 2)}\n${spacer(n + 2)}}`;
      if (status !== 'changed') {
        return _.isObject(value)
          ? `${spacer(n)}${symbol}${key}: {\n${setValueObjectString(value, n + 2)}`
          : `${spacer(n)}${symbol}${key}: ${value}`;
      }
      return setChangedString(node, n);
    });
    const string = stringArray.join('\n');
    return `${string}`;
  };
  return `{\n${iter(tree, 2)}\n}`;
};

export default stringifyDiff;

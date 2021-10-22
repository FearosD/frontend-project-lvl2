import * as fs from 'fs';
import path from 'path';

const parser = (filepath) => {
  const file = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const fileJson = JSON.parse(file);
  return fileJson;
};

export default parser;

#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import gendiff from '../src/index.js';

const program = new Command();
program.description('Compares two configuration files and shows a difference.');
program.version('0.0.1', '-v, --version', 'output the version number');
program.option('-f, --format [type]', 'output format');
program.arguments('<filepath1> <filepath2>');
program.action((filepath1, filepath2) => console.log(gendiff(filepath1, filepath2)));
program.parse();

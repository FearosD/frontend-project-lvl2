install:
	npm ci

gendiff:
	node bin/gendiff.js

json:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json 

publish:
	npm publish --dry-run

lint:
	npx eslint .
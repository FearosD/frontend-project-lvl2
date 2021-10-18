install:
	npm ci

gendiff:
	node --experimental-vm-modules bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .
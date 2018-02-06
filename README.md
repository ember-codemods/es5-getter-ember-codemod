# ecma5-getter-ember-codemod

This codemod is intended to automatically convert your usage of `get`, and `getProperties` to use traditional object dot notation as proposed by [emberjs/rfcs#281](https://github.com/emberjs/rfcs/blob/master/text/0281-es5-getters.md).

## Installation

ecma5-getter-ember-codemod itself doesn't need to be installed, but you need to install jscodeshift to run the codemod script:

```
npm install -g jscodeshift
```

`jscodeshift -t https://rawgit.com/rondale-sc/ecma5-getter-ember-codemod/master/ecma5-getter-ember-codemod.js ./app`

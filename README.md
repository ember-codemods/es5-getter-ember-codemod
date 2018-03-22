es5-getter-ember-codemod
==============================================================================

[![Build Status](https://travis-ci.org/rondale-sc/es5-getter-ember-codemod.svg?branch=master)](https://travis-ci.org/rondale-sc/es5-getter-ember-codemod)

This codemod is intended to automatically convert your usage of `get`, and
`getProperties` to use traditional object dot notation as proposed by
[emberjs/rfcs#281](https://github.com/emberjs/rfcs/blob/master/text/0281-es5-getters.md).

Special thanks to @rwjblue, @iezer, and @tbieniek for reviewing my original
test cases.


Installation
------------------------------------------------------------------------------

`es5-getter-ember-codemod` itself doesn't need to be installed, but you need to
install [`jscodeshift`](https://github.com/facebook/jscodeshift) to run the
codemod script:

```
npm install -g jscodeshift
```


Usage
------------------------------------------------------------------------------

You can clone/download this repository or just run the codemods from URL like
shown in the following example:

```
jscodeshift -t https://rawgit.com/rondale-sc/es5-getter-ember-codemod/master/es5-getter-ember-codemod.js ./app
```


Transforms
------------------------------------------------------------------------------

### foo.get('bar') -> foo.bar

Transforms `get()` method calls on objects (only for `this` and variables
called `controller` or `route`).

**Before:**

```js
this.get('fullName');

controller.get('fullName');

model.get('fullName');

route.get('fullName');
```

**After:**

```js
this.fullName;

controller.fullName;

model.get('fullName');

route.fullName;
```


### Ember.get(foo, 'bar') -> foo.bar

Transforms `Ember.get()` (or `get()` from `@ember/object`) calls (only
for `this` as first argument).

**Before:**

```js
import Ember from 'ember';
import { get } from '@ember/object'

let foo = get(this, 'foo');
let foo = get(this, 'foo.bar');

let foo = Ember.get(this, 'foo');
let foo = Ember.get(this, 'foo.bar');

let obj = { bar: 'baz' };
let bar = get(obj, 'bar');
```

**After:**

```js
import Ember from 'ember';
import { get } from '@ember/object'

let foo = this.foo;
let foo = get(this, 'foo.bar');

let foo = this.foo;
let foo = Ember.get(this, 'foo.bar');

let obj = { bar: 'baz' };
let bar = get(obj, 'bar');
```


### let { bar, baz } = foo.getProperties('bar', 'baz') -> let { bar, baz } = this

Transforms `getProperties()` method calls on objects (only for
destructuring operations and not for nested paths).

**Before:**

```js
let { foo, bar, baz } = this.getProperties('foo', 'bar', 'baz');

let { foo, barBaz } = this.getProperties('foo', 'bar.baz');
```

**After:**

```js
let { foo, bar, baz } = this;

let { foo, barBaz } = this.getProperties('foo', 'bar.baz');
```

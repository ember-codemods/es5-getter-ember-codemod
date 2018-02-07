# ecma5-getter-ember-codemod

This codemod is intended to automatically convert your usage of `get`, and `getProperties` to use traditional object dot notation as proposed by [emberjs/rfcs#281](https://github.com/emberjs/rfcs/blob/master/text/0281-es5-getters.md).


Special thanks to @rwjblue, @iezer, and @tbieniek for reviewing my original test cases.

## Installation

ecma5-getter-ember-codemod itself doesn't need to be installed, but you need to install jscodeshift to run the codemod script:

```
npm install -g jscodeshift
```

`jscodeshift -t https://rawgit.com/rondale-sc/ecma5-getter-ember-codemod/master/ecma5-getter-ember-codemod.js ./app`

## Transforms
**(may not be up to date / check __testfixtures__):**


Before:

```js
let chancancode = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

chancancode.get('fullName');

let model = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

model.get('fullName');

let route = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

route.get('fullName');

let controller = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

controller.get('fullName');

```

*After:*

```js
let chancancode = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

chancancode.get('fullName');

let model = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

model.fullName;

let route = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

route.fullName;

let controller = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

controller.fullName;
```

---

Before:

```js
import Object, { computed } from '@ember/object';

const Person = Object.extend({
  fullName: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});
```

*After:*

```js
import Object, { computed } from '@ember/object';

const Person = Object.extend({
  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  })
});
```

---

Before:

```js
let { firstName, lastName, fullName } = chancancode.getProperties('firstName', 'lastName', 'fullName');
```

*After:*

```js
let { firstName, lastName, fullName } = chancancode;
```

---

Before:

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

*After:*

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

---

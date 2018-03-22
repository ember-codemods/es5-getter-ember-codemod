# es5-getter-ember-codemod

This codemod is intended to automatically convert your usage of `get`, and `getProperties` to use traditional object dot notation as proposed by [emberjs/rfcs#281](https://github.com/emberjs/rfcs/blob/master/text/0281-es5-getters.md).


Special thanks to @rwjblue, @iezer, and @tbieniek for reviewing my original test cases.

## Installation

es5-getter-ember-codemod itself doesn't need to be installed, but you need to install jscodeshift to run the codemod script:

```
npm install -g jscodeshift
```

`jscodeshift -t https://rawgit.com/rondale-sc/ecma5-getter-ember-codemod/master/es5-getter-ember-codemod.js ./app`

## Transforms
**(may not be up to date / check __testfixtures__):**

*Transforms `get`s on standalone objects that call get only when their variables are set to `controller` or `route`.  (or `this`)*

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

chancancode.fullName;

let model = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

model.get('fullName');

let route = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

route.fullName;

let controller = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

controller.fullName;
```

---

*Tranforms `get`s on `this`.*

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

*Transforms standalone `get` when import is detected from `@ember/object`.  Also transforms `Ember.get`s.*

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

*Transforms `getProperties` when part of an assignment **AND** not nested path*

Before:

```js
let { foo, bar, baz } = this.getProperties('foo', 'bar', 'baz');

let { foo, barBaz } = this.getProperties('foo', 'bar.baz');
```

*After:*

```js
let { foo, bar, baz } = this;

let { foo, barBaz } = this.getProperties('foo', 'bar.baz');
```

---

*Does not transform nested paths.*

Before:

```js
this.get('foo.bar.baz');

let model = Object.create({foo: { bar: 'baz' }});

model.get('foo.bar');
```

*After:*

```js
this.get('foo.bar.baz');

let model = Object.create({foo: { bar: 'baz' }});

model.get('foo.bar');
```
---

*Does not change `getProperties` when it is not part of an assignment.*

Before:

```js
let { firstName, lastName, fullName } = this;

let { firstName, lastName, fullName } = chancancode;

Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), { firstName: 'bob' });
```

*After:*

```js
let { firstName, lastName, fullName } = this;

let { firstName, lastName, fullName } = chancancode;

Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), { firstName: 'bob' });
```

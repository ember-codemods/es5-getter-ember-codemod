# es5-getter-ember-codemod


## Usage

```
npx es5-getter-ember-codemod es5-getter-ember-codemod path/of/files/ or/some**/*glob.js

# or

yarn global add es5-getter-ember-codemod
es5-getter-ember-codemod es5-getter-ember-codemod path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [does-not-transform-full-path-ts](#does-not-transform-full-path-ts)
* [does-not-transform-full-path](#does-not-transform-full-path)
* [does-not-transform-http-stubs](#does-not-transform-http-stubs)
* [get-on-ember-object-ts](#get-on-ember-object-ts)
* [get-on-ember-object](#get-on-ember-object)
* [get-on-this-expression-ts](#get-on-this-expression-ts)
* [get-on-this-expression](#get-on-this-expression)
* [getProperties-on-ember-object-ts](#getProperties-on-ember-object-ts)
* [getProperties-on-ember-object](#getProperties-on-ember-object)
* [standalone-ember-get-ts](#standalone-ember-get-ts)
* [standalone-ember-get](#standalone-ember-get)
* [this-dot-getProperties-ts](#this-dot-getProperties-ts)
* [this-dot-getProperties](#this-dot-getProperties)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="does-not-transform-full-path-ts">**does-not-transform-full-path-ts**</a>

**Input** (<small>[does-not-transform-full-path-ts.input.ts](transforms/es5-getter-ember-codemod/__testfixtures__/does-not-transform-full-path-ts.input.ts)</small>):
```ts
class Thing {
  doesNotTransform() {
    this.get('foo.bar.baz');

    let model = Object.create({ foo: { bar: 'baz' } });

    model.get('foo.bar');
  }
}

```

**Output** (<small>[does-not-transform-full-path-ts.output.ts](transforms/es5-getter-ember-codemod/__testfixtures__/does-not-transform-full-path-ts.output.ts)</small>):
```ts
class Thing {
  doesNotTransform() {
    this.get('foo.bar.baz');

    let model = Object.create({ foo: { bar: 'baz' } });

    model.get('foo.bar');
  }
}

```
---
<a id="does-not-transform-full-path">**does-not-transform-full-path**</a>

**Input** (<small>[does-not-transform-full-path.input.js](transforms/es5-getter-ember-codemod/__testfixtures__/does-not-transform-full-path.input.js)</small>):
```js
this.get('foo.bar.baz');

let model = Object.create({foo: { bar: 'baz' }});

model.get('foo.bar');

```

**Output** (<small>[does-not-transform-full-path.output.js](transforms/es5-getter-ember-codemod/__testfixtures__/does-not-transform-full-path.output.js)</small>):
```js
this.get('foo.bar.baz');

let model = Object.create({foo: { bar: 'baz' }});

model.get('foo.bar');

```
---
<a id="does-not-transform-http-stubs">**does-not-transform-http-stubs**</a>

**Input** (<small>[does-not-transform-http-stubs.input.js](transforms/es5-getter-ember-codemod/__testfixtures__/does-not-transform-http-stubs.input.js)</small>):
```js
this.get('foo/:id', (schema, { params }) => {
});

this.get('/some/url', function(req) {
  return req;
});

```

**Output** (<small>[does-not-transform-http-stubs.output.js](transforms/es5-getter-ember-codemod/__testfixtures__/does-not-transform-http-stubs.output.js)</small>):
```js
this.get('foo/:id', (schema, { params }) => {
});

this.get('/some/url', function(req) {
  return req;
});

```
---
<a id="get-on-ember-object-ts">**get-on-ember-object-ts**</a>

**Input** (<small>[get-on-ember-object-ts.input.ts](transforms/es5-getter-ember-codemod/__testfixtures__/get-on-ember-object-ts.input.ts)</small>):
```ts
class Things {
  objectLookup() {
    let chancancode = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

    chancancode.get('fullName');
  }

  modelLookup() {
    let model = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

    model.get('fullName');
  }

  routeLookup() {
    let route = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

    route.get('fullName');
  }

  controllerLookup() {
    let controller = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

    controller.get('fullName');
    controller.get('foo.bar');
    controller.get('foo-bar');
  }
}

```

**Output** (<small>[get-on-ember-object-ts.output.ts](transforms/es5-getter-ember-codemod/__testfixtures__/get-on-ember-object-ts.output.ts)</small>):
```ts
class Things {
  objectLookup() {
    let chancancode = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

    chancancode.get('fullName');
  }

  modelLookup() {
    let model = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

    model.get('fullName');
  }

  routeLookup() {
    let route = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

    route.fullName;
  }

  controllerLookup() {
    let controller = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

    controller.fullName;
    controller.get('foo.bar');
    controller['foo-bar'];
  }
}
```
---
<a id="get-on-ember-object">**get-on-ember-object**</a>

**Input** (<small>[get-on-ember-object.input.js](transforms/es5-getter-ember-codemod/__testfixtures__/get-on-ember-object.input.js)</small>):
```js
let chancancode = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

chancancode.get('fullName');

let model = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

model.get('fullName');

let route = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

route.get('fullName');

let controller = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

controller.get('fullName');
controller.get('foo.bar');
controller.get('foo-bar');

```

**Output** (<small>[get-on-ember-object.output.js](transforms/es5-getter-ember-codemod/__testfixtures__/get-on-ember-object.output.js)</small>):
```js
let chancancode = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

chancancode.get('fullName');

let model = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

model.get('fullName');

let route = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

route.fullName;

let controller = Person.create({ firstName: 'Godfrey', lastName: 'Chan' });

controller.fullName;
controller.get('foo.bar');
controller['foo-bar'];

```
---
<a id="get-on-this-expression-ts">**get-on-this-expression-ts**</a>

**Input** (<small>[get-on-this-expression-ts.input.ts](transforms/es5-getter-ember-codemod/__testfixtures__/get-on-this-expression-ts.input.ts)</small>):
```ts
import Object from '@ember/object';
import { computed } from '@ember-decorators/object';

class Person extends Object {
  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }

  invalidIdentifier() {
    return this.get('foo-bar');
  }

  numericKey() {
    return this.get(42);
  }

  templatedKey() {
    return this.get(`${'foo'}`);
  }
}

```

**Output** (<small>[get-on-this-expression-ts.output.ts](transforms/es5-getter-ember-codemod/__testfixtures__/get-on-this-expression-ts.output.ts)</small>):
```ts
import Object from '@ember/object';
import { computed } from '@ember-decorators/object';

class Person extends Object {
  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  invalidIdentifier() {
    return this['foo-bar'];
  }

  numericKey() {
    return this.get(42);
  }

  templatedKey() {
    return this.get(`${'foo'}`);
  }
}
```
---
<a id="get-on-this-expression">**get-on-this-expression**</a>

**Input** (<small>[get-on-this-expression.input.js](transforms/es5-getter-ember-codemod/__testfixtures__/get-on-this-expression.input.js)</small>):
```js
import Object from '@ember/object';
import { computed } from '@ember-decorators/object';

class Person extends Object {
  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }

  invalidIdentifier() {
    return this.get('foo-bar');
  }

  numericKey() {
    return this.get(42);
  }

  templatedKey() {
    return this.get(`${'foo'}`);
  }
}

```

**Output** (<small>[get-on-this-expression.output.js](transforms/es5-getter-ember-codemod/__testfixtures__/get-on-this-expression.output.js)</small>):
```js
import Object from '@ember/object';
import { computed } from '@ember-decorators/object';

class Person extends Object {
  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  invalidIdentifier() {
    return this['foo-bar'];
  }

  numericKey() {
    return this.get(42);
  }

  templatedKey() {
    return this.get(`${'foo'}`);
  }
}

```
---
<a id="getProperties-on-ember-object-ts">**getProperties-on-ember-object-ts**</a>

**Input** (<small>[getProperties-on-ember-object-ts.input.ts](transforms/es5-getter-ember-codemod/__testfixtures__/getProperties-on-ember-object-ts.input.ts)</small>):
```ts
class Thing {
  getPropertiesMethod(chancancode) {
    let { firstName, lastName, fullName } = chancancode.getProperties(
      'firstName',
      'lastName',
      'fullName'
    );

    Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), {
      firstName: 'bob'
    });
  }

  thisGetPropertiesMethod() {
    let { firstName, lastName, fullName } = this.getProperties(
      'firstName',
      'lastName',
      'fullName'
    );

    Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), {
      firstName: 'bob'
    });
  }
}

```

**Output** (<small>[getProperties-on-ember-object-ts.output.ts](transforms/es5-getter-ember-codemod/__testfixtures__/getProperties-on-ember-object-ts.output.ts)</small>):
```ts
class Thing {
  getPropertiesMethod(chancancode) {
    let { firstName, lastName, fullName } = chancancode;

    Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), {
      firstName: 'bob'
    });
  }

  thisGetPropertiesMethod() {
    let { firstName, lastName, fullName } = this;

    Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), {
      firstName: 'bob'
    });
  }
}

```
---
<a id="getProperties-on-ember-object">**getProperties-on-ember-object**</a>

**Input** (<small>[getProperties-on-ember-object.input.js](transforms/es5-getter-ember-codemod/__testfixtures__/getProperties-on-ember-object.input.js)</small>):
```js
class Thing {
  getPropertiesMethod(chancancode) {
    let { firstName, lastName, fullName } = chancancode.getProperties(
      'firstName',
      'lastName',
      'fullName'
    );

    Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), {
      firstName: 'bob'
    });
  }

  thisGetPropertiesMethod() {
    let { firstName, lastName, fullName } = this.getProperties(
      'firstName',
      'lastName',
      'fullName'
    );

    Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), {
      firstName: 'bob'
    });
  }
}

```

**Output** (<small>[getProperties-on-ember-object.output.js](transforms/es5-getter-ember-codemod/__testfixtures__/getProperties-on-ember-object.output.js)</small>):
```js
class Thing {
  getPropertiesMethod(chancancode) {
    let { firstName, lastName, fullName } = chancancode;

    Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), {
      firstName: 'bob'
    });
  }

  thisGetPropertiesMethod() {
    let { firstName, lastName, fullName } = this;

    Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), {
      firstName: 'bob'
    });
  }
}

```
---
<a id="standalone-ember-get-ts">**standalone-ember-get-ts**</a>

**Input** (<small>[standalone-ember-get-ts.input.ts](transforms/es5-getter-ember-codemod/__testfixtures__/standalone-ember-get-ts.input.ts)</small>):
```ts
import Ember from 'ember';
import { get } from '@ember/object'

let foo1 = get(this, 'foo');
let foo2 = get(this, 'foo.bar');
let foo3 = get(this, 'foo-bar');
let foo4 = get(this, 42);

let foo5 = Ember.get(this, 'foo');
let foo6 = Ember.get(this, 'foo.bar');
let foo7 = Ember.get(this, 'foo-bar');
let foo8 = Ember.get(this, `${'foo'}.bar`);

let obj = { bar: 'baz' };
let bar = get(obj, 'bar');

```

**Output** (<small>[standalone-ember-get-ts.output.ts](transforms/es5-getter-ember-codemod/__testfixtures__/standalone-ember-get-ts.output.ts)</small>):
```ts
import Ember from 'ember';
import { get } from '@ember/object'

let foo1 = this.foo;
let foo2 = get(this, 'foo.bar');
let foo3 = this['foo-bar'];
let foo4 = get(this, 42);

let foo5 = this.foo;
let foo6 = Ember.get(this, 'foo.bar');
let foo7 = this['foo-bar'];
let foo8 = Ember.get(this, `${'foo'}.bar`);

let obj = { bar: 'baz' };
let bar = get(obj, 'bar');

```
---
<a id="standalone-ember-get">**standalone-ember-get**</a>

**Input** (<small>[standalone-ember-get.input.js](transforms/es5-getter-ember-codemod/__testfixtures__/standalone-ember-get.input.js)</small>):
```js
import Ember from 'ember';
import { get } from '@ember/object'

let foo1 = get(this, 'foo');
let foo2 = get(this, 'foo.bar');
let foo3 = get(this, 'foo-bar');
let foo4 = get(this, 42);

let foo5 = Ember.get(this, 'foo');
let foo6 = Ember.get(this, 'foo.bar');
let foo7 = Ember.get(this, 'foo-bar');
let foo8 = Ember.get(this, `${'foo'}.bar`);

let obj = { bar: 'baz' };
let bar = get(obj, 'bar');

```

**Output** (<small>[standalone-ember-get.output.js](transforms/es5-getter-ember-codemod/__testfixtures__/standalone-ember-get.output.js)</small>):
```js
import Ember from 'ember';
import { get } from '@ember/object'

let foo1 = this.foo;
let foo2 = get(this, 'foo.bar');
let foo3 = this['foo-bar'];
let foo4 = get(this, 42);

let foo5 = this.foo;
let foo6 = Ember.get(this, 'foo.bar');
let foo7 = this['foo-bar'];
let foo8 = Ember.get(this, `${'foo'}.bar`);

let obj = { bar: 'baz' };
let bar = get(obj, 'bar');

```
---
<a id="this-dot-getProperties-ts">**this-dot-getProperties-ts**</a>

**Input** (<small>[this-dot-getProperties-ts.input.ts](transforms/es5-getter-ember-codemod/__testfixtures__/this-dot-getProperties-ts.input.ts)</small>):
```ts
class Thing {
  thisDotGetPropertiesMethod() {
    let { foo, bar, baz } = this.getProperties('foo', 'bar', 'baz');
  }

  nestedGetPropertiesMethod() {
    let { foo, bar, baz } = this.nested.object.getProperties(
      'foo',
      'bar',
      'baz'
    );
  }

  thisDotGetPropertiesMethod2() {
    let { foo, barBaz } = this.getProperties('foo', 'bar.baz');
  }

  thisDotGetPropertiesMethod3() {
    let foo = this.getProperties('bar', 'baz');
  }
}

```

**Output** (<small>[this-dot-getProperties-ts.output.ts](transforms/es5-getter-ember-codemod/__testfixtures__/this-dot-getProperties-ts.output.ts)</small>):
```ts
class Thing {
  thisDotGetPropertiesMethod() {
    let { foo, bar, baz } = this;
  }

  nestedGetPropertiesMethod() {
    let { foo, bar, baz } = this.nested.object;
  }

  thisDotGetPropertiesMethod2() {
    let { foo, barBaz } = this.getProperties('foo', 'bar.baz');
  }

  thisDotGetPropertiesMethod3() {
    let foo = this.getProperties('bar', 'baz');
  }
}

```
---
<a id="this-dot-getProperties">**this-dot-getProperties**</a>

**Input** (<small>[this-dot-getProperties.input.js](transforms/es5-getter-ember-codemod/__testfixtures__/this-dot-getProperties.input.js)</small>):
```js
class Thing {
  thisDotGetPropertiesMethod() {
    let { foo, bar, baz } = this.getProperties('foo', 'bar', 'baz');
  }

  nestedGetPropertiesMethod() {
    let { foo, bar, baz } = this.nested.object.getProperties(
      'foo',
      'bar',
      'baz'
    );
  }

  thisDotGetPropertiesMethod2() {
    let { foo, barBaz } = this.getProperties('foo', 'bar.baz');
  }

  thisDotGetPropertiesMethod3() {
    let foo = this.getProperties('bar', 'baz');
  }
}

```

**Output** (<small>[this-dot-getProperties.output.js](transforms/es5-getter-ember-codemod/__testfixtures__/this-dot-getProperties.output.js)</small>):
```js
class Thing {
  thisDotGetPropertiesMethod() {
    let { foo, bar, baz } = this;
  }

  nestedGetPropertiesMethod() {
    let { foo, bar, baz } = this.nested.object;
  }

  thisDotGetPropertiesMethod2() {
    let { foo, barBaz } = this.getProperties('foo', 'bar.baz');
  }

  thisDotGetPropertiesMethod3() {
    let foo = this.getProperties('bar', 'baz');
  }
}

```
<!--FIXTURES_CONTENT_END-->
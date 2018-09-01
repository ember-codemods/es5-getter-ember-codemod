import Ember from 'ember';
import { get } from '@ember/object';

class Thing {
  standaloneMethod() {
    let foo = this.foo;
    let foo = get(this, 'foo.bar');
    let foo = this['foo-bar'];
    let foo = get(this, 42);

    let foo = this.foo;
    let foo = Ember.get(this, 'foo.bar');
    let foo = this['foo-bar'];
    let foo = Ember.get(this, `${'foo'}.bar`);

    let obj = { bar: 'baz' };
    let bar = get(obj, 'bar');
  }
}

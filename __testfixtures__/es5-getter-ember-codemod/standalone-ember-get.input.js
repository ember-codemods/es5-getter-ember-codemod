import Ember from 'ember';
import { get } from '@ember/object'

let foo = get(this, 'foo');
let foo = get(this, 'foo.bar');
let foo = get(this, 'foo-bar');

let foo = Ember.get(this, 'foo');
let foo = Ember.get(this, 'foo.bar');
let foo = Ember.get(this, 'foo-bar');

let obj = { bar: 'baz' };
let bar = get(obj, 'bar');

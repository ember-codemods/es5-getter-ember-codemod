let { foo, bar, baz } = this;

let { foo, bar, baz } = this.nested.object;

let { foo, barBaz } = this.getProperties('foo', 'bar.baz');

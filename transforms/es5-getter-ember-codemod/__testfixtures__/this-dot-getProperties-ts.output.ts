class Thing {
  thisDotGetMethod() {
    let { foo, bar, baz } = this;

    let { foo, bar, baz } = this.nested.object;

    let { foo, barBaz } = this.getProperties('foo', 'bar.baz');

    let foo = this.getProperties('bar', 'baz');
  }
}

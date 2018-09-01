class Thing {
  thisDotGetMethod() {
    let { foo, bar, baz } = this.getProperties('foo', 'bar', 'baz');

    let { foo, bar, baz } = this.nested.object.getProperties(
      'foo',
      'bar',
      'baz'
    );

    let { foo, barBaz } = this.getProperties('foo', 'bar.baz');

    let foo = this.getProperties('bar', 'baz');
  }
}

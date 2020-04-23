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

  thisDotGetPropertiesMethodWithArray() {
    let { foo, bar, baz } = this;
  }

  nestedGetPropertiesMethodWithArray() {
    let { foo, bar, baz } = this.nested.object;
  }

  thisDotGetPropertiesMethodWithArray2() {
    let { foo, barBaz } = this.getProperties(['foo', 'bar.baz']);
  }

  thisDotGetPropertiesMethodWithArray3() {
    let foo = this.getProperties(['bar', 'baz']);
  }
}

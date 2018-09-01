class Thing {
  getPropertiesMethod() {
    let { firstName, lastName, fullName } = this.getProperties(
      'firstName',
      'lastName',
      'fullName'
    );

    let { firstName, lastName, fullName } = chancancode.getProperties(
      'firstName',
      'lastName',
      'fullName'
    );

    Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), {
      firstName: 'bob'
    });
  }
}

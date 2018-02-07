let { firstName, lastName, fullName } = this;

let { firstName, lastName, fullName } = chancancode;

Object.assign({}, this.getProperties('firstName', 'lastName', 'fullName'), { firstName: 'bob' });

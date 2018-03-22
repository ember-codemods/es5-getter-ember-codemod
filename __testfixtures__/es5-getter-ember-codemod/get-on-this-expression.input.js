import Object, { computed } from '@ember/object';

const Person = Object.extend({
  fullName: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),

  invalidIdentifier() {
    return this.get('foo-bar');
  },
});

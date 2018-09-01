import Object, { computed } from '@ember/object';

const Person = Object.extend({
  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  }),

  invalidIdentifier() {
    return this['foo-bar'];
  },

  numericKey() {
    return this.get(42);
  },

  templatedKey() {
    return this.get(`${'foo'}`);
  },
});

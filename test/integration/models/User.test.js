const { expect } = require('chai');

describe('User Model', () => {
  describe('Attributes', () => {
    it('should have the correct attribute', () => {
      // console.log(User.attributes)
      expect(User.attributes).to.haveOwnProperty('username');
      expect(User.attributes).to.haveOwnProperty('password');
      expect(User.attributes).to.haveOwnProperty('email');
    });

    it('should have the correct types', () => {
      expect(User.attributes.username.type).to.equal('string');
      expect(User.attributes.email.type).to.equal('string');
      expect(User.attributes.password.type).to.equal('string');
    });

    it('should have the correct attributes validations', () => {
      expect(User.attributes.username.required).to.be.true;
      expect(User.attributes.email.required).to.be.true;
      expect(User.attributes.password.required).to.be.true;
      expect(User.attributes.email.autoMigrations.unique).to.be.true;
    });
  });
});

const { expect } = require('chai');

describe('Task Model', () => {
  describe('Attributes', () => {
    it('should have the correct attribute', () => {
      // console.log(Task.attributes)
      expect(Task.attributes).to.haveOwnProperty('data');
      expect(Task.attributes).to.haveOwnProperty('done');
      expect(Task.attributes).to.haveOwnProperty('userid');
    });

    it('should have the correct types', () => {
      expect(Task.attributes.data.type).to.equal('string');
      expect(Task.attributes.done.type).to.equal('boolean');
      expect(Task.attributes.userid.model).to.equal('user');
    });

    it('should have the correct attributes validations', () => {
      expect(Task.attributes.data.required).to.be.true;
      expect(Task.attributes.done.defaultsTo).to.be.false;
      expect(Task.attributes.userid.required).to.be.true;
    });
  });
});

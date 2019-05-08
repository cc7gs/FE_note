const {expect}=require('chai')
const name='cc';
const stu={hobby:['paly basketball']};
expect(name).to.be.a('string');
// expect(name).to.equal('cc');
expect(name).to.have.lengthOf(2);
expect(stu).to.have.property('hobby').with.lengthOf(2);
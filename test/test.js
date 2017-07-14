var chai = require('chai');
var assert = require('chai').assert;
	// describe('Array', function() {
	//   describe('#indexOf()', function() {
	//     it('should return -1 when the value is not present', function() {
	//       assert.equal(-1, [1,2,3].indexOf(4));
	//     });
	//   });
	// });
describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
});
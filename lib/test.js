define(['../node_modules/chai/chai', './mongo'], function (_chai, _mongo) {
  'use strict';

  var _chai2 = _interopRequireDefault(_chai);

  var _mongo2 = _interopRequireDefault(_mongo);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // 'bdd' stands for "browser driven development"
  mocha.setup('bdd');

  var assert = _chai2.default.assert;
  describe("Testing LocalMongo", function () {
    var store = (0, _mongo2.default)();
    describe('LEVELS comparison', function () {
      it('First level comparison', function () {
        store.setItem({ __id: 1, foo1: {}, age: 44 });
        assert(store.find({ age: 12 }), 'Failed to locate proper age');
      });
      it('Second level comparison', function () {
        store.setItem({ __id: 2, zoo: { weight: 32, height: 999, age: 45 } });
        assert(store.find({ zoo: { age: 45 } }), 'Failed to locate proper age');
      });
      it('Third level comparison', function () {
        store.setItem({ __id: 3, foo: { bar: { zoo: { weight: 32, height: 999, age: 45 } } } });
        assert(store.find({ foo: { bar: { zoo: { age: 45 } } } }), 'Failed to locate proper age');
      });
      it('Deep comparison', function () {
        store.setItem({ __id: 4, foo1: {}, foo: { bar: { zoo: { weight: 32, height: 999, age: 49 } } } });
        assert(store.find({ foo: { bar: { zoo: { age: 46 } } } }), 'Failed to locate proper age');
      });
    });
    describe("Opertors testing", function () {
      it('Less than', function () {
        console.log(store.list);

        assert(store.find({ age: { $lt: 45 } }), 'Failed to locate proper age');
      });
      it('Less than equal', function () {

        assert(store.find({ age: { $lte: 45 } }), 'Failed to locate proper age');
      });
      it('Great than', function () {
        debugger;
        assert(store.find({ foo: { bar: { zoo: { age: { $gt: 45 } } } } }), 'Failed to locate proper age');
      });
      it('Great than equal', function () {
        assert(store.find({ zoo: { age: { $gte: 45 } } }), 'Failed to locate proper age');
      });
      it('Equal', function () {
        assert(store.find({ zoo: { age: { $eq: 45 } } }), 'Failed to locate proper age');
      });
    });
  });

  mocha.run();
  /*
  
  {
    foo: {
      zoo: {$in: [6, 3]}
    }
  }
  
  {
    a: 4,
    foo: {
      zoo: [3, 4, 5],
      bar: 1
    }
  }
  */
});
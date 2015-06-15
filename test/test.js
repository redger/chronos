var assert = require("assert");
var chronos = require('../chronos.js');

describe('Chronos', function() {

   describe('#quotient()', function() {
      // TODO
      it.skip("quotient() test not implemented", function() {
         throw new Error("fail");
      })
   })

   // Calendrical Calculations / 3rd Ed. / p.18
   describe('#mod()', function() {
      it('should return 4, 1, -1, 4', function() {
         assert.equal(4, mod(9, 5));
         assert.equal(1, mod(-9, 5));
         assert.equal(-1, mod(9, -5));
         assert.equal(-4, mod(-9, -5));
      })
   })

   describe('#amod()', function() {
      // TODO
      it.skip("amod() test not implemented", function() {
         throw new Error("fail");
      })
   })

   describe('#next()', function() {
      // TODO
      it.skip("next() test not implemented", function() {
         throw new Error("fail");
      })
   })

   describe('#final()', function() {
      // TODO
      it.skip("final() test not implemented", function() {
         throw new Error("fail");
      })
   })

   describe('#sum()', function() {
      // TODO
      it.skip("sum() test not implemented", function() {
         throw new Error("fail");
      })
   })

   describe('#binary_search()', function() {
      // TODO
      it.skip("binary_search() test not implemented", function() {
         throw new Error("fail");
      })
   })

   describe('#invert_angular()', function() {
      // TODO
      it.skip("invert_angular() test not implemented", function() {
         throw new Error("fail");
      })
   })

   describe('#sigma()', function() {
      // TODO
      it.skip("sigma() test not implemented", function() {
         throw new Error("fail");
      })
   })

   describe('#poly()', function() {
      // TODO
      it.skip("poly() test not implemented", function() {
         throw new Error("fail");
      })
   })

   describe('#epoch()', function() {
      it('it should return 0', function() {
         assert.equal(0, epoch());
      })
   })

   describe('#tee()', function() {
      // TODO
      it.skip("tee() test not implemented", function() {
         throw new Error("fail");
      })
   })

})
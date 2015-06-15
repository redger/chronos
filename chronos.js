/*
   The MIT License (MIT)
   http://opensource.org/licenses/MIT

   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
   Reference book:
      Title: 'Calendrical Calculations', 3rd Ed, 2007, Cambridge University Press
      ISBN: 978-0-521-88540-9
      Authors: E. M. Reingold and N. Dershowitz

   Common Lisp (CL) implementation:
      Software: calendrica-3.0.cl
      Licence: see calendrica-3.0.cl source code
      Authors : E. M. Reingold and N. Dershowitz
      Source: code.google.com/p/pycalcal/source/browse/calendrica-3.0.cl
      Date: 2007

   Python implementation:
      Software: PyCalCal
      Licence: MIT
      Author: Enrico Spinielli
      Source: github.com/espinielli/pycalcal
      Date: 2009

   JavaScript implementation:
      Software: chronos.js
      Licence: MIT
      Author: Enrico Spinielli
      Contributor(s): 'Redger' I. Cornice
      Source: github.com/espinielli/chronos
      Web: chronos.js.org
      Date: 2015

*/

// chronos.js
// version: 0.1.0

// JavaScript implementation of
// E. M. Reingold and N. Dershowitz's 'Calendrical Calculations', 3rd Edition.
// These algorithms are described in Common Lisp in calendrica-3.0.cl
// (and errata as made available by the authors).

(function(_) {

   // see lines 244-247 in calendrica-3.0.cl
   var BOGUS = "bogus";

   // see lines 249-252 in calendrica-3.0.cl
   function quotient(m, n) {
      return Math.floor(m / n);
   };

   // see Calendrical Calculations / 3rd Ed. / p.18
   function mod(a, b) {
      // m % n   (this works as described in the book for negative integers)
      // It is interesting to note that
      //    mod(1.5, 1)
      // returns the decimal part of 1.5, so 0.5; given a moment 'm'
      //    mod(m, 1)
      // returns the time of the day
      return a - (b * quotient(a, b));
   };

   // see lines 254-257 in calendrica-3.0.cl
   function amod(a, b) {
      // Return the same as a % b with b instead of 0.
      return b + mod(a, -b);
   };

   // see lines 259-264 in calendrica-3.0.cl
   function next(index, predicate) {
      // Return first integer greater or equal to initial index, i,
      // such that condition, p, holds.

      if (predicate(index)) {
         return index;
      } else {
         return next(index + 1, predicate);
      }
   };

   // see lines 266-271 in calendrica-3.0.cl
   function final(index, predicate) {
      // Return last integer greater or equal to initial index, i,
      // such that condition, p, holds.

      if (!predicate(index)) {
         return index - 1;
      } else {
         return final(index + 1, predicate);
      }
   };

   // see lines 273-281 in calendrica-3.0.cl
   function sum(expression, index, predicate) {
      // Return the sum of f(i) from i=k, k+1, ... till p(i) holds true or 0.
      // This is a tail recursive implementation.

      if (!predicate(index)) {
         return 0;
      } else {
         return expression(index) + sum(expression, index + 1, predicate);
      }
   };

   function binary_search(low, high, dir, condition) {
      var mid = (low + high) / 2;
      if (dir(low, high)) {
         return mid;
      } else if (condition(mid)) {
         return binary_search(low, mid, dir, condition);
      } else {
         return binary_search(mid, high, dir, condition);
      }
   };

   function invert_angular(func, y, low, high) {
      var precision = Math.pow(10, -5);
      return binary_search(low, high,
         function(l, h) {
            return (h - l) <= precision;
         },
         function(x) {
            return mod(func(x) - y, 360) < 180;
         });
   };

   // see lines 304-313 in calendrica-3.0.cl
   function sigma() {
      // Return the sum of body 'b' for indices i1..in
      // running simultaneously thru lists l1..ln.
      // List 'l' is of the form [[i1 l1]..[in ln]]

      //TODO
      throw {
         name: "NotImplementedError",
         message: "sigma()"
      };
   };

   // see lines 315-321 in calendrica-3.0.cl
   function poly() {
      // Calculate polynomial with coefficients 'a' at point x.
      // The polynomial is a[0] + a[1] * x + a[2] * x^2 + ...a[n-1]x^(n-1)
      // the result is
      // a[0] + x(a[1] + x(a[2] +...+ x(a[n-1])...)
      // This implementation is also known as Horner's Rule.

      //TODO
      throw {
         name: "NotImplementedError",
         message: "poly()"
      };
   };

   // see lines 323-329 in calendrica-3.0.cl
   function epoch() {
      // Epoch definition.
      // For Rata Die, R.D., it is 0 (but any other reference would do)
      return 0;
   };

   function tee() {
      // Return Rata Die, R.D., (number of days since epoch) of moment in time, tee.
      return tee - epoch();
   };

   // see lines 331-334 in calendrica-3.0.cl
   var SUNDAY = 0;

   // see lines 10-15 in calendrica-3.0.errata.cl
   var MONDAY = SUNDAY + 1;

   // see lines 17-20 in calendrica-3.0.errata.cl
   var TUESDAY = SUNDAY + 2;

   // see lines 22-25 in calendrica-3.0.errata.cl
   var WEDNESDAY = SUNDAY + 3;

   // see lines 27-30 in calendrica-3.0.errata.cl
   var THURSDAY = SUNDAY + 4;

   // see lines 32-35 in calendrica-3.0.errata.cl
   var FRIDAY = SUNDAY + 5;

   // see lines 37-40 in calendrica-3.0.errata.cl
   var SATURDAY = SUNDAY + 6;

   var DAYS_OF_WEEK_NAMES = {
      SUNDAY: "Sunday",
      MONDAY: "Monday",
      TUESDAY: "Tuesday",
      WEDNESDAY: "Wednesday",
      THURSDAY: "Thursday",
      FRIDAY: "Friday",
      SATURDAY: "Saturday"
   };

   /************************************
   Exposing Chronos
   ************************************/
   var chronos = this; // TODO not sure it is right way to do it?

   // CommonJS module is defined
   // check for nodeJS
   var hasModule = (typeof module !== 'undefined' && module.exports);
   if (hasModule) {
      module.exports = chronos;
   }

   /*global ender:false */
   if (typeof ender === 'undefined') {
      // here, `this` means `window` in the browser, or `global` on the server
      // add `chronos` as a global object via a string identifier,
      // for Closure Compiler "advanced" mode
      this['chronos'] = chronos;
   }

   /*global define:false */
   if (typeof define === "function" && define.amd) {
      define("chronos", [], function() {
         return chronos;
      });
   }

   chronos.version = "0.0.1";
   chronos.quotient = quotient;
   chronos.mod = mod;
   chronos.amod = amod;
   chronos.next = next;
   chronos.final = final;
   chronos.sum = sum;
   chronos.binary_search = binary_search;
   chronos.sigma = sigma;
   chronos.poly = poly;
   chronos.epoch = epoch;
   chronos.tee = tee;
   _.chronos = chronos;
})(this);
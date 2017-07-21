'use strict'

const test = require('tape');
const Seminar = require('./Seminar');
const appConf = require('./appConf');

let SeminarFactory = {
  create: function(overwrites) {
    var defaults = {
      name: 'JavaScript Basics',
      price: 100,
      taxFree: false
    }
    var opts = Object.assign(defaults, overwrites);
    
    return Seminar.create(opts.name, opts.price, opts.taxFree);
  }
};

test('seminar has name', (t) => {
  t.plan(1);
  const seminar = SeminarFactory.create({name: 'JavaScript Basics'});
  const expected = 'JavaScript Basics';
  
  t.equal(seminar.name(), expected);
});

test('seminar has price', (t) => {
  t.plan(1);
  const seminar = SeminarFactory.create({price: 499});
  const expected = 499;

  t.equal(seminar.netPrice(), expected);
});

test('seminar has a gross price that adds VAT to net price', (t) => {
  t.plan(1);
  const seminar = SeminarFactory.create({price: 100});
  const expected = 100 * appConf.VAT_RATE;

  t.equal(seminar.grossPrice(), expected);
});

test('if tax free, gross price = net price', (t) => {
  t.plan(2);
  const seminar = SeminarFactory.create({taxFree: true});

  t.equal(seminar.isTaxFree(), true, ': is taxFree');
  t.equal(seminar.grossPrice(), seminar.netPrice(), ': gross price = net price');
});
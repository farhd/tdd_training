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

test('Normal seminar', (t) => {
  t.plan(4);
  
  const testName = 'Some name';
  const testPrice = 499;
  const actualGrossPrice = testPrice * appConf.VAT_RATE;
  const seminar = SeminarFactory.create({
    name: testName,
    price: testPrice,
  });
  
  t.equal(seminar.name(), testName, ': has name');
  t.equal(seminar.netPrice(), testPrice, ': has price');
  t.equal(seminar.grossPrice(), actualGrossPrice, ': gross price adds VAT to net price');
  t.equal(seminar.has3LetterDiscount(), false, ': doesn\'t have discounted price');
});

test('tax free seminar', (t) => {
  t.plan(2);
  const seminar = SeminarFactory.create({taxFree: true});

  t.equal(seminar.isTaxFree(), true, ': is taxFree');
  t.equal(seminar.grossPrice(), seminar.netPrice(), ': gross price = net price');
});

test('3-letter seminar', (t) => {
  t.plan(3);
  const seminar = SeminarFactory.create({name: 'TDD', price: 100});
  const disc3Letter = appConf.DISC_3_LETTER;
  const expectedDiscPercentage = (disc3Letter * 100) + '%';

  t.equal(seminar.has3LetterDiscount(), true, ': has 3-letter name');
  t.equal(seminar.discountPercentage(), disc3Letter, ': has ' + expectedDiscPercentage + ' discount');
  t.equal(seminar.netPrice(), 95, ': has discounted price');
});
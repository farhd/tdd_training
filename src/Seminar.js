'use strict';

const appConf = require('./appConf');

let Seminar = {
  create: function(name, price, taxFree) {
    return Object.create(Seminar)
      .init(name, price, taxFree);
  },

  init: function(name, price, taxFree) {
    this._name = name;
    this._price = price;
    this._taxFree = taxFree;
    this._discountPercentage = 0;
    if (this.has3LetterDiscount()) {
      this._discountPercentage += appConf.DISC_3_LETTER;
    }
    return this;
  },

  name: function() {
    return this._name;
  },

  netPrice: function() {
    return this._price - this.discount();
  },

  grossPrice: function() {
    return this.netPrice() * (this.isTaxFree() ? 1 : appConf.VAT_RATE);
  },

  isTaxFree: function() {
    return this._taxFree;
  },

  has3LetterDiscount: function() {
    return this.name().length === 3;
  },

  discountPercentage: function() {
    return this._discountPercentage;
  },

  discount: function() {
    return this._price * this.discountPercentage();
  }
};

module.exports = Seminar;


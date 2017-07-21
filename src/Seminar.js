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
    return this;
  },

  name: function() {
    return this._name;
  },

  netPrice: function() {
    return this._price;
  },

  grossPrice: function() {
    return this.netPrice() * (this.isTaxFree() ? 1 : appConf.VAT_RATE);
  },

  isTaxFree: function() {
    return this._taxFree;
  }
};

module.exports = Seminar;


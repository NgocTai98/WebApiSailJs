/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'number',
      autoIncrement: true
    },
    code: {
      type: 'string'
    },
    total: {
      type: 'number'
    },
    state: {
      type: 'number'
    },
    address: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    couponCode: {
      type: 'string'
    },
    couponSale: {
      type: 'number'
    },
    userId: {
      type: 'number'
    },
    couponId: {
      type: 'number'
    },    
    createdAt: false,
    updatedAt: false,
  

  },

};


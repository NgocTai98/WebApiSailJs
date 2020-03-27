/**
 * Coupon.js
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
    couponCode: {
      type: 'string'
    },
    sale: {
      type: 'number'
    },
    type: {
      type: 'string'
    },
    totalCoupon: {
      type: 'number'
    },
    startTime: {
      type: 'string'
    },
    endTime: {
      type: 'string'
    },
    userId: {
      type: 'number'
    },
    createdAt: false,
    updatedAt: false,


  },

};


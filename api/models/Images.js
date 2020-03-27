/**
 * Images.js
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
    img: {
      type: 'string'
    },
    productId: {
     model: 'product'
    },

    createdAt: false,
    updatedAt: false,

  },

};


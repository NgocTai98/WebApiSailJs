/**
 * Product.js
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
    productCode: {
      type: 'string'
    },
    productName: {
      type: 'string'
    },
    productPrice: {
      type: 'number'
    },
    info: {
      type: 'string'
    },
    describe: {
      type: 'string'
    },
    categoryId: {
      type: 'number',     
    },
    providerId: {
      type: 'number'
    },
    userId: {
      type: 'number'
    },
    createdAt: false,
    updatedAt: false,

    images: {
      collection: 'images',
      via: 'productId'
    },
    infoPro: {
      collection: 'productsizecolor',
      via: 'productId'
    }
  },

};


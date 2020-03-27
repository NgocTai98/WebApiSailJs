/**
 * ProductSizeColor.js
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
    sizeId: {
      model: 'Size'
    },
    colorId: {
      model: 'Color'
    },
    productId: {
      model: 'Product'
    },
    quantity: {
      type: 'number'
    },
    createdAt: false,
    updatedAt: false,

  },

};


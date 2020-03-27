/**
 * Category.js
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
    name: {
      type: 'string'
    },
    parent: {
      type: 'number'
    },
    userId: {
      type: 'number'
    },
    createdAt: false,
    updatedAt: false,
  },

};


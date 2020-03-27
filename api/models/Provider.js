/**
 * Provider.js
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
    address:  {
      type: 'string'
    },
    code:  {
      type: 'string'
    },
    phone:  {
      type: 'string'
    },
    info:  {
      type: 'string'
    },
    userId:  {
      type: 'number',     
    },    
    createdAt: false,
    updatedAt: false,


  },

};


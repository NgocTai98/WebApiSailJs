/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'number',
      autoIncrement: true,
    },
    email: {
      type: 'string',      
    },
    password: {
      type: 'string'
    }, 
    age: {
      type: 'number',
    },
    sex: {
      type: 'string'
    },   
    level: {
      type: 'number'
    },
   info: {
     collection: 'userinfo',
     via: 'userId'
   },
    createdAt: false,
    updatedAt: false,

  },

};


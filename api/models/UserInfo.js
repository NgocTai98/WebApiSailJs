/**
 * UserInfo.js
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
    address: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    fullname: {
       type: 'string' 
    },
    userId: {
      model: 'users'
    },
    createdAt: false,
    updatedAt: false,

  },

};


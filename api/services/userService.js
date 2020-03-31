const paginate = require('express-paginate')
module.exports = {
  login: async function (email, password) {
    if (!email || !password) {
      throw 'EMPTY_PASSWORD'
    }
    var user = Users.findOne({
      email: email,
      password: password
    }).then(find => {
      if (find.length != 0) {
        var token = jwToken.issue({
          id: find.id,
          role: find.level
        })

        return [find, token];
      }
      return undefined;
    }).catch(err => undefined);
    if (user == undefined) {
      throw 'INCORRECT_LOGIN'
    }
    return user;

  },

  list: async function (limit,offset,query) {

    let TotalRecords = await Users.count();
   
    if (query == undefined) {
      var user = await Users.find().populate('info').limit(limit).skip(offset);
    } else {
      var user = await Users.find({
        email: {
          'startsWith': query,
        }
      }).populate('info').limit(limit).skip(offset);
    }
    if (user == undefined) {
      throw 'FAIL_LIST_USERS';
    }

    return [user, totalRecords];


  },


  create: async function (email, password, age, sex, level, address, phone, fullname) {
    if (!email || !password || !age || !sex || !level) {
      throw 'EMPTY_FIELD';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let newUser = await Users.create({
        email: email,
        password: password,
        age: age,
        sex: sex,
        level: level
      }).fetch().usingConnection(db);

      let newInfo = await UserInfo.create({
        address: address,
        phone: phone,
        fullname: fullname,
        userId: newUser.id,
      }).fetch().usingConnection(db);
      var token = jwToken.issue({
        id: newUser.id,
        role: newUser.level
      });

      if (newUser == undefined || newInfo == undefined) {
        throw 'FAIL_SIGNUP';
      }
      return [newUser, newInfo, token];
    })
    if (result == undefined) {
      throw 'FAIL_SIGNUP'
  }
    return result;
  },

  get_profile: async function (id) {

    var profile = await Users.find({
      id: id
    }).populate('info').then(result => result);
    if (profile == undefined) {
      throw 'FAIL_VIEW_PROFILE';
    }
    return profile;
  },

  update_profile: async function (id, email, password, age, sex, address, phone, fullname) {

    if (!id) {
      throw 'EMPTY_FIELD_ID'
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let newUser = await Users.update({
        id: id
      }, {
        email: email,
        password: password,
        age: age,
        sex: sex

      }).fetch().usingConnection(db);

      let newInfo = await UserInfo.update({
        id: newUser.id
      }, {
        address: address,
        phone: phone,
        fullname: fullname,
        userId: newUser.id
      }).fetch().usingConnection(db);

      
      return [newUser, newInfo];
    })
    if (result == undefined) {
      throw 'FAIL_EDIT_PROFILE';
    }
    return result;
  },

  update_user: async function (id, level) {
    if (!id) {
      throw 'EMPTY_FIELD_ID';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let user = await Users.update({
        id: id
      }, {
        level: level
      }).fetch().usingConnection(db);
      return user;
    });
    if (result == undefined) {
      throw 'FAIL_EDIT_USER'
    }
    return result;
  },

  del_user: async function (id) {
    if (!id) {
      throw 'EMPTY_FIELD_ID';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let user = await Users.destroy({
        id: id
      }).fetch().usingConnection(db);
      return user;
    });
    if (result == undefined) {
      throw 'FAIL_DELETE_USER';
    }
    return result;

  }

}

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

    return user;

  },

  list: async function (limit, query) {


    let TotalItem = await Users.count();
    if (limit == undefined) {
      var totalPage = 1;
    } else {
      if (TotalItem % limit == 0) {
        var totalPage = TotalItem / limit;
      } else {
        var totalPage = parseInt(TotalItem / limit) + 1;
      }
    }

    if (query == undefined) {
      var user = await Users.find().populate('info').limit(limit).then(finds => finds).catch(err => undefined);
    } else {
      var user = await Users.find({
        email: {
          'startsWith': query,
        }
      }).populate('info').limit(limit).then(finds => finds).catch(err => err);
    }
    if (user == undefined) {
      return undefined;
    }

    return [user, totalPage];


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
    return result;
  },

  get_profile: async function (id) {

    var profile = await Users.find({
      id: id
    }).populate('info').then(result => result);

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
    return result;

  }

}

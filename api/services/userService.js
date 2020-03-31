
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
    }).catch(err => {
      throw 'INCORRECT_LOGIN'
    });

    return user;

  },

  list: async function (limit, offset, query) {

    let TotalRecords = await Users.count();

    if (!query) {
      var user = await Users.find().populate('info').limit(limit).skip(offset);
    } else {
      var user = await Users.find({
        email: {
          'startsWith': query,
        }
      }).populate('info').limit(limit).skip(offset);
    }
    if (!user) {
      throw 'FAIL_LIST_USERS';
    }

    return [user, totalRecords];


  },


  create: async function (user) {
    if (!user.email || !user.password || !user.age || !user.sex || !user.level) {
      throw 'EMPTY_FIELD';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let newUser = await Users.create({
        email: user.email,
        password: user.password,
        age: user.age,
        sex: user.sex,
        level: user.level
      }).fetch().usingConnection(db);

      let newInfo = await UserInfo.create({
        address: user.address,
        phone: user.phone,
        fullname: user.fullname,
        userId: newUser.id,
      }).fetch().usingConnection(db);
      var token = jwToken.issue({
        id: newUser.id,
        role: newUser.level
      });

      if (newUser.length == 0 || newInfo.length == 0) {
        throw 'FAIL_SIGNUP';
      }
      return [newUser, newInfo, token];
    })
    return result;
  },

  get_profile: async function (id) {

    var profile = await Users.find({
      id: id
    }).populate('info');
    if (!profile) {
      throw 'FAIL_VIEW_PROFILE';
    }
    return profile;
  },

  update_profile: async function (profile) {

    if (!profile.id) {
      throw 'EMPTY_FIELD_ID'
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let newUser = await Users.update({
        id: profile.id
      }, {
        email: profile.email,
        password: profile.password,
        age: profile.age,
        sex: profile.sex

      }).fetch().usingConnection(db);

      let newInfo = await UserInfo.update({
        id: newUser.id
      }, {
        address: profile.address,
        phone: profile.phone,
        fullname: profile.fullname,
        userId: newUser.id
      }).fetch().usingConnection(db);
      if (newUser.length == 0 || newInfo.length == 0) {
        throw 'FAIL_EDIT_PROFILE';
      }
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
    if (result.length == 0) {
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
    if (result.length == 0) {
      throw 'FAIL_DELETE_USER';
    }
    return result;

  }

}

module.exports = {
  list: async function (limit, query) {

    let TotalItem = await Provider.count();
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
      var provider = await Provider.find().limit(limit).then(finds => finds).catch(err => undefined);
    } else {
      var provider = await Provider.find({
        name: {
          'startsWith': query,
        }
      }).limit(limit).then(finds => finds).catch(err => undefined);
    }
    if (provider == undefined) {
      return undefined;
    }
    return [totalPage, provider];

  },
  create: async function (name, code, address, phone, info, userId) {
    if (!name || !address || !code || !phone || !info) {
      throw 'EMPTY_FIELD';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      var provider = Provider.create({
        name: name,
        address: address,
        code: code,
        phone: phone,
        info: info,
        userId: userId
      }).fetch().usingConnection(db);
      return provider;
    });
    return result;
  },
  update: async function (id, name, code, address, phone, info, userId) {
    if (!id) {
      throw 'EMPTY_FIELD_ID';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let provider = await Provider.update({
        id: id
      }, {
        name: name,
        address: address,
        code: code,
        phone: phone,
        info: info,
        userId: userId
      }).fetch().usingConnection(db);
      return provider;
    });
    return result;
  },
  delete: async function (id) {
    if (!id) {
      throw 'EMPTY_FIELD_ID';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let provider = await Provider.destroy({
        id: id
      }).fetch().usingConnection(db);
      return provider;
    });
    return result;
  },
}

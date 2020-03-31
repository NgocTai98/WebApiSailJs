module.exports = {
  list: async function (limit, offset, query) {

    let TotalRecords = await Provider.count();

    if (!query) {
      var provider = await Provider.find().limit(limit).skip(offset);
    }
    var provider = await Provider.find({
      name: {
        'startsWith': query,
      }
    }).limit(limit).skip(offset);

    if (!provider) {
      throw 'FAIL_VIEW_PROVIDER'
    }
    return [totalRecords, provider];

  },
  create: async function (provider) {
    if (!provider.name || !provider.address || !provider.code || !provider.phone || !provider.info) {
      throw 'EMPTY_FIELD';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      var provider = Provider.create({
        name: provider.name,
        address: provider.address,
        code: provider.code,
        phone: provider.phone,
        info: provider.info,
        userId: provider.userId
      }).fetch().usingConnection(db);
      return provider;
    });
    if (!result) {
      throw 'FAIL_CREATE_PROVIDER';
    }
    return result;
  },
  update: async function (provider) {
    if (!provider.id) {
      throw 'EMPTY_FIELD_ID';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let provider = await Provider.update({
        id: provider.id
      }, {
        name: provider.name,
        address: provider.address,
        code: provider.code,
        phone: provider.phone,
        info: provider.info,
        userId: provider.userId
      }).fetch().usingConnection(db);
      return provider;
    });
    if (!result) {
      throw 'FAIL_EDIT_PROVIDER'
    }
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
    if (result.length == 0) {
      throw 'FAIL_DELETE_PROVIDER'
    }
    return result;
  },
}

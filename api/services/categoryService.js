module.exports = {
  list: async function (limit, offset, query) {

    let TotalRecords = await Category.count();
    
    if (!query) {
      var cate = await Category.find().limit(limit).skip(offset);
    } else {
      var cate = await Category.find({
        name: {
          'startsWith': query,
        }
      }).limit(limit).skip(offset);
    }
    if (!cate) {
      throw 'FAIL_LIST_CATEGORY';
    }
    return [TotalRecords, cate];

  },
  create: async function (name, parent, userId) {
    if (!name || !parent) {
      throw 'EMPTY_FIELD';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      var cate = Category.create({
        name: name,
        parent: parent,
        userId: userId
      }).fetch().usingConnection(db);
      return cate;
    });
    if (result.length == 0) {
      throw 'FAIL_CREATE_CATEGORY';
    }
    return result;
  },
  update: async function (id, name, parent, userId) {
    if (!id) {
      throw 'EMPTY_FIELD_ID';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let newCate = await Category.update({
        id: id
      }, {
        name: name,
        parent: parent,
        userId: userId
      }).fetch().usingConnection(db);
      return newCate;
    });
    if (result.length == 0) {
      throw 'FAIL_EDIT_CATEGORY';
    }
    return result;
  },
  delete: async function (id) {
    if (!id) {
      throw 'EMPTY_FIELD_ID';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let cate = await Category.destroy({
        id: id
      }).fetch().usingConnection(db);
      return cate;
    });   
    if (result.length == 0) {
      throw 'FAIL_DELETE_CATEGORY';
    }
    return result;
  },
}

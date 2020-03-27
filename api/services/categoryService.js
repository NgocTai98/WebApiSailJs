module.exports = {
  list: async function (limit, query) {

    let TotalItem = await Category.count();
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
      var cate = await Category.find().limit(limit).then(finds => finds);
    } else {
      var cate = await Category.find({
        name: {
          'startsWith': query,
        }
      }).limit(limit).then(finds => finds);
    }

    return [totalPage, cate];

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
    return result;
  },
}

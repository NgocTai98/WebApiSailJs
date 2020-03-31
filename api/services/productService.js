module.exports = {
  list: async function (limit, offset, query) {

    let TotalRecords = await Product.count();

    if (!query) {
      var products = await Product.find().populate('infoPro').populate('images').limit(limit).skip(offset);
    } else {
      var products = await Product.find({
        productName: {
          'startsWith': query,
        }
      }).populate('infoPro').populate('images').limit(limit).skip(offset);
    }
    if (products == undefined) {
      throw 'FAIL_LIST_QUERY_PRODUCT';
    }
    return [products, TotalRecords];
  },

  create: async function (product) {

    if (!product.productCode || !product.productName || !product.images || !product.productPrice || !product.categoryId || !product.providerId || !product.size || !product.color || !product.quantity) {
      throw 'EMPTY_FIELD';
    }
    let a = product.size.split(",");
    let b = product.quantity.split(",");
    var result = await sails.getDatastore().transaction(async (db) => {

      var newProduct = await Product.create({
        productCode: product.productCode,
        productName: product.productName,
        productPrice: product.productPrice,
        info: product.info,
        describe: product.describe,
        categoryId: product.categoryId,
        providerId: product.providerId,
        userId: product.userId
      }).fetch().usingConnection(db)

      var img = product.images;
      var image = img.split(',');

      for (let i = 0; i < image.length; i++) {
        let images1 = await Images.create({
          img: image[i],
          productId: newProduct.id
        }).fetch().usingConnection(db);
      }

      let promises = [a, b];
      let info = await Promise.all(promises).then(result => {

        for (let i = 0; i < result[0].length; i++) {

          var newProductSizeColor = ProductSizeColor.create({
            sizeId: result[0][i],
            colorId: product.color,
            productId: newProduct.id,
            quantity: result[1][i]
          }).then(result => result);

          var getSize = Size.find({
            id: result[0]
          }).then(result => result);

        }

        return getSize;
      });
      var color = await Color.find({
        id: product.color
      })
      if (!newProduct || !info || !color) {
        throw 'FAIL_CREATE_QUERY_PRODUCT';
      }
      return [newProduct, info, color];
    })
    return result;

  },

  update: async function (product) {

    if (!product.idProduct) {
      throw 'EMPTY_FIELD';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let newProduct = await Product.update({
        id: product.idProduct
      }, {
        productCode: product.productCode,
        productName: product.productName,
        productPrice: product.productPrice,
        info: product.info,
        describe: product.describe,
        categoryId: product.categoryId,
        providerId: product.providerId,
        userId: product.userId
      }).fetch().usingConnection(db);
      if (!product.idImage) {
        return newProduct;
      }
      let images1 = await Images.update({
        id: idImage
      }, {
        img: images,
        productId: product.idProduct
      }).fetch();
      if (!product.idVariant || !product.size || !product.quantity) {
        return newProduct;
      }
      var c = size.split(",");
      var d = quantity.split(",");
      let promises = [c, d];
      let info = await Promise.all(promises).then(result => {

        for (let i = 0; i < result[0].length; i++) {

          var newProductSizeColor = ProductSizeColor.update({
            id: product.idVariant
          }, {
            sizeId: result[0][i],
            colorId: product.color,
            productId: newProduct.id,
            quantity: result[1][i]
          }).then(result => result);

          var getSize = Size.find({
            id: result[0]
          }).then(result => result);

        }
        return getSize;
      });
      var color = await Color.find({
        id: product.color
      }).usingConnection(db);
      if (!newProduct || !info || !color) {
        throw 'FAIL_EDIT_QUERY_PRODUCT';
      }
      return [newProduct, info, color];
    });
    
    return result;

  },

  delete: async function (idProduct) {
    if (!idProduct) {

      throw 'EMPTY_FIELD_ID';
    }
    let result = await sails.getDatastore().transaction(async (db) => {

      var product = await Product.destroy({
        id: idProduct
      }).fetch().usingConnection(db);

      return product;
    });
    if (result.length == 0) {
      throw 'FAIL_DELETE_PRODUCT';
    }
    return result;

  }
}

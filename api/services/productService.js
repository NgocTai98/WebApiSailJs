
module.exports = {
  list: async function (limit, query) {
   
    let TotalItem = await Product.count();
    if (limit == undefined) {
      var totalPage = 1;
    } else {
     
      if (TotalItem % limit == 0) {
        var totalPage = TotalItem / limit;
      }else{
        var totalPage = parseInt(TotalItem / limit) + 1;
      }
      
    }

    if (query == undefined) {
      var products = await Product.find().populate('infoPro').populate('images').limit(limit).then(finds => finds).catch(err => undefined);
    } else {
      var products = await Product.find({
        productName: {
          'startsWith': query,    
        }
      }).populate('infoPro').populate('images').limit(limit).then(finds => finds).catch(err => undefined);
    }
    if (products == undefined) {
      return undefined;
    }
    return [products, totalPage];
  },

  create: async function (size, quantity,productCode, productName, images, productPrice, categoryId, providerId, color, info, describe, userId) {    
    let a = size.split(",");    
    let b = quantity.split(",");
    if (!productCode || !productName || !images || !productPrice || !categoryId || !providerId || !size || !color || !quantity) {
       throw 'EMPTY_FIELD';
    } 
   var result = await sails.getDatastore().transaction(async  (db) => {
    
      let newProduct = await Product.create({
        productCode: productCode,
        productName: productName,
        productPrice: productPrice,
        info: info,
        describe: describe,
        categoryId: categoryId,
        providerId: providerId,
        userId: userId
      }).fetch().usingConnection(db)   
     
      var img = images;
      var image = img.split(',');
      for (let i = 0; i < image.length; i++) {
        let images1 = await Images.create({
          img: image[i],
          productId: newProduct.id
        }).fetch();
      }
     
      for (let i = 0; i < a.length; i++) {
        var newProductSizeColor = await ProductSizeColor.create({
          sizeId: a[i],
          colorId: color,
          productId: newProduct.id,
          quantity: b[i]
        }).fetch();
       
        var getSize = await Size.find({
          id: a
        }).then(finds => finds);
      }
      var color = await Color.find({
        id: color
      }).then(find => find).usingConnection(db);
      
      
      return [newProduct, getSize, color];
  
     })
    return result;
  },

  update: async function (idProduct, idImage, idVariant, size, quantity, productName, images, productPrice, categoryId, providerId, color, info, describe, userId) {

    if (!idProduct) {
      throw 'EMPTY_FIELD';
    } 
    var result = await sails.getDatastore().transaction(async  (db) => {
      let newProduct = await Product.update({
        id: idProduct
      }, {
        productCode: productCode,
        productName: productName,
        productPrice: productPrice,
        info: info,
        describe: describe,
        categoryId: categoryId,
        providerId: providerId,
        userId: userId
      }).fetch().usingConnection(db);
      if (!idImage) {
        return newProduct;
      } else {
        let images1 = await Images.update({
          id: idImage
        }, {
          img: images,
          productId: idProduct
        }).fetch();
      }
      if (!idVariant || !size || !quantity) {
        return newProduct;
      } else {
        
        var c = size.split(",");
       
        var d = quantity.split(",");
        for (let i = 0; i < c.length; i++) {
          var newProductSizeColor = await ProductSizeColor.update({
            id: idVariant
          }, {
            sizeId: c[i],
            colorId: color,
            productId: newProduct.id,
            quantity: d[i]
          }).fetch();
          var getSize = await Size.find({
            id: c
          }).then(finds => finds);
        }
        var color = await Color.find({
          id: color
        }).then(find => find).usingConnection(db);

        if (newProduct == undefined || getSize == undefined || color == undefined) {
          return undefined;
        }
        return [newProduct, getSize, color];
      }
    });
    return result;
    
  },

  delete: async function (idProduct) {
    if (!idProduct) {
     
     throw 'EMPTY_FIELD';
    }    
    await sails.getDatastore().transaction(async  (db) => {
    
     var product = await Product.destroy({
      id: idProduct
    }).fetch().usingConnection(db);
    if (product.length == 0) {
      return undefined;
    } 
    
    return product;
    })
   
   
  
 }
}

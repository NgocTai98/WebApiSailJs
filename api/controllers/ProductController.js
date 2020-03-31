/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  listProduct: async function (req, res) {
    var limit = req.param('limit');
    var offset = req.param('offset');
    var query = req.param('query');

    try {
      let products = await productService.list(limit,offset,query);
     
      return res.status(200).json({
        message: 'Danh sách sản phẩm',
        data: {
          totalCount: products[1],
          productions: products[0]
        }
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },

  createProduct: async function (req, res) {
    let product = {
       size: req.param('size'),
       quantity: req.param('quantity'),
       productCode: req.param('productCode'),
       productName: req.param('productName'),
       images: req.param('images'),
       productPrice: req.param('productPrice'),
       categoryId: req.param('categoryId'),
       providerId: req.param('providerId'),
       color: req.param('color'),
       info: req.param('info'),
       describe: req.param('describe'),
       userId: req.token.id,
    }
   
    try {
      let newproduct = await productService.create(product);
      
      return res.status(200).json({
        message: 'Đã thêm thành công sản phẩm mới',
        data: {
          product: newproduct[0],
          size: newproduct[1],
          color: newproduct[2]
        }

      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },

  editProduct: async function (req, res) {
   let product = {
     idProduct: req.param('idProduct'),
     idImage: req.param('idImage'),
     idVariant: req.param('idVariant'),
     size: req.param('size'),
     quantity: req.param('quantity'),
     productCode: req.param('productCode'),
     productName: req.param('productName'),
     images: req.param('images'),
     productPrice: req.param('productPrice'),
     categoryId: req.param('categoryId'),
     providerId: req.param('providerId'),
     color: req.param('color'),
     info: req.param('info'),
     describe: req.param('describe'),
     userId: req.token.id,
   }
    try {
      let newproduct = await productService.update(product);
      
      return res.status(200).json({
        message: 'Đã sửa thành công sản phẩm',
        data: {
          product: newproduct[0],
          size: newproduct[1],
          color: newproduct[2]
        }

      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },

  deleteProduct: async function (req, res) {
    let idProduct = req.param('idProduct');
    try {
      let product = await productService.delete(idProduct);     
      return res.status(200).json({
        message: 'Đã xóa thành công',       
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },

};

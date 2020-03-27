/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list_product: async function (req, res) {
    var limit = req.param('limit');
    var query = req.param('query');

    try {
      let products = await productService.list(limit, query);
      if (products == undefined) {
        throw 'FAIL_LIST_QUERY_PRODUCT';
      }
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

  create_product: async function (req, res) {
    let size = req.param('size');
    let quantity = req.param('quantity');
    let productCode = req.param('productCode');
    let productName = req.param('productName');
    let images = req.param('images');
    let productPrice = req.param('productPrice');
    let categoryId = req.param('categoryId');
    let providerId = req.param('providerId');
    let color = req.param('color');
    let info = req.param('info');
    let describe = req.param('describe');
    let userId = req.token.id;
    try {
      let newproduct = await productService.create(size, quantity, productCode, productName, images, productPrice, categoryId, providerId, color, info, describe, userId);
      if (newproduct == undefined) {
        throw 'FAIL_CREATE_QUERY_PRODUCT';
      }
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

  edit_product: async function (req, res) {
    let idProduct = req.param('idProduct');
    let idImage = req.param('idImage');
    let idVariant = req.param('idVariant');
    let size = req.param('size');
    let quantity = req.param('quantity');
    let productCode = req.param('productCode');
    let productName = req.param('productName');
    let images = req.param('images');
    let productPrice = req.param('productPrice');
    let categoryId = req.param('categoryId');
    let providerId = req.param('providerId');
    let color = req.param('color');
    let info = req.param('info');
    let describe = req.param('describe');
    let userId = req.token.id;
    try {
      let newproduct = await productService.update(idProduct, idImage, idVariant, size, quantity, productCode, productName, images, productPrice, categoryId, providerId, color, info, describe, userId);
      if (newproduct == undefined) {
        throw 'FAIL_EDIT_QUERY_PRODUCT';
      }
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

  delete_product: async function (req, res) {
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

/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list_order: async function (req, res) {
    var limit = req.param('limit');
    var query = req.param('query');
    try {
      let order = await orderService.list(limit, query);
      if (order == undefined) {
        throw 'FAIL_VIEW_ORDER';
      }
      return res.status(200).json({
        message: 'Danh sách đơn hàng',
        data: {
          totalCount: order[1].value,
          order: order[0].value
        }
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  create_order: async function (req, res) {
    let code = req.param('code');
    let address = req.param('address');
    let phone = req.param('phone');
    let couponCode = req.param('couponCode');
    let couponSale = req.param('couponSale');
    let userId = req.token.id;
    let couponId = req.param('couponId');
    let productsizecolor = req.param('productsizecolor');
    let price = req.param('price');
    let total = req.param('total');
    try {
      let order = await orderService.create(code, address, phone, couponCode, couponSale, userId, couponId, productsizecolor, price, total);
      if (order == undefined) {
        throw 'FAIL_CREATE_ORDER';
      }
      return res.status(200).json({
        message: 'Đã thêm thành công đơn hàng',
        data: order
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  edit_order: async function (req, res) {
    let id = req.param('id');
    let state = req.param('state');
    try {
      let order = await orderService.update(id, state);
      if (order == undefined) {
        throw 'FAIL_EDIT_ORDER';
      }
      return res.status(200).json({
        message: 'Đã sửa thành công đơn hàng',
        data: order
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  delete_order: async function (req, res) {
    let id = req.param('id');
    try {
      let order = await orderService.delete(id);
      if (order == undefined) {
        throw 'FAIL_DELETE_ORDER';
      }
      return res.status(200).json({
        message: 'Đã xóa đơn hàng',
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  process_order: async function (req, res) {
    var limit = req.param('limit');
    var query = req.param('query');

    try {
      let order = await orderService.process(limit, query);
      if (order == undefined) {
        throw 'FAIL_VIEW_ORDER_PROCESS';
      }
      return res.status(200).json({
        message: 'Danh sách đơn hàng đã xử lý',
        data: {
          totalCount: order[1].value,
          order: order[0].value
        }
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  }

};

/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  listOrder: async function (req, res) {
    var limit = req.param('limit');
    var offset = req.param('offset');
    var query = req.param('query');
    try {
      let order = await orderService.list(limit,offset,query);
     
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
  createOrder: async function (req, res) {
   let order = {
     code: req.param('code'),
     address: req.param('address'),
     phone: req.param('phone'),
     couponCode: req.param('couponCode'),
     couponSale:req.param('couponSale'),
     userId: req.token.id,
     couponId: req.param('couponId'),
     productsizecolor: req.param('productsizecolor'),
     price: req.param('price'),
     total: req.param('total'),
   }
    try {
      let orders = await orderService.create(order);
     
      return res.status(200).json({
        message: 'Đã thêm thành công đơn hàng',
        data: orders
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  editOrder: async function (req, res) {
    let id = req.param('id');
    let state = req.param('state');
    try {
      let order = await orderService.update(id, state);
     
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
  deleteOrder: async function (req, res) {
    let id = req.param('id');
    try {
      let order = await orderService.delete(id);
     
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
  processOrder: async function (req, res) {
    var limit = req.param('limit');
    var offset = req.param('offset');
    var query = req.param('query');

    try {
      let order = await orderService.process(limit,offset,query);
    
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

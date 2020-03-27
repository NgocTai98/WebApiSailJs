/**
 * CouponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list_coupon: async function (req, res) {
    var limit = req.param('limit');
    var query = req.param('query');
    try {
      let coupon = await couponService.list(limit, query);
      if (coupon == undefined) {
        throw 'FAIL_LIST_COUPON'
      }
      return res.status(200).json({
        message: 'Danh sách mã coupon',
        data: {
          totalCount: coupon[0],
          coupon: coupon[1]
        }
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  create_coupon: async function (req, res) {
    var couponCode = req.param('couponCode');
    var sale = req.param('sale');
    var type = req.param('type');
    var totalCoupon = req.param('totalCoupon');
    var time = req.param('time');
    var userId = req.token.id;
    try {
      let coupon = await couponService.create(couponCode, sale, type, totalCoupon, time, userId);
      if (coupon == undefined) {
        throw 'FAIL_CREATE_COUPON'
      }
      return res.status(200).json({
        message: 'Thêm mới thành công mã coupon',
        data: coupon
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  edit_coupon: async function (req, res) {
    var id = req.param('id');
    var couponCode = req.param('couponCode');
    var sale = req.param('sale');
    var type = req.param('type');
    var totalCoupon = req.param('totalCoupon');
    var time = req.param('time');
    var userId = req.token.id;
    try {
      let coupon = await couponService.update(id, couponCode, sale, type, totalCoupon, time, userId);
      if (coupon == undefined) {
        throw 'FAIL_EDIT_COUPON'
      }
      return res.status(200).json({
        message: 'Sửa thành công mã coupon',
        data: coupon
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  delete_coupon: async function (req, res) {
    var id = req.param('id');
    try {
      let coupon = await couponService.delete(id);
      if (coupon == undefined) {
        throw 'FAIL_DELETE_COUPON'
      }
      return res.status(200).json({
        message: 'Đã xóa mã coupon',
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },

};

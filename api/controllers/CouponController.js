/**
 * CouponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  listCoupon: async function (req, res) {
    var limit = req.param('limit');
    var offset = req.param('offset');
    var query = req.param('query');
    try {
      let coupon = await couponService.list(limit,offset,query);      
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
  createCoupon: async function (req, res) {
   let coupon = {
     couponCode: req.param('couponCode'),
     sale: req.param('sale'),
     type: req.param('type'),
     totalCoupon: req.param('totalCoupon'),
     time: req.param('time'),
     userId: req.token.id,
   }
    try {
      let coupons = await couponService.create(coupon);
      
      return res.status(200).json({
        message: 'Thêm mới thành công mã coupon',
        data: coupons
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  editCoupon: async function (req, res) {
   let coupon = {
   id: req.param('id'),
   couponCode: req.param('couponCode'),
   sale: req.param('sale'),
   type: req.param('type'),
   totalCoupon: req.param('totalCoupon'),
   time: req.param('time'),
   userId: req.token.id,
   }
    try {
      let coupons = await couponService.update(coupon);
     
      return res.status(200).json({
        message: 'Sửa thành công mã coupon',
        data: coupons
      })
    } catch (error) {
      let err = await errorService.error(error);
      return res.status(401).json({
        message: err
      })
    }
  },
  deleteCoupon: async function (req, res) {
    var id = req.param('id');
    try {
      let coupon = await couponService.delete(id);
     
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

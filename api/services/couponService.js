var moment = require('moment');
module.exports = {
  list: async function (limit, query) {


    let TotalItem = await Coupon.count();
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
      var coupon = await Coupon.find().limit(limit).then(finds => finds);
    } else {
      var coupon = await Coupon.find({
        couponCode: {
          'startsWith': query,
        }
      }).limit(limit).then(finds => finds);
    }

    return [totalPage, coupon];

  },
  create: async function (couponCode, sale, type, totalCoupon, time, userId) {
    if (!couponCode || !sale || !type || !totalCoupon || !time) {
      throw 'EMPTY_FIELD';
    }

    var result = await sails.getDatastore().transaction(async (db) => {
      var coupon = Coupon.create({
        couponCode: couponCode,
        sale: sale,
        type: type,
        totalCoupon: totalCoupon,
        startTime: moment().utc().format(),
        endTime: moment().add(time, 'days').utc().format(),
        userId: userId
      }).fetch().usingConnection(db);
      return coupon;
    });
    return result;

    
  },

  update: async function (id, couponCode, sale, type, totalCoupon, time, userId) {
    if (!id) {
      throw 'EMPTY_FIELD_ID';
    }
    
    var result = await sails.getDatastore().transaction(async (db) => {
      let coupon = await Coupon.update({
        id: id
      }, {
        couponCode: couponCode,
        sale: sale,
        type: type,
        totalCoupon: totalCoupon,
        startTime:  moment().utc().format(),
        endTime: moment().add(time, 'days').utc().format(),
        userId: userId
      }).fetch().usingConnection(db);
      return coupon;
    });
    return result;
  },
  delete: async function (id) {
    if (!id) {
      throw 'EMPTY_FIELD_ID';
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let coupon = await Coupon.destroy({
        id: id
      }).fetch().usingConnection(db);
      return coupon;
    });
    return result;
  },
}

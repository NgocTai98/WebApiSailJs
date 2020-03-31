var moment = require('moment');
module.exports = {
  list: async function (limit,offset,query) {


    let TotalRecords = await Coupon.count();
   
    if (!query) {
      var coupon = await Coupon.find().limit(limit).skip(offset);
    } else {
      var coupon = await Coupon.find({
        couponCode: {
          'startsWith': query,
        }
      }).limit(limit).skip(offset);
    }
    if (!coupon) {
      throw 'FAIL_LIST_COUPON';
    }

    return [TotalRecords, coupon];

  },
  create: async function (coupon) {
    if (!coupon.couponCode || !coupon.sale || !coupon.type || !coupon.totalCoupon || !coupon.time) {
      throw 'EMPTY_FIELD';
    }

    var result = await sails.getDatastore().transaction(async (db) => {
      var coupon = Coupon.create({
        couponCode: coupon.couponCode,
        sale: coupon.sale,
        type: coupon.type,
        totalCoupon: coupon.totalCoupon,
        startTime: moment().utc().format(),
        endTime: moment().add(time, 'days').utc().format(),
        userId: coupon.userId
      }).fetch().usingConnection(db);    
      return coupon;
    });     
    if (result.length == 0) {
      throw 'FAIL_CREATE_COUPON'
    }    
    return result;

    
  },

  update: async function (coupon) {
    if (!coupon.id) {
      throw 'EMPTY_FIELD_ID';
    }
    
    var result = await sails.getDatastore().transaction(async (db) => {
      let coupon = await Coupon.update({
        id: coupon.id
      }, {
        couponCode: coupon.couponCode,
        sale: coupon.sale,
        type: coupon.type,
        totalCoupon: coupon.totalCoupon,
        startTime:  moment().utc().format(),
        endTime: moment().add(coupon.time, 'days').utc().format(),
        userId: coupon.userId
      }).fetch().usingConnection(db);
      return coupon;
    });
    if (result.length == 0) {
      throw 'FAIL_EDIT_COUPON'
    }
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
    if (result.length == 0) {
      throw 'FAIL_DELETE_COUPON'
    }
    return result;
  },
}

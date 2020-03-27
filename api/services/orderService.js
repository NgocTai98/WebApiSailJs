module.exports = {
  list: async function (limit, query) {

    let TotalItem = await Order.count();
    if (limit == undefined) {
      var totalPage = 1;
    } else {
      if (TotalItem % limit == 0) {
        var totalPage = TotalItem / limit;
      } else {
        var totalPage = parseInt(TotalItem / limit) + 1;
      }
    }
    if (!query) {
      let order = Order.find({
        state: 0
      }).limit(limit).then(find => find);

      let order1 = [order, totalPage];
      let orders = await Promise.allSettled(order1).then(result => result);
      return orders;

    }
    let order = Order.find({
      state: 0
    }, {
      code: {
        'startsWith': query
      }
    }).limit(limit).then(find => find);
    let order1 = [order, totalPage];
    let orders = await Promise.allSettled(order1).then(result => result);
    return orders;
  },
  create: async function (code, address, phone, couponCode, couponSale, userId, couponId, productsizecolor, price, total) {
    if (!code || !address || !phone) {
      throw 'EMPTY_FIELD'
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      var newOrder = await Order.create({
        code: code,
        total: 0,
        state: 0,
        address: address,
        phone: phone,
        couponCode: couponCode,
        couponSale: couponSale,
        userId: userId,
        couponId: couponId
      }).fetch().usingConnection(db);
      if (!productsizecolor) {
        throw 'EMPTY_FIELD_ID'
      }
      var pro = productsizecolor.split(",");
      var price = price.split(",");
      var total = total.split(",");
      var totalPrice = 0;
      for (let i = 0; i < pro.length; i++) {
        var newOrderItem = await OrderItem.create({
          orderId: newOrder.id,
          productSizeColorId: pro[i],
          price: price[i],
          total: total[i]
        }).fetch();
        totalPrice += price[i] * total[i];
      }

      var order = await Order.update({
        id: newOrder.id
      }, {
        total: totalPrice
      }).fetch().usingConnection(db);
      return order;
    });
    return result;
  },
  update: async function (id, state) {
    if (!id || !state) {
      throw 'EMPTY_FIELD'
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let order = await Order.update({
        id: id
      }, {
        state: state
      }).fetch().usingConnection(db);
      return order;

    });
    return result;

  },
  delete: async function (id) {
    if (!id) {
      throw 'EMPTY_FIELD_ID'
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      let order = await Order.destroy({
        id: id
      }).fetch().usingConnection(db);
      return order;
    });
    return result;
  },
  process: async function (limit, query) {

    let TotalItem = await Order.count();
    if (limit == undefined) {
      var totalPage = 1;
    } else {
      if (TotalItem % limit == 0) {
        var totalPage = TotalItem / limit;
      } else {
        var totalPage = parseInt(TotalItem / limit) + 1;
      }
    }
    if (!query) {
      let order = Order.find({
        state: 1
      }).limit(limit).then(find => find);
      let order1 = [order, totalPage];
      let orders = await Promise.allSettled(order1).then(result => result);
      return orders;
    } else {
      let order = Order.find({
        state: 1
      }, {
        code: {
          'startsWith': query
        }
      }).limit(limit).then(find => find);
      let order1 = [order, totalPage];
      let orders = await Promise.allSettled(order1).then(result => result);
      return orders;
    }
  }
}

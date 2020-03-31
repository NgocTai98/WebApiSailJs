module.exports = {
  list: async function (limit,offset,query) {

    let TotalRecords = await Order.count({where: {state: 0}});
    
    if (!query) {
      let order = Order.find({
        state: 0
      }).limit(limit).skip(offset);

      let order1 = [order, TotalRecords];
      let orders = await Promise.allSettled(order1);
      if (orders == undefined) {
        throw 'FAIL_VIEW_ORDER';
      }
      return orders;

    }
    let order = Order.find({
      state: 0
    }, {
      code: {
        'startsWith': query
      }
    }).limit(limit).skip(offset);
    let order1 = [order, TotalRecords];
    let orders = await Promise.allSettled(order1);
    if (order == undefined) {
      throw 'FAIL_VIEW_ORDER';
    }
    return orders;
  },
  create: async function (order) {
    if (!order.code || !order.address || !order.phone) {
      throw 'EMPTY_FIELD'
    }
    var result = await sails.getDatastore().transaction(async (db) => {
      var newOrder = await Order.create({
        code: order.code,
        total: 0,
        state: 0,
        address: order.address,
        phone: order.phone,
        couponCode: order.couponCode,
        couponSale: order.couponSale,
        userId: order.userId,
        couponId: order.couponId
      }).fetch().usingConnection(db);
      if (!order.productsizecolor) {
        throw 'EMPTY_FIELD_ID'
      }
      var pro = order.productsizecolor.split(",");
      var price = order.price.split(",");
      var total = order.total.split(",");
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
    if (!result) {
      throw 'FAIL_CREATE_ORDER';
    }
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
    if (!result) {
      throw 'FAIL_EDIT_ORDER';
    }
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
    if (!result) {
      throw 'FAIL_DELETE_ORDER';
    }
    return result;
  },
  process: async function (limit,offset,query) {

    let TotalRecords = await Order.count({where: {state: 1}});
    
    if (!query) {
      let order = Order.find({
        state: 1
      }).limit(limit).skip(offset);
      let order1 = [order, TotalRecords];
      let orders = await Promise.allSettled(order1);
      if (!orders) {
        throw 'FAIL_VIEW_ORDER_PROCESS';
      }
      return orders;
    } else {
      let order = Order.find({
        state: 1
      }, {
        code: {
          'startsWith': query
        }
      }).limit(limit).skip(offset);
      let order1 = [order, TotalRecords];
      let orders = await Promise.allSettled(order1);
      if (!orders) {
        throw 'FAIL_VIEW_ORDER_PROCESS';
      }
      return orders;
    }
  }
}

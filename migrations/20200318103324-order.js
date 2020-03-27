'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
   db.createTable('order', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    code: 'string',
    total: 'int',
    state: 'int',
    address: 'string',
    phone: 'string',
    couponCode: 'string',
    couponSale: 'int',
    userId: {
      type: 'int',
      foreignKey: {
        name: 'users_order_fk',
        table: 'userinfo',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    couponId: {
      type: 'int',
      foreignKey: {
        name: 'order_coupon_fk',
        table: 'coupon',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  }, callback)
};

exports.down = function(db, callback) {
  db.dropTable('order', callback);
};

exports._meta = {
  "version": 1
};
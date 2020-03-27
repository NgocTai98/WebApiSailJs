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
   db.createTable('coupon', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    couponCode: 'string',
    sale: 'int',
    type: 'string',
    totalCoupon: 'int',
    startTime: 'string',
    endTime: 'string',
    userId: {
      type: 'int',
      foreignKey: {
        name: 'coupon_users_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  }, callback);
};

exports.down = function(db, callback) {
   db.dropTable('coupon', callback)
};

exports._meta = {
  "version": 1
};

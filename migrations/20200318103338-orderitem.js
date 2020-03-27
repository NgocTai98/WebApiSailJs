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
   db.createTable('orderitem', {
    orderId: {
      type: 'int',
      foreignKey: {
        name: 'order_item_fk',
        table: 'order',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    productSizeColorId: {
      type: 'int',
      foreignKey: {
        name: 'order_product_fk',
        table: 'productsizecolor',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    price: 'int',
    total: 'int'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('orderitem', callback);
};

exports._meta = {
  "version": 1
};

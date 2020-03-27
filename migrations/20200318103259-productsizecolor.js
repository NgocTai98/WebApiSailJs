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
   db.createTable('productsizecolor', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    sizeId: {
      type: 'int',
      foreignKey: {
        name: 'size_product_fk',
        table: 'size',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    colorId: {
      type: 'int',
      foreignKey: {
        name: 'color_product_fk',
        table: 'color',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    productId: {
      type: 'int',
      foreignKey: {
        name: 'sizecolor_product_fk',
        table: 'product',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    quantity: 'int'
  }, callback);
};

exports.down = function(db, callback) {
   db.dropTable('productsizecolor', callback);
};

exports._meta = {
  "version": 1
};

'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
   db.createTable('product', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    productCode: 'string',
    productName: 'string',
    productPrice: 'int',
    info: 'string',
    describe: 'string',
    categoryId: {
      type: 'int',
      foreignKey: {
        name: 'product_category_fk',
        table: 'category',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    providerId: {
      type: 'int',
      foreignKey: {
        name: 'product_provider_fk',
        table: 'provider',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    userId: {
      type: 'int',
      foreignKey: {
        name: 'users_product_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  }, callback)
};

exports.down = function (db, callback) {
  db.dropTable('product', callback);
};

exports._meta = {
  "version": 1
};
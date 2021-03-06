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
   db.createTable('images', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    img: 'string',
    productId: {
      type: 'int',
      foreignKey: {
        name: 'product_image_fk',
        table: 'product',
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
   db.dropTable('images', callback);
};

exports._meta = {
  "version": 1
};

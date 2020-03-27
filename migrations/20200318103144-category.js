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
   db.createTable('category', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    name: 'string',
    parent: 'int',
    userId: {
      type: 'int',
      foreignKey: {
        name: 'category_user_fk',
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
   db.dropTable('category', callback);
};

exports._meta = {
  "version": 1
};

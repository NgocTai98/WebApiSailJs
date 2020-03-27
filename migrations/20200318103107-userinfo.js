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
   db.createTable('userinfo', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      
    },
    address: 'string',
    phone: 'string',
    fullname: 'string',
    userId: {
      type: 'int',
      foreignKey: {
        name: 'users_info_fk',
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

exports.down = function (db, callback) {
   db.dropTable('userinfo', callback);
};

exports._meta = {
  "version": 1
};

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
   db.createTable('provider', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    name: 'string',
    address: 'string',
    code: 'string',
    phone: 'string',
    info: 'string',
    userId: {
      type: 'int',
      foreignKey: {
        name: 'provider_users_fk',
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
   db.dropTable('provider', callback);
};

exports._meta = {
  "version": 1
};
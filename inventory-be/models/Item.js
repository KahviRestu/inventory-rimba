// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const { DataTypes } = Sequelize;

// const Item = db.define('item', {
//   itemId: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: DataTypes.INTEGER
//   },
//   nama_item: {
//     type: DataTypes.STRING
//   },
//   unit: {
//     type: DataTypes.STRING
//   },
//   stok: {
//     type: DataTypes.INTEGER
//   },
//   harga_satuan: {
//     type: DataTypes.INTEGER
//   },
//   barang: {
//     type: DataTypes.STRING
//   }
// }, {
//   classMethods: {
//     associate: function (models) {
//       Item.hasMany(models.SalesItem, {
//         foreignKey: 'itemId'
//       })
//     }
//   },
//   freezeTableName: true
// })

// export default Item;

// (async () => {
//   await db.sync();
// })();

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.hasMany(models.SalesItem, {
        foreignKey: 'itemId'
      })
    }
  }
  Item.init({
    itemId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_item: {
      type: DataTypes.STRING
    },
    unit: {
      type: DataTypes.STRING
    },
    stok: {
      type: DataTypes.INTEGER
    },
    harga_satuan: {
      type: DataTypes.INTEGER
    },
    barang: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Item',
    freezeTableName: true
  });
  return Item;
};
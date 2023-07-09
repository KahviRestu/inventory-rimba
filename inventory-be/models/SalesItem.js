// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";


// const { DataTypes } = Sequelize;

// const SalesItem = db.define('SalesItem', {
//   salesItemId: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: DataTypes.INTEGER
//   },
//   salesId: {
//     type: DataTypes.INTEGER
//   },
//   itemId: {
//     type: DataTypes.INTEGER
//   },
//   qty: {
//     type: DataTypes.INTEGER
//   },
// }, {
//   classMethods: {
//     associate: function (models) {
//       SalesItem.belongsTo(models.Sales, {
//         foreignKey: 'salesId'
//       }),
//         SalesItem.belongsTo(models.Item, {
//           foreignKey: 'itemId'
//         })
//     }
//   },
//   freezeTableName: true
// })

// export default SalesItem;

// (async () => {
//   await db.sync();
// })();


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesItem extends Model {
    static associate(models) {
      SalesItem.belongsTo(models.Sales, {
        foreignKey: 'salesId'
      }),
        SalesItem.belongsTo(models.Item, {
          foreignKey: 'itemId'
        })
    }
  }
  SalesItem.init({
    salesitemId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    salesId: {
      type: DataTypes.INTEGER
    },
    itemId: {
      type: DataTypes.INTEGER
    },
    qty: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'SalesItem',
    freezeTableName: true
  });
  return SalesItem;
};
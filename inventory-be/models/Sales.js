// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const { DataTypes } = Sequelize;

// const Sales = db.define('Sales', {
//   salesId: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: DataTypes.INTEGER
//   },
//   code_transaksi: {
//     type: DataTypes.STRING
//   },
//   tanggal_transaksi: {
//     type: DataTypes.DATE
//   },
//   customerId: {
//     type: DataTypes.INTEGER
//   },
//   total_diskon: {
//     type: DataTypes.INTEGER
//   },
//   total_harga: {
//     type: DataTypes.INTEGER
//   },
//   total_bayar: {
//     type: DataTypes.INTEGER
//   }
// }, {
//   classMethods: {
//     associate: function (models) {
//       Sales.belongsTo(models.Customer, {
//         foreignKey: 'customerId'
//       }),
//         Sales.hasMany(models.SalesItem, {
//           foreignKey: 'salesId'
//         })
//     }
//   },
//   freezeTableName: true
// })

// export default Sales;

// (async () => {
//   await db.sync();
// })();

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    static associate(models) {
      Sales.belongsTo(models.Customer, {
        foreignKey: 'customerId'
      }),
        Sales.hasMany(models.SalesItem, {
          foreignKey: 'salesId'
        })
    }
  }
  Sales.init({
    salesId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    code_transaksi: {
      type: DataTypes.STRING
    },
    tanggal_transaksi: {
      type: DataTypes.DATE
    },
    customerId: {
      type: DataTypes.INTEGER
    },
    total_diskon: {
      type: DataTypes.INTEGER
    },
    total_harga: {
      type: DataTypes.INTEGER
    },
    total_bayar: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Sales',
    freezeTableName: true
  });
  return Sales;
};
// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const { DataTypes } = Sequelize;

// const Customer = db.define('customer', {
//   customerId: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: DataTypes.INTEGER
//   },
//   nama: {
//     type: DataTypes.STRING
//   },
//   contact: {
//     type: DataTypes.STRING
//   },
//   email: {
//     type: DataTypes.STRING
//   },
//   alamat: {
//     type: DataTypes.TEXT
//   },
//   diskon: {
//     type: DataTypes.INTEGER
//   },
//   type_diskon: {
//     type: DataTypes.STRING
//   },
//   ktp: {
//     type: DataTypes.TEXT
//   }
// }, {
//   classMethods: {
//     associate: function (models) {
//       Customer.hasMany(models.Sales, {
//         foreignKey: 'customerId'
//       })
//     }
//   },
//   freezeTableName: true
// })

// export default Customer;

// (async () => {
//   await db.sync();
// })();

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Sales, {
        foreignKey: 'customerId'
      })
    }
  }
  Customer.init({
    customerId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama: {
      type: DataTypes.STRING
    },
    contact: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    alamat: {
      type: DataTypes.TEXT
    },
    diskon: {
      type: DataTypes.INTEGER
    },
    type_diskon: {
      type: DataTypes.STRING
    },
    ktp: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Customer',
    freezeTableName: true
  });
  return Customer;
};
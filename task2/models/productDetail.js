
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProductDetail = sequelize.define('ProductDetail', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'ProductDetails',
    timestamps: false
  });

  return ProductDetail;
};
const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  })
}
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    FlagImg:{
      type: DataTypes.STRING,
      allowNull: false,
    },

    Continent:{
      type: DataTypes.STRING,
      allowNull: false,
    },

    Capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    Subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Area: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    Population: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};

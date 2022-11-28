const { DataTypes, Op} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },

    difficulty:{
      type: DataTypes.INTEGER,[Op.between]:[1,5],
        },
    duration: {
      type: DataTypes.INTEGER,
    },
   season: {
      type: DataTypes.ENUM('summer', 'autumn', 'winter', 'spring'),
   },
   createInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
   },     
});
};


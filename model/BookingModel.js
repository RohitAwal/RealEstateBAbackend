var db = require('../config/databaseconfig');
// console.log(db.Sequelize);
const Booking = db.sequelize.define('Booking', {
    // attributes
    id:{
        type: db.Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
        
    Image:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },

    NameOfPlace: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    Price: {
        type: db.Sequelize.STRING,
        allowNull:false
      },
   

    Description:  {
        type: db.Sequelize.STRING,
        allowNull:false
      }
  }, 
  {
    freezeTableName:true,
    tableName:'booking'
  
  });

  Booking.sync({force:false})
  .then(function(result){
      console.log(result);
  })
  .catch(function(err){
      console.log(err)
  })
  module.exports={
    Booking

  }
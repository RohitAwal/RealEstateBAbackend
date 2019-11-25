var db = require('../config/databaseconfig');
// console.log(db.Sequelize);
const reserve = db.sequelize.define('reserve', {
    // attributes
    id:{
        type: db.Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
        
    fullname:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },

    email: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    phoneno: {
        type: db.Sequelize.STRING,
        allowNull:false
      },
   

    address:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },
    departure:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },

      destination:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },

      people:  {
        type: db.Sequelize.STRING,
        allowNull:false
      }
  }, 
  {
    freezeTableName:true,
    tableName:'reservation'
  
  });

  reserve.sync({force:false})
  .then(function(result){
      console.log(result);
  })
  .catch(function(err){
      console.log(err)
  })
  module.exports={
    reserve

  }
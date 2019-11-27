var db = require('../config/databaseconfig');
// console.log(db.Sequelize);
const advert = db.sequelize.define('advert', {
    // attributes
    id:{
        type: db.Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },

    I_have:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },
    
    I_want:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },
        
    Name:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },

    Email: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    Phoneno: {
        type: db.Sequelize.STRING,
        allowNull:false
      },
   

    Adtitle:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },
    Description:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },

    Location:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },

    LandArea:  {
        type: db.Sequelize.STRING,
        allowNull:false
      },
  
    Price:  {
        type: db.Sequelize.STRING,
        allowNull:false
      }
  }, 
  {
    freezeTableName:true,
    tableName:'advertisement'
  
  });

  advert.sync({force:false})
  .then(function(result){
      console.log(result);
  })
  .catch(function(err){
      console.log(err)
  })
  module.exports={
    advert

  }
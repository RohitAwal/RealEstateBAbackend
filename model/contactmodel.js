var db = require('../config/databaseconfig');
// console.log(db.Sequelize);
const contact = db.sequelize.define('contact', {
    // attributes
    id:{
        type: db.Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
        
    Name: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull:false
      },
    Phoneno:  {
      type: db.Sequelize.INTEGER,
      allowNull:false
    },

    Message:  {
        type: db.Sequelize.STRING,
        allowNull:false
      }
  }, 
  {
    freezeTableName:true,
    tableName:'contact'
  
  });

  contact.sync({force:false})
  .then(function(result){
      console.log(result);
  })
  .catch(function(err){
      console.log(err)
  })
  module.exports={
    contact

  }
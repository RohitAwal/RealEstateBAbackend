var db = require('../config/databaseconfig');
// console.log(db.Sequelize);
const User = db.sequelize.define('User', {
    // attributes
    id:{
        type: db.Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
    Firstname: {
      type: db.Sequelize.STRING,
      allowNull: false
    }, Lastname: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    Phoneno: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
        
    username: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    address: {
        type: db.Sequelize.STRING,
        allowNull:false
      },
    password: {
      type: db.Sequelize.STRING,
      allowNull:false
    }
  }, 
  {
    freezeTableName:true,
    tableName:'users'
  
  });

  User.sync({force:false})
  .then(function(result){
      console.log(result);
  })
  .catch(function(err){
      console.log(err)
  })
  module.exports={
      User

  }
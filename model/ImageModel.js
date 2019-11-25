var database = require("../config/dbconfig");

const SignDetails = database.sequelize.define('signDetails', {
  // attributes
  id: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },

  images: {
    type: database.Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: database.Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },

},

  {
    // options
    freezeTableName: true,
    tableName: "signtbl"
  })

SignDetails.sync({ force: false })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error)
  })

module.exports = {
  SignDetails
};

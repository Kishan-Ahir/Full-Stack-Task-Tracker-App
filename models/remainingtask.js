// Importing Sequelize module
const Sequelize = require("sequelize");

// Establish a connection to the MySQL database
const sequelize = new Sequelize("todolist", "root", "Chandravadiya@2003", {
  host: "localhost",
  dialect: "mysql"
});

// Define the "todolist" model
const todolist = sequelize.define("todolist", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = todolist;

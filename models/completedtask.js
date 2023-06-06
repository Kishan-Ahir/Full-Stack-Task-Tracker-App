// Importing Sequelize module
const Sequelize = require("sequelize");

// Connecting node.js to database
const sequelize = new Sequelize("todolist", "root", "Chandravadiya@2003", {
  host: "localhost",
  dialect: "mysql"
});

// Define the "taskcompletedlist" model
const taskcompletedlist = sequelize.define("taskcompletedlist", {
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

module.exports = taskcompletedlist;

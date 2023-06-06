const path = require("path");
const todolist = require("../models/remainingtask");
const taskcompletedlist = require("../models/completedtask");

// Add a task to the remaining task list
exports.addtask = async (req, res) => {
  try {
    const name = req.body.taskName;
    const description = req.body.taskDescription;
    await todolist.create({
      name: name,
      description: description
    });
    const remainingTasks = await todolist.findAll();
    res.status(200).json(remainingTasks);
  } catch (err) {
    alert("Not Able to Store the remainingTasks at database.");
    console.log(err);
  }
};

// Add a task to the completed task list
exports.taskcompletedlist = async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.discrp;
    await taskcompletedlist.create({
      name: name,
      description: description
    });
    const completedTasks = await taskcompletedlist.findAll();
    res.status(200).json(completedTasks);
  } catch (err) {
    alert("Not Able to Store the completedTasks at database.");
    console.log(err);
  }
};

// Get the list of remaining tasks
exports.getremainingtask = async (req, res) => {
  try {
    const remainingTasks = await todolist.findAll();
    res.status(200).json(remainingTasks);
  } catch (err) {
    console.log("Not Able to Get data: " + err);
  }
};

// Get the list of completed tasks
exports.getcompletedtask = async (req, res) => {
  try {
    const completedTasks = await taskcompletedlist.findAll();
    res.status(200).json(completedTasks);
  } catch (err) {
    console.log("Not Able to Get data: " + err);
  }
};

// Delete a task from the remaining task list
exports.delettetask = async (req, res) => {
  try {
    const id = req.params.data_id;
    await todolist.destroy({ where: { id: id } });
  } catch (err) {
    alert("Not Able to delete task.");
    console.log(err);
  }
};

// Delete a task from the completed task list
exports.deletecompletedtask = async (req, res) => {
  try {
    const id = req.params.data_id;
    await taskcompletedlist.destroy({ where: { id: id } });
  } catch (err) {
    alert("Not Able to delete task.");
    console.log(err);
  }
};

// Render the main page
exports.getForm = (req, res, next) => {
  todolist.sync().then(() => {
    taskcompletedlist.sync().then(() => {
      res.sendFile(path.join(__dirname, "../", "views", "TaskTrackr.html"));
    });
  });
};

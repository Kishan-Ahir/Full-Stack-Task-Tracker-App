// Importing Modules
const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskcontroller");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// Enable CORS
router.use(cors());

// Serve static files from the "public" folder
router.use(express.static(path.join(__dirname, "../", "public")));

// Parse JSON request bodies
router.use(bodyParser.json());

// Add a task into remaining task table
router.post("/addtask", taskController.addtask);

// Add a task into completed task table
router.post("/taskcompletedlist", taskController.taskcompletedlist);

// Get remaining tasks
router.get("/getremainingtask", taskController.getremainingtask);

// Get completed tasks
router.get("/getcompletedtask", taskController.getcompletedtask);

// Delete a task from remaining task table
router.delete("/delettetask/:data_id", taskController.delettetask);

// Delete a task from completed task table
router.delete("/deletecompletedtask/:data_id",taskController.deletecompletedtask);

// Route for the main page
router.get("/", taskController.getForm);

module.exports = router;
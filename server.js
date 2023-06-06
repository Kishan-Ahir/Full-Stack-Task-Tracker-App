// Importing express module
const express = require("express");
const app = express();

// Importing taskRouter from route folder
const taskRouter = require("./routes/taskRoutes");

// Directing every request towards task Router
app.use(taskRouter);

// Launching server at port 3000
app.listen(3000);

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const todoRouter = require("./routes/todo-router");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
app.use("/api/todos", todoRouter);

const port = process.env.EXPRESS_PORT;
app.server = app.listen(port || 5000, () => {
  console.log(`server has started on port ${port}`);
});

module.exports = app;

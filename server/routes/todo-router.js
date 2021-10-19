const express = require("express");
const todoRouter = express.Router();
const pool = require("../db");

//ROUTES//

//create a todo

todoRouter.post("/", async (req, res) => {
  const { description } = req.body;
  const newTodo = await pool.query(
    "INSERT INTO todo (description) VALUES($1) RETURNING *",
    [description]
  );
  res.json(newTodo.rows[0]);
});

//get all todos

todoRouter.get("/", async (req, res) => {
  const allTodos = await pool.query("SELECT * FROM todo");
  res.json(allTodos.rows);
});

//get a todo

todoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
  res.json(todo.rows[0]);
});

//update a todo

todoRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const updateTodo = await pool.query(
    "UPDATE todo SET description = $1 WHERE todo_id = $2",
    [description, id]
  );
  res.json("Todo was updated!");
});

//delete a todo

todoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
    id,
  ]);
  res.json("Todo was deleted!");
});

module.exports = todoRouter;

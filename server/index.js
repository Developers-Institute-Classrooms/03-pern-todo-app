const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/api/todos", async (req, res) => {
    const { description } = req.body;
    const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
    );
    res.json(newTodo.rows[0]);
});

//get all todos

app.get("/api/todos", async (req, res) => {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
});

//get a todo

app.get("/api/todos/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id
    ]);
    res.json(todo.rows[0]);
});

//update a todo

app.put("/api/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
    );
    res.json("Todo was updated!");
});

//delete a todo

app.delete("/api/todos/:id", async (req, res) => {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
        id
    ]);
    res.json("Todo was deleted!");
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

const request = require("supertest");
const app = require("../index");
const pool = require("../db");

describe("GET /todos", () => {
  afterEach(async () => {
    await pool.query("DELETE from todo");
  });
  afterAll(() => {
    app.server.close();
  });
  test("WHEN there are todos in the database THEN return status 200 and an array of todos", async () => {
    await pool.query(`
      INSERT INTO
        todo (todo_id, description)
      VALUES
        (1, 'Start working on my project')  
    `);
    const expectedResponseBody = [
      {
        todo_id: 1,
        description: "Start working on my project",
      },
    ];
    const response = await request(app)
      .get("/api/todos")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponseBody);
  });

  test("WHEN there are no todos in the database THEN return status 200 and an empty array", async () => {
    const expectedResponseBody = [];
    const response = await request(app)
      .get("/api/todos")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponseBody);
  });
});

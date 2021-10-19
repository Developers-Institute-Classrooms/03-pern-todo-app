const request = require("supertest");
const app = require("../index");
const db = require("../db");

describe("GET /todos", () => {
  beforeAll(async () => {
    await db.query("DELETE FROM todo");
  });
  afterEach(async () => {
    await db.query("DELETE FROM todo");
  });
  afterAll(() => {
    app.server.close();
  });

  test("WHEN there are todos THEN return status 200 and an array of todos", async () => {
    await db.query(`
      INSERT INTO
        todo (todo_id, description)
      VALUES
        (1,'Test todo')
    `);
    const expectedResponseData = [
      {
        todo_id: 1,
        description: "Test todo",
      },
    ];

    const response = await request(app)
      .get("/api/todos")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponseData);
  });
});

// __tests__/unit/auth/test.js
import request from "supertest";
import { app } from "../../../app.js"; // direct import, not httpServer

describe("Test the root path", () => {
  test("It should respond to the GET method", async function () {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

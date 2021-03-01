import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../app";
import createConnection from "../database";

createConnection();
describe("Students", () => {
  it("Should be able to create a class", async () => {
    const response = await request(app).post("classes").send({
      name: "Class test",
      period: "02",
      year: "2021",
      duration: "36",
    });

    expect(response.status).toBe(201);
    expect(response).toHaveProperty("id");
  });
});

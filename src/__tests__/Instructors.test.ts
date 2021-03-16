import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Instructors", () => {
  beforeAll(async () => {
    await createConnection();
  });

  it("Should be able to create an instructor", async () => {
    const response = await request(app).post("/instructors").send({
      name: "Instructor test",
      email: "instructor@email.com",
      cpf: "45612345612",
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create an instructor with same cpf", async () => {
    const response = await request(app).post("/students").send({
      name: "Instructor Teste2",
      email: "newtest@newmail.com",
      cpf: "45612345612",
    });

    expect(response.status).toBe(400);
  });

  it("Should not be able to create an instructor with same email", async () => {
    const response = await request(app).post("/students").send({
      name: "Instructor test 3",
      email: "instructor@email.com",
      cpf: "78978978978",
    });

    expect(response.status).toBe(400);
  });
});

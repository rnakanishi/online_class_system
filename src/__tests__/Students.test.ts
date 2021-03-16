import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../app";
import createConnection from "../database";

describe("Students", () => {
  beforeAll(async () => {
    await createConnection();
  });

  it("Should be able to create a student", async () => {
    const response = await request(app).post("/students").send({
      name: "Nome Teste",
      email: "teste@email.com",
      cpf: "12312312312",
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a student with same cpf", async () => {
    const response = await request(app).post("/students").send({
      name: "Nome Teste",
      email: "newtest@newmail.com",
      cpf: "12312312312",
    });

    expect(response.status).toBe(400);
  });

  it("Should not be able to create a student with same email", async () => {
    const response = await request(app).post("/students").send({
      name: "Nome Teste",
      email: "teste@email.com",
      cpf: "98798798798",
    });

    expect(response.status).toBe(400);
  });
});

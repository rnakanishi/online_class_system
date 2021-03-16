import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Classes", () => {
  beforeAll(async () => {
    await createConnection();
  });

  it("Should be able to create a class", async () => {
    const response = await request(app).post("/classes").send({
      name: "Class test",
      period: "02",
      year: "2021",
      duration: "36",
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a class with same parameters", async () => {
    const response = await request(app).post("/classes").send({
      name: "Class test",
      period: "02",
      year: "2021",
      duration: "36",
    });

    expect(response.status).toBe(201);
  });

  it("Should be able to create a class with same name on different periods", async () => {
    const response = await request(app).post("/classes").send({
      name: "Class test",
      period: "03",
      year: "2020",
      duration: "36",
    });

    expect(response.status).toBe(201);
  );
});

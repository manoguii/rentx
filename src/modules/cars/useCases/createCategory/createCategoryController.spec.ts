import { hash } from "bcrypt";
import { agent } from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import createConnection from "@shared/infra/database";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();

    const password = await hash("admin", 8);

    await connection.query(`
      INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXX.XXXX.XX')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await agent(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await agent(app)
      .post("/categories")
      .send({
        name: "category supertest",
        description: "Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category whit same name exists", async () => {
    const responseToken = await agent(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await agent(app)
      .post("/categories")
      .send({
        name: "category supertest",
        description: "Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });
});

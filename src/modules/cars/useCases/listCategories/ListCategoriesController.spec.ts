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

  it("should be able to list all available categories", async () => {
    const responseToken = await agent(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    await agent(app)
      .post("/categories")
      .send({
        name: "category supertest",
        description: "Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await agent(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("category supertest");
  });
});

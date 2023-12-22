/**
 * @jest-environment node
 */

import { createRequest } from "node-mocks-http";
import { DELETE, GET, POST } from "./route";
import { initializeDb } from "@/db/db";

beforeAll(async () => {
  // Initialize the database before running the tests
  await initializeDb();
});

afterAll(async () => {
  // Close the database connection after running the tests
  const db = await initializeDb();
  await db.close();
});

describe("GET /api/sync", () => {
  it("should return 200 and the operations", async () => {
    const res = await GET();
    expect(res.status).toEqual(200);
  });
});

describe("POST /api/sync", () => {
  it("should return 201 and success message when data is valid", async () => {
    const operation = {
      clientId: "test",
      cpuUsage: {
        timestamp: 123,
        load: 0.5,
      },
    };
    const req = createRequest({
      method: "POST",
      url: "/api/sync",
      headers: { "Content-Type": "application/json" },
      body: operation,
    });
    const res = await POST(req);

    expect(res.status).toEqual(201);
  });
});

describe("POST /api/sync", () => {
  it("should return 400 and error message when data is invalid", async () => {
    const operation = {
      // Missing clientId
      cpuUsage: {
        timestamp: 123,
        load: 0.5,
      },
    };
    const req = createRequest({
      method: "POST",
      url: "/api/sync",
      headers: { "Content-Type": "application/json" },
      body: operation,
    });
    const res = await POST(req);

    expect(res.status).toEqual(400);
  });
});

describe("DELETE /api/sync", () => {
  it("should return 200 and success message", async () => {
    const res = await DELETE();
    expect(res.status).toEqual(200);
  });
});

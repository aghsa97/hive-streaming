import { z } from "zod";

import { NextRequest, NextResponse } from "next/server";
import { initializeDb } from "@/db/db";
import { EventEmitter } from "stream";

const schema = z.object({
  clientId: z.string(),
  cpuUsage: z.object({
    timestamp: z.number(),
    load: z.number(),
  }),
});

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await initializeDb();
  const items = await db.all("SELECT * FROM operations");
  return NextResponse.json({ items }, { status: 200 });
}

export async function POST(req: NextRequest) {
  // Simulate random errors with 10% probability
  const randomNumber = Math.random();
  if (randomNumber < 0.1) {
    return NextResponse.json(
      { status: "Error", message: "Random error" },
      { status: 500 }
    );
  }
  // When running tests, req.body is an EventEmitter, not a JSON object thats why we need this check.
  // In production, req.body is a JSON object.
  let body = {};
  if (req instanceof EventEmitter && req.body) {
    body = req.body;
  } else {
    body = await req.json();
  }
  const db = await initializeDb();
  const parsedBody = schema.safeParse(body); // Validate the body, to make sure it has the expected structure
  if (!parsedBody.success) {
    return NextResponse.json(
      { status: "Error", message: "Invalid data" },
      { status: 400 }
    );
  }
  const clientId = parsedBody.data.clientId;
  const cpuUsage = parsedBody.data.cpuUsage;

  await db.run(
    "INSERT INTO operations (client_id, cpu_load, timestamp) VALUES (?,?,?)",
    [clientId, cpuUsage.load, cpuUsage.timestamp]
  );

  return NextResponse.json(
    { status: "Success", message: "Data received" },
    { status: 201 }
  );
}

export async function DELETE() {
  const db = await initializeDb();
  await db.run("DELETE FROM operations");
  return NextResponse.json({ status: "Success" }, { status: 200 });
}

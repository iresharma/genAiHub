// server.ts - Alternative approach
import path from "path";
import { createRequestHandler } from "@remix-run/node";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const build = require("./build/server/index.js") as any;

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});
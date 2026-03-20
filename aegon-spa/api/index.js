import { createRequestListener } from "@react-router/node";
import * as build from "../build/server/index.js";

const listener = createRequestListener({
  build,
  mode: process.env.NODE_ENV,
});

export default function handler(req, res) {
  return listener(req, res);
}

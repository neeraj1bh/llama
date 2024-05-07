import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
  modelPath: path.join(__dirname, "models", "notus-7b-v1.Q4_K_M.gguf"),
});
const context = new LlamaContext({ model });
const session = new LlamaChatSession({ context });

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (soc) => {
  console.log("Connected");
  soc.on("message", async (message) => {
    console.log(message);
    const response = await session.prompt(message);
    soc.emit("message", response);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

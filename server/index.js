import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
  modelPath: path.join(__dirname, "models", "codellama-13b.Q3_K_M.gguf"),
});
const context = new LlamaContext({ model });
const session = new LlamaChatSession({ context });

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

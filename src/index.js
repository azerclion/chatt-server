import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(` ✅ Server running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected" + socket.id);
  });
});

export default server;

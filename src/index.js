import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import ip from "ip";

const PORT = process.env.PORT || 5050;

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(` ✅ Server running on ${ip.address()}:${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected : ", socket.id);
  socket.on("join_room", (data) => {
    console.log("join_room", `userId: ${socket.id} data:`, data);
    socket.join(data);
    io.emit("room", data);
  });
  socket.on("send_message", (data) => {
    console.log("send_message", data);
    // io.to(data.roomName).emit("receive_message", data);
    socket.to(data.roomName).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected : ", socket.id);
  });
});

export default server;

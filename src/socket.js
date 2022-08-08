import { io } from "./index";

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected" + socket.id);
  });
});
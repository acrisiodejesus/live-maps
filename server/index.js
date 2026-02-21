require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: CLIENT_URL }));

const users = {};

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    connectedUsers: Object.keys(users).length,
  });
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("updateLocation", ({ lat, lng }) => {
    if (typeof lat !== "number" || typeof lng !== "number") return;

    users[socket.id] = { lat, lng };
    io.emit("usersUpdate", users);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete users[socket.id];
    io.emit("usersUpdate", users);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

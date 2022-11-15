const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("new connection: " + socket.id);

  let readableStream = fs.createReadStream("writeme.txt");

  readableStream.on("data", (chunk) => {
    socket.emit("send_file", { buffer: chunk });
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

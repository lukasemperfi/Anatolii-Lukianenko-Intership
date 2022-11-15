const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.static("public"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let usersCurrentMouseData = {
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
};

io.on("connection", (socket) => {
  console.log("new connection: " + socket.id);

  socket.emit("init_data", usersCurrentMouseData);

  socket.on("coords_change", (data) => {
    usersCurrentMouseData = data;
    socket.broadcast.emit("send_coords", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

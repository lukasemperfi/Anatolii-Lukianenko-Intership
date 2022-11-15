const express = require("express");

const cors = require("cors");
const fs = require("fs");
const { io } = require("socket.io-client");

const app = express();

const socket = io.connect("http://localhost:3001");

app.use(cors());

let writeableStream = fs.createWriteStream("upload.txt");

socket.on("send_file", (data) => {
  writeableStream.write(data.buffer);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

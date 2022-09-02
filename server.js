const e = require("express");
const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname + "/public")));

var users = [];

io.on("connection", function (socket) {
  socket.on("newuser", function (data) {
    users.push({
      id: data.room_id,
      username: data.username,
    });
    socket.join(data.room_id);
    socket
      .to(data.room_id)
      .emit("update", data.username + " joined the conversation");
    update_users(data.room_id);
  });
  socket.on("exituser", function (data) {
    const indexOfObject = users.findIndex((object) => {
      return object.username === data.uname;
    });
    users.splice(indexOfObject, 1);
    socket
      .to(data.room_id)
      .emit("update", data.uname + " left the conversation");
    update_users(data.room_id);
  });
  socket.on("chat", function (message) {
    socket.to(message.id).emit("chat", message);
  });
  socket.on("online_users", function (user_id) {
    update_users(user_id);
  });

  function update_users(userid) {
    let user_data = [];
    users.forEach((element) => {
      if (element.id == userid) {
        user_data.push(element.username);
      }
    });
    io.sockets.in(userid).emit("recieve_users", user_data);
  }
});

server.listen(5000);

"use strict";

const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// let players = ["x", "o"];
httpServer.listen(4000);
let id;
const uuid = require("uuid").v4; // random uuid

let boardState = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let count = 0;
let gameState = "on";

let objData = {};

let players = [];

io.on("connection", (socket) => {
  socket.on("reconnect", () => {
    objData.count = count;
    objData.boardState = boardState;
    objData.gameState = gameState;
    objData.id = "o";
    console.log("*******************");
    console.log(objData);
    console.log("*******************");

    io.emit("prevOrder", objData);
  });

  socket.on("getAll", (payload) => {
    console.log(payload);

    //
    console.log(players);

    console.log("connected getAll");
    let winerIs;

    // if (payload.count >= 7) {
    //   for (let i = 0; i < boardState.length; i++) {
    //     if ((boardState[i][0] == boardState[i][1]) == boardState[i][2]) {
    //       gameState = "win";
    //       winerIs = boardState[i][0];
    //     } else if ((boardState[0][i] == boardState[1][i]) == boardState[2][i]) {
    //       gameState = "win";
    //       winerIs = boardState[0][i];
    //     } else if (
    //       (boardState[0][0] == boardState[1][1]) == boardState[2][2] ||
    //       (boardState[0][2] == boardState[1][1]) == boardState[2][0]
    //     ) {
    //       gameState = "win";
    //       winerIs = boardState[1][1];
    //     }
    //   }
    //   if (gameState == "win") {
    //     //
    //   } else {
    //     gameState = "tie";
    //   }
    //   boardState = [
    //     [0, 0, 0],
    //     [0, 0, 0],
    //     [0, 0, 0],
    //   ];
    //   gameState = "on";
    //   count = 0;
    // }

    count = objData.count = payload.count;
    boardState = objData.boardState = payload.boardState;
    gameState = objData.gameState = gameState;

    console.log("###############################");
    console.log(objData);
    console.log("###############################");

    io.emit("order", objData);
  });
});

io.on("disconnect", function () {
  console.log("User disconnected:", io.id);
  // socket.broadcast.emit("clients", io.engine.clientsCount);
});
// app.listen(4000, () => console.log("Live"));

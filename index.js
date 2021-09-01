"use strict";

const io = require("socket.io")(process.env.PORT || 3000);

const uuid = require("uuid").v4; // random uuid

let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

/*



*/

let counter = 0;
let state = "on";

let objData = {};

io.on("connection", (socket) => {
  socket.on("getAll", (payload) => {
    //
    let winerIs;

    for (let i = 0; i < board.length; i++) {
      if ((board[i][0] == board[i][1]) == board[i][2]) {
        state = "win";
        winerIs = board[i][0];
      } else if ((board[0][i] == board[1][i]) == board[2][i]) {
        state = "win";
        winerIs = board[0][i];
      } else if (
        (board[0][0] == board[1][1]) == board[2][2] ||
        (board[0][2] == board[1][1]) == board[2][0]
      ) {
        state = "win";
        winerIs = board[1][1];
      }
    }
    if (state == "win") {
      //
    } else {
      state = "tie";
    }

    objData.counter = counter;
    objData.board = board;
    objData.state = state;

    socket.emit("order", objData);
  });
});

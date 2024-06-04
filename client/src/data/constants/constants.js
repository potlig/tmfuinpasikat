// import {io} from "socket.io-client"

// export const mode = "cors";
// export const headers = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   };

// export const ip = "tmfunpasikat.com"

// export const localIP = `http://${ip}:3001`;
// export const webSocketIP = `ws://${ip}:8080`;

// export const SocketIO = io('http://localhost:8080')

// // status:
// // 1. waiting - waiting for players to join
// // 2. start - stop waiting and go to select categories
// // 3. categories - selecting categories
// // 4. play - start playing the game
// // 5. end - the games end
// export const statusList = { waiting:"waiting",start: "start", categories: "categories", readying: "readying", play: "play", end: "end", reset:"reset" }


import {io} from "socket.io-client"

export const mode = "cors";
export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

export const ip = "www.tmfunpasikat.com"
export const GameUrl = "https://tmfunpasikat.com";
export const localIP = `https://tmfunpasikat.com/server`;
export const webSocketIP = `ws://${ip}:8080`;

export const SocketIO = io(`https://tmfunpasikat.com`, {path: "/socket/socket.io"})


// export const ip = "localhost"
// export const GameUrl = "http://localhost:3000";
// export const localIP = `http://localhost:3001`;
// export const webSocketIP = `ws://${ip}:8080`;

// export const SocketIO = io('http://localhost:8080')

// status:
// 1. waiting - waiting for players to join
// 2. start - stop waiting and go to select categories
// 3. categories - selecting categories
// 4. play - start playing the game
// 5. end - the games end
export const statusList = { waiting:"waiting",start: "start", categories: "categories", readying: "readying", play: "play", end: "end", reset:"reset" }
import app from "./app";

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});


// use it when we implement auto refresh through web sockets 
// import { createServer } from "http";
// import { Server } from "socket.io";
// import app from "./app";

// const server = createServer(app);              // Wrap the Express app in a raw HTTP server
// const io = new Server(server, {                // Create a WebSocket server
//   cors: { origin: "*" },                       // Allow frontend access (adjust in prod)
// });

// io.on("connection", (socket) => {
//   console.log("Client connected");             // This triggers when a client connects
//   // You can also add listeners or emit events to this socket
// });

// setInterval(() => {
//   io.emit("oddsUpdate", { /* odds data */ });  // Send updated odds to all clients every 30s
// }, 30000);

// server.listen(PORT, () => {
//   console.log(`Running at http://localhost:${PORT}`);
// });

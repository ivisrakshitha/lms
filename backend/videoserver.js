const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const os = require("os");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Video call functionality
const { setupVideoSocket } = require("./socket/videoSocket");
const { router: videoRoutes, setVideoData } = require("./routes/videoRoutes");

// Get local IP function for video calls
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
  return "0.0.0.0";
}

const LOCAL_IP = getLocalIP();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Socket.IO setup for video calls
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  pingTimeout: 300000,
  pingInterval: 5000,
});

// Setup video socket and get shared data
const { rooms, users } = setupVideoSocket(io);
setVideoData(rooms, users);

const VIDEO_PORT = process.env.VIDEO_PORT || 5001;

server.listen(VIDEO_PORT, () => {
  console.log(`Video Call Server Started on PORT ${VIDEO_PORT}`);
  console.log(`Video Local: http://localhost:${VIDEO_PORT}`);
  console.log(`Video Network: http://${LOCAL_IP}:${VIDEO_PORT}`);
  console.log(`Video Socket: ws://localhost:${VIDEO_PORT}/video`);
});

// Video call routes
app.use("/api/v1/video", videoRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send(`<div>
    Video Call Server - Default Route
    <p>Everything is OK</p>
    <p>Video Calling: ${rooms.size > 0 ? "Active" : "Ready"}</p>
    <p>Active Rooms: ${rooms.size}</p>
    <p>Connected Users: ${users.size}</p>
    </div>`);
});

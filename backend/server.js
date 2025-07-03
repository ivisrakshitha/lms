const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);

// packages
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const os = require("os");
require("dotenv").config();

// connection to DB and cloudinary
const { connectDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// Video call functionality
const { setupVideoSocket } = require("./socket/videoSocket");
const { router: videoRoutes, setVideoData } = require("./routes/videoRoutes");

// routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payments");
const courseRoutes = require("./routes/course");
const assignmentRoutes = require("./routes/assignment");

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
app.use(express.json()); // to parse json body
app.use(cookieParser());
app.use(
  cors({
    // origin: 'http://localhost:5173', // frontend link
    origin: "*",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
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

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Network: http://${LOCAL_IP}:${PORT}`);
  console.log(`Video Socket: ws://localhost:${PORT}/video`);
});

// connections
connectDB();
cloudinaryConnect();

// mount route
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/assignments", assignmentRoutes);

// Video call routes
app.use("/api/v1/video", videoRoutes);

// Default Route
app.get("/", (req, res) => {
  // console.log('Your server is up and running..!');
  res.send(`<div>
    This is Default Route
    <p>Everything is OK</p>
    <p>Video Calling: ${rooms.size > 0 ? "Active" : "Ready"}</p>
    </div>`);
});

// const express = require("express");
// const app = express();

// // packages
// const fileUpload = require("express-fileupload");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// require("dotenv").config();

// // connection to DB and cloudinary
// const { connectDB } = require("./config/database");
// const { cloudinaryConnect } = require("./config/cloudinary");

// // routes
// const userRoutes = require("./routes/user");
// const profileRoutes = require("./routes/profile");
// const paymentRoutes = require("./routes/payments");
// const courseRoutes = require("./routes/course");
// const assignmentRoutes = require("./routes/assignment");

// // middleware
// app.use(express.json()); // to parse json body
// app.use(cookieParser());
// app.use(
//   cors({
//     // origin: 'http://localhost:5173', // frontend link
//     origin: "*",
//     credentials: true,
//   })
// );
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp",
//   })
// );

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server Started on PORT ${PORT}`);
// });

// // connections
// connectDB();
// cloudinaryConnect();

// // mount route
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/assignments", assignmentRoutes);

// // Default Route
// app.get("/", (req, res) => {
//   // console.log('Your server is up and running..!');
//   res.send(`<div>
//     This is Default Route
//     <p>Everything is OK</p>
//     </div>`);
// });

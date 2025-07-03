const express = require("express");
const app = express();

// packages
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const os = require("os");
require("dotenv").config();

// connection to DB and cloudinary
const { connectDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payments");
const courseRoutes = require("./routes/course");
const assignmentRoutes = require("./routes/assignment");

// Get local IP function
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

const PORT = process.env.LMS_PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`LMS Server Started on PORT ${PORT}`);
  console.log(`LMS Local: http://localhost:${PORT}`);
  console.log(`LMS Network: http://${LOCAL_IP}:${PORT}`);
});

// connections
connectDB();
cloudinaryConnect();

// mount routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/assignments", assignmentRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send(`<div>
    LMS Server - Default Route
    <p>Everything is OK</p>
    <p>Server Type: Learning Management System</p>
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

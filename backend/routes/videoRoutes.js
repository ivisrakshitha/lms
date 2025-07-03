const express = require("express");
const router = express.Router();

// Video call room data (will be shared from socket)
let rooms = new Map();
let users = new Map();

// Function to set the shared data from socket
const setVideoData = (socketRooms, socketUsers) => {
  rooms = socketRooms;
  users = socketUsers;
};

// Authentication endpoint for video calls
router.post("/authenticate", (req, res) => {
  try {
    const token = `Bearer_${Math.random().toString(36).substr(2, 20)}`;
    res.json({
      token,
      success: true,
      message: "Authentication successful",
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
});

// Get users in a specific room
router.get("/rooms/:roomId/users", (req, res) => {
  try {
    const { roomId } = req.params;
    const roomUsers = rooms.has(roomId)
      ? Array.from(rooms.get(roomId))
          .map((id) => users.get(id))
          .filter((u) => u)
      : [];

    res.json({
      success: true,
      users: roomUsers,
      roomId: roomId,
      totalUsers: roomUsers.length,
    });
  } catch (error) {
    console.error("Get room users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get room users",
    });
  }
});

// Get all active rooms
router.get("/rooms", (req, res) => {
  try {
    const activeRooms = Array.from(rooms.keys()).map((roomId) => ({
      roomId,
      userCount: rooms.get(roomId).size,
      users: Array.from(rooms.get(roomId))
        .map((id) => users.get(id))
        .filter((u) => u)
        .map((u) => ({ id: u.id, name: u.name })),
    }));

    res.json({
      success: true,
      rooms: activeRooms,
      totalRooms: activeRooms.length,
    });
  } catch (error) {
    console.error("Get rooms error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get rooms",
    });
  }
});

// Create or join a room (optional endpoint)
router.post("/rooms/:roomId/join", (req, res) => {
  try {
    const { roomId } = req.params;
    const { userName } = req.body;

    // This endpoint just validates the room join request
    // Actual joining happens through socket connection
    res.json({
      success: true,
      message: "Room join request validated",
      roomId,
      userName: userName || `User_${Math.random().toString(36).substr(2, 4)}`,
    });
  } catch (error) {
    console.error("Room join validation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to validate room join",
    });
  }
});

module.exports = { router, setVideoData };

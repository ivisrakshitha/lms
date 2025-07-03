const rooms = new Map();
const users = new Map();

const authenticateUser = (token) => {
  if (token && (token.startsWith("Bearer ") || token.length > 0)) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: `User_${Math.random().toString(36).substr(2, 4)}`,
      authenticated: true,
    };
  }
  return { authenticated: false };
};

const setupVideoSocket = (io) => {
  const videoNamespace = io.of("/video");

  videoNamespace.on("connection", (socket) => {
    console.log("User connected to video namespace:", socket.id);

    // Join room handler
    socket.on("join-room", async (data) => {
      try {
        const { roomId, authorization, userName } = JSON.parse(data);
        const user = authenticateUser(authorization);

        if (!user.authenticated) {
          socket.emit("error", { message: "Authentication failed" });
          return;
        }

        // Use provided userName or fallback to generated name
        const finalUserName = userName || user.name;

        users.set(socket.id, {
          ...user,
          name: finalUserName,
          userName: finalUserName,
          roomId,
          socketId: socket.id,
        });

        socket.join(roomId);

        if (!rooms.has(roomId)) {
          rooms.set(roomId, new Set());
        }
        rooms.get(roomId).add(socket.id);

        const roomUsers = Array.from(rooms.get(roomId))
          .map((id) => users.get(id))
          .filter((u) => u);

        socket.emit("joined-room", {
          success: true,
          roomId,
          userId: user.id,
          users: roomUsers,
        });

        socket.to(roomId).emit("user-joined", {
          userId: user.id,
          userName: finalUserName,
          name: finalUserName,
          socketId: socket.id,
        });

        console.log(`User ${finalUserName} joined room ${roomId}`);
      } catch (error) {
        console.error("Join room error:", error);
        socket.emit("error", { message: "Failed to join room" });
      }
    });

    // WebRTC signaling handlers
    socket.on("offer", (data) => {
      socket
        .to(data.target)
        .emit("offer", { offer: data.offer, sender: socket.id });
    });

    socket.on("answer", (data) => {
      socket
        .to(data.target)
        .emit("answer", { answer: data.answer, sender: socket.id });
    });

    socket.on("ice-candidate", (data) => {
      socket
        .to(data.target)
        .emit("ice-candidate", {
          candidate: data.candidate,
          sender: socket.id,
        });
    });

    // Screen sharing handlers
    socket.on("screen-share-start", (data) => {
      socket.to(data.roomId).emit("user-screen-share", {
        userId: data.userId,
        socketId: socket.id,
        sharing: true,
      });
    });

    socket.on("screen-share-stop", (data) => {
      socket.to(data.roomId).emit("user-screen-share", {
        userId: data.userId,
        socketId: socket.id,
        sharing: false,
      });
    });

    // Disconnect handler
    socket.on("disconnect", () => {
      const user = users.get(socket.id);
      if (user) {
        const { roomId } = user;
        if (rooms.has(roomId)) {
          rooms.get(roomId).delete(socket.id);
          if (rooms.get(roomId).size === 0) {
            rooms.delete(roomId);
          }
        }
        users.delete(socket.id);
        socket
          .to(roomId)
          .emit("user-left", { userId: user.id, socketId: socket.id });

        console.log(`User ${user.name} disconnected from room ${roomId}`);
      }
    });
  });

  return { rooms, users };
};

module.exports = { setupVideoSocket };

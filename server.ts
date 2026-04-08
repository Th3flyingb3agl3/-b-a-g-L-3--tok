import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  // Real-time Beagle Livestream Logic
  const liveBeagles = new Map();

  io.on("connection", (socket) => {
    console.log("A beagle connected:", socket.id);

    socket.on("join-live", (beagleData) => {
      liveBeagles.set(socket.id, beagleData);
      io.emit("beagle-list-update", Array.from(liveBeagles.values()));
      socket.broadcast.emit("beagle-joined", `${beagleData.name} is now LIVE! 🐾`);
    });

    socket.on("send-bark", (message) => {
      const beagle = liveBeagles.get(socket.id);
      if (beagle) {
        io.emit("new-bark", {
          id: Date.now(),
          beagleName: beagle.name,
          message: message,
          timestamp: new Date().toISOString(),
        });
      }
    });

    socket.on("disconnect", () => {
      const beagle = liveBeagles.get(socket.id);
      if (beagle) {
        liveBeagles.delete(socket.id);
        io.emit("beagle-list-update", Array.from(liveBeagles.values()));
      }
      console.log("A beagle disconnected");
    });
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "BeagleTok Server is Barking!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`BeagleTok running on http://localhost:${PORT}`);
  });
}

startServer();

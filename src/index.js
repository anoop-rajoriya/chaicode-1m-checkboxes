import http from "http";
import path from "path";

import express from "express";
import { Server } from "socket.io";

const main = async () => {
  const app = express();
  const server = http.createServer(app);
  const port = 8080;
  const io = new Server(server);
  const checkboxes = new Array(100).fill(false);

  // express endpoints
  app.use(express.static("./public"));

  app.get("/checkboxes", (req, res) => {
    res.status(200).json({ checkboxes });
  });

  // socket events
  io.on("connection", (socket) => {
    socket.on("UPDATE", ({ key, value }) => {
      checkboxes[key] = value;
      socket.broadcast.emit("UPDATE", { key, value });
    });
  });

  server.listen(port, () =>
    console.log(`server running on http://localhost:${port}`),
  );
};

main().catch((error) => console.log(`SERVER ERROR "${error.message}"`, error));

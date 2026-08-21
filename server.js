const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.send("VitoBot läuft!");
});

wss.on("connection", (ws) => {
  console.log("WebSocket verbunden");

  ws.send(JSON.stringify({
    type: "status",
    message: "VitoBot ist online"
  }));

  ws.on("message", (message) => {
    console.log("Nachricht:", message.toString());

    ws.send(JSON.stringify({
      type: "response",
      message: "VitoBot hat deine Nachricht erhalten."
    }));
  });

  ws.on("close", () => {
    console.log("WebSocket getrennt");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`VitoBot läuft auf Port ${PORT}`);
});

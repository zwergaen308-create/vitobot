const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>VitoBot</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #111;
          color: white;
          text-align: center;
          padding: 40px 20px;
        }

        .box {
          max-width: 500px;
          margin: auto;
          padding: 30px;
          background: #1d1d1d;
          border-radius: 20px;
        }

        h1 {
          color: #00ff88;
        }

        .status {
          font-size: 20px;
          margin: 25px 0;
        }

        button {
          padding: 14px 25px;
          border: none;
          border-radius: 10px;
          background: #00ff88;
          color: #111;
          font-size: 16px;
          font-weight: bold;
        }
      </style>
    </head>

    <body>
      <div class="box">
        <h1>🤖 VitoBot</h1>
        <div class="status">🟢 VitoBot ist online</div>
        <button onclick="sendMessage()">
          VitoBot testen
        </button>
      </div>
    <script>
function sendMessage() {
  alert("VitoBot empfängt jetzt Nachrichten!");
}
</script>
    </html>
  `);
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

server.listen(PORT, "0.0.0.0", () => {
  console.log(`VitoBot läuft auf Port ${PORT}`);
});

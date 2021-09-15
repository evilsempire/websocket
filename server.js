const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const app = express();

const port = process.env.PORT || 6969;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    })
  })
});

app.get( '/', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, 'index.html' ) );
} );

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})
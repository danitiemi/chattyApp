// server.js

const express = require('express');
const SocketServer = require('ws');
// Generate and return a RFC4122 v4 UUID.
const uuidv4 = require('uuid/v4')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    // console.log(message);
    console.log(JSON.parse(message));

    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if ( client.readyState === SocketServer.OPEN ) {
        const parsedMessage = JSON.parse(message);
        parsedMessage['id'] = uuidv4();
        client.send(JSON.stringify(parsedMessage));
        console.log(parsedMessage);
      }
    });

    
    
    // console.log('User ' + messageP.username + ' said Hi' );
    // console.log('User randomID of ' + parsedMessage.username + ' is ' + parsedMessage.id );
  });

 

  // ws.send('new message');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
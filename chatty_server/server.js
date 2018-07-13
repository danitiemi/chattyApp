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
  let connectedUsers = {};
  connectedUsers['counter'] = wss.clients.size;
  connectedUsers['type']= 'number';
  connectedUsers = JSON.stringify(connectedUsers);

  wss.clients.forEach(function each(client) {
      client.send(connectedUsers);
      console.log(connectedUsers);   
  });
  

  ws.on('message', function incoming(message) {
    // console.log(message);
    let parsedMessage = JSON.parse(message);

    switch(parsedMessage.type){
      case 'postMessage':
       console.log("we are in messages");
        // Broadcast to everyone else.
        wss.clients.forEach(function each(client) {
          if ( client.readyState === SocketServer.OPEN ) {
            parsedMessage['id'] = uuidv4();
            const stringMessage = JSON.stringify(parsedMessage);
            client.send(stringMessage);
          }
        });
        break;

        case 'postNotification':
          console.log("We received notification");
          wss.clients.forEach(function each(client) {
            if ( client.readyState === SocketServer.OPEN ) {
              parsedMessage['id'] = uuidv4();
              const stringMessage = JSON.stringify(parsedMessage);
              client.send(stringMessage);
            }
            
          });
        break;


    }
    
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    let connectedUsers = {};
    connectedUsers['counter'] = wss.clients.size;
    connectedUsers['type']= 'number';
    connectedUsers = JSON.stringify(connectedUsers);

    wss.clients.forEach(function each(client) {
        client.send(connectedUsers);
        console.log(connectedUsers);   
    });

  });
});
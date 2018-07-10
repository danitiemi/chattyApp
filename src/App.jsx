import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

// Load up the application styles
// require("../styles/application.scss");

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <main className="messages">
          <Message />
          <MessageList />
        </main>
        <ChatBar />
      </div>
    );
  }
}



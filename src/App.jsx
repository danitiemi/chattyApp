import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        name: 'Anonymous'
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [ 
      ],
      counter: 0
    
    };
    this.onPost = this.onPost.bind(this);
    this.onNewName = this.onNewName.bind(this);
  }

  onPost (username, content, type) {
    const newMessage = {
      username: this.state.currentUser,
      content: content,
      type: type,
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  onNewName (type, newUser, notification) {
    const newNotification = {
      type: type,
      notification: notification,
      username: newUser
    };
    this.setState({ currentUser: newUser });
    this.socket.send(JSON.stringify(newNotification));
  }

  componentDidMount() {
    const url = window.location.hostname;
    this.socket = new WebSocket(`ws://${url}:3001`);

    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };
    
    this.socket.onmessage = (event) => {
      // The socket event data is encoded as a JSON string.
      const data = JSON.parse(event.data);
      if (data.type === 'number') {
        this.setState({ counter: data.counter})
      } else {
        switch(data.type) {
          case "postMessage":
              let newMessage = data;
              let allMessages = this.state.messages.concat(newMessage);
              this.setState({messages: allMessages});
            break;
          case "postNotification":
            newMessage = data;
            allMessages = this.state.messages.concat(newMessage);
            this.setState({messages: allMessages});
            break;
          default:
        }
      }
    }
  }
  render() {
    
    return (
      <div>
        <NavBar counter={ this.state.counter } />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={this.state.currentUser} onNewName={ this.onNewName } onPost={ this.onPost }/>
      </div>
    );
  }
}



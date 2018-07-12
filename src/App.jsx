import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Shark'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        // {
        //   id: 1,
        //   username: 'Bob',
        //   content: 'Has anyone seen my marbles?',
        // },
        // {
        //   id: 2,
        //   username: 'Anonymous',
        //   content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        // }
      ]
    };
    this.onPost = this.onPost.bind(this);
    this.socket = new WebSocket(`ws://localhost:3001/`);
  }

  onPost (username, content) {
    
    // const newId = this.state.messages.length + 2;
    const newMessage = {
      // id: newId,
      username: username,
      content: content
    };
    // const messages = this.state.messages.concat(newMessage);
    // this.setState({messages: messages});
    this.socket.send(JSON.stringify(newMessage));
   
  }

  componentDidMount() {
    
    this.socket.onmessage = function (event) {
      console.log('Connected to server');
      console.log(event);
    }

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  render() {
    
    return (
      <div>
        <NavBar />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser.name } onPost={ this.onPost }/>
      </div>
    );
  }
}



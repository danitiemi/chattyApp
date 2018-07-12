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
    this.onBroadcast = this.onBroadcast.bind(this);
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
    this.socket.addEventListener('message', this.onBroadcast);
   
  }

  onBroadcast (event) {
    console.log(event);
    const broadcastMessage = JSON.parse(event.data);
    const messageObj = { 
      id: broadcastMessage.id,
      username: broadcastMessage.username,
      content: broadcastMessage.content
    };
    console.log(messageObj);
    let messages = this.state.messages.concat(messageObj);
    console.log('this.state', this.state);
    console.log(messages, 'onBroadcast messages');
    this.setState({ messages: messages });
  }

  componentDidMount() {
    
    this.socket.onopen = function (event) {
      console.log('Connected to server');

      // console.log('event', event);
      
      // console.log(broadcastMessage);
     
      // switch(broadcastMessage.type) {
      //   case 'id':
      //     id = broadcastMessage.id;
      //     // setUsername();
      //     break;
        
      //   case 'username':
      //     username = broadcastMessage.username;
      //     break;

      //   case 'content':
      //     content = broadcastMessage.content;
      //     break;
      // }
    }

    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
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



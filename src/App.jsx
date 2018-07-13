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
        // {
        //   id: 1,
        //   username: 'Bob',
        //   content: 'Has anyone seen my marbles?',
        //   type: 'message'
        // },
        // {
        //   id: 2,
        //   username: 'Anonymous',
        //   content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        // }
      ]
    
    };
    this.onPost = this.onPost.bind(this);
    //this.onBroadcast = this.onBroadcast.bind(this);
    this.onNewName = this.onNewName.bind(this);
  }

  onPost (username, content, type) {
    //console.log("We are in OnPOSt");
    const newMessage = {
      // id: newId,
      username: this.state.currentUser,
      content: content,
      type: type,
    };
    console.log("test ",newMessage);
    this.socket.send(JSON.stringify(newMessage));
    //this.socket.addEventListener('message', this.onBroadcast);
  }

  onNewName (type, newUser, notification) {
    const newNotification = {
      type: type,
      notification: notification,
      username: newUser
    };
    console.log('newNotification', newNotification);
    this.setState({ currentUser: newUser });
    this.socket.send(JSON.stringify(newNotification));
    //this.socket.addEventListener('message', this.onBroadcast);
  }

  // onBroadcast (event) {
  //   console.log("test ",event);
  //   // const broadcastMessage = JSON.parse(event.data);
  //   // console.log("pre: ", broadcastMessage);
  //   // const messageObj = { 
  //   //   id: broadcastMessage.id,
  //   //   type: broadcastMessage.type,
  //   //   content: broadcastMessage.notification
  //   // };  
  //   // console.log("hithere", messageObj);
  //   // let messages = this.state.messages.concat(messageObj);
  //   // // console.log('this.state', this.state);
  //   // // console.log(messages, 'onBroadcast messages');
  //   // this.setState({ messages: messages });
  // };

  componentDidMount() {
    //const url = window.location.hostname;
    //this.socket = new WebSocket(`ws://${url}:3001`);
    this.socket = new WebSocket("ws://localhost:3001");
      this.socket.onmessage = (event) => {
        // The socket event data is encoded as a JSON string.
        // This line turns it into an object
        const data = JSON.parse(event.data);
        // console.log("Test ", data);
        switch(data.type) {
          case "postMessage":
              let newMessage = data;
              let allMessages = this.state.messages.concat(newMessage);
              this.setState({messages: allMessages});
          // handle incoming message
            break;
          case "postNotification":
            newMessage = data;
            allMessages = this.state.messages.concat(newMessage);
            this.setState({messages: allMessages});
          // handle incoming notification
            break;
          default:
          // show an error in the console if the message type is unknown
            //throw new Error("Unknown event type " + data.type);
        }
      }
    
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
        {/* <Notification messages={ this.state.messages.postNotification } /> */}
        <ChatBar currentUser={this.state.currentUser} onNewName={ this.onNewName } onPost={ this.onPost }/>
      </div>
    );
    console.log('postNotification' , this.state.messages.postNotification)
  }
}



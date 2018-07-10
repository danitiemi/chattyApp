import React, {Component} from 'react';

export default class Chatbar extends React.Component {
    
  constructor(props) {
    super(props); 
    // this.state = { message: "" };
    // this.submitMessage = this.submitMessage.bind(this);
    
  }

  // submitMessage() {
  //   const { message } = this.state;
  //   addMessage(message);
  //   this.setState({ message: "" });
  // }

  render() {
    const { currentUser } = this.props;
    return (  
        <footer className="chatbar">
          <input className="chatbar-username" placeholder= { currentUser } />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      );
  }
}


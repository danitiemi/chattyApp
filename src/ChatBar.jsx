import React, {Component} from 'react';

export default class Chatbar extends Component {
    
  constructor(props) {
    super(props); 
    this.state = { 
      username: this.props.currentUser,
      content: '',
      type: ''
    };
    this.onEnter = this.onEnter.bind(this);
    this.onNewUserName = this.onNewUserName.bind(this);
  }

  onEnter(event) {
    if(event.key === 'Enter') {
      const type = 'postMessage';
      const user = this.state.username;
      const currentUser = { name: user };
      const content = event.target.value;
      this.props.onPost(user, content, type);
      event.target.value = '';
    }
  }

  onNewUserName(event) {
    let notification = '';
    if(event.key === 'Enter') {
      let currentUserName = this.props.currentUser.name;
      if (currentUserName === undefined ) {
        let currentUserName = 'Anonymous';
        const type = 'postNotification';
        const newUserName = event.target.value;
        const notification = `${currentUserName} has changed their name to ${newUserName}.`;
        this.props.onNewName(type, newUserName, notification);
        this.setState({username: event.target.value});
      } else {
        const type = 'postNotification';
        const newUserName = event.target.value;
        const notification = `${currentUserName} has changed their name to ${newUserName}.`;
        this.props.onNewName(type, newUserName, notification);
        this.setState({username: event.target.value});
      }
    }  
  }

  render() {
    return (  
        <footer className="chatbar">
          <input className="chatbar-username" placeholder= 'Name + ENTER' onKeyUp={ this.onNewUserName } /> 
          <input className="chatbar-message" placeholder='Type a message + ENTER'  onKeyUp={ this.onEnter }/>
        </footer>
      );
  }
}
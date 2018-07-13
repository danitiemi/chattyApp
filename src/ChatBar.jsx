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
      console.log("we are in enter of the message");
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
        // console.log('here', this.props.currentUser);
        const newUserName = event.target.value;
        const notification = `${currentUserName} has changed their name to ${newUserName}.`;
        //console.log("TEST ", notification);
        this.props.onNewName(type, newUserName, notification);
        // console.log(currentUser, 'currentUser');
        // console.log(newUser, 'newUser');
        this.setState({username: event.target.value});
      } else {
        const type = 'postNotification';
        // let currentUserName = this.props.currentUser;
        // console.log('here', this.props.currentUser);
        const newUserName = event.target.value;
        const notification = `${currentUserName} has changed their name to ${newUserName}.`;
        //console.log("TEST ", notification);
        this.props.onNewName(type, newUserName, notification);
        // console.log(currentUser, 'currentUser');
        // console.log(newUser, 'newUser');
        this.setState({username: event.target.value});
      }
      
    }  
    // if(event.key === 'Enter') {
    //   const type = 'postNotification';
    //   const currentUserName = this.props.currentUser;
    //   // console.log('here', this.props.currentUser);
    //   const newUserName = event.target.value;
    //   const notification = `${currentUserName} has changed their name to ${newUserName}.`;
    //   //console.log("TEST ", notification);
    //   this.props.onNewName(type, newUserName, notification);
    //   // console.log(currentUser, 'currentUser');
    //   // console.log(newUser, 'newUser');
    //   this.setState({username: event.target.value});
    // }  
  }

  render() {
    // const { currentUser } = this.props;
    
    return (  
        <footer className="chatbar">
          <input className="chatbar-username" placeholder= 'Name' onKeyUp={ this.onNewUserName } /> 
          <input className="chatbar-message" placeholder='Type a message and hit ENTER'  onKeyUp={ this.onEnter }/>
        </footer>
      );
  }
}
import React, {Component} from 'react';

export default class Chatbar extends Component {
    
  constructor(props) {
    super(props); 
    this.state = { 
      username: this.props.currentUser,
      content: '' 
    };
    this.onEnter = this.onEnter.bind(this);
  }

  onEnter(event) {
    if(event.key === 'Enter') {
      const currentUser = this.state.username;
      const content = event.target.value;
      this.props.onPost(currentUser, content);
    }
  }

  onNewUserName(event) {
    this.setState({username: event.target.value});
  }

  render() {
    const { currentUser } = this.props;
    
    return (  
        <footer className="chatbar">
          <input className="chatbar-username" placeholder= { currentUser } />
          <input className="chatbar-message" placeholder='Type a message and hit ENTER'  onKeyUp={ this.onEnter }/>
        </footer>
      );
  }
}


import React, {Component} from 'react';

export default class Chatbar extends Component {
    
  constructor(props) {
    super(props); 
    this.state = { 
      username: '',
      content: '' 
    };
    this.onEnter = this.onEnter.bind(this);
    this.onNewUserName = this.onNewUserName.bind(this);
  }

  onEnter(event) {
    if(event.key === 'Enter') {
      const user = this.state.username;
      const content = event.target.value;
      this.props.onPost(user, content);
      event.target.value = "";
    }
  }

  onNewUserName(event) {
    this.setState({username: event.target.value});
  }

  render() {
    // const { currentUser } = this.props;
    
    return (  
        <footer className="chatbar">
          <input className="chatbar-username" placeholder= 'Name' value={ this.state.value } onChange={ this.onNewUserName }/> 
          <input className="chatbar-message" placeholder='Type a message and hit ENTER'  onKeyUp={ this.onEnter }/>
        </footer>
      );
  }
}


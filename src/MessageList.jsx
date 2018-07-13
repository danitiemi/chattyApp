import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

export default class MessageList extends Component {
  render() {
    const messages = this.props.messages.map( message => {
      console.log('message list' , message);
      if (message.type === 'postNotification') {
        return <Notification 
        key={ message.id }
        notification={ message.notification }
        username={ message.username }
       />
      } else {
      return <Message
        key={ message.id }
        username={ message.username }
        content={ message.content } />
      }
    });
    console.log( 'messages', messages );

    return (  
      
      <main className="messages">
        { messages }
        <div className="notification">
        </div>
      </main>
    );
  }
}
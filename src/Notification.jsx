import React from 'react';

export default function Notification(props) {
    return (  
        <div className="notification">
        <span className="notification-content"> { props.notification } </span>
        </div>
    );
}
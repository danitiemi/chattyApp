import React from 'react';

export default function NavBar(props) {
  return (  
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="counter"> { props.counter } users online </span>
    </nav>
  );
}
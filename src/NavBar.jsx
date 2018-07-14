import React from 'react';

export default function NavBar(props) {
  return (  
    <nav className="navbar">
      <span><i className="fas fa-project-diagram"></i></span>
      <span><a href="/" className="navbar-brand">Chatty</a></span>
      <span className="counter"> { props.counter } users online </span>
    </nav>
  );
}
import React, { Component } from 'react';
import RSACrypt from './RSACrypt.js'
import './MainContainer.css';

class MainContainner extends Component {
  render() {
    return (
      <div className="MainContaner">
        <RSACrypt />
      </div>
    );
  }
}

export default MainContainner;

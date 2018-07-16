import React, { Component } from 'react';
import RSACrypt from './RSACrypt.js'
import Euclidean from './Euclidean-Algorithm'
import './MainContainer.css';

class MainContainner extends Component {
  constructor(){
    super();
    this.state = {
      "viewing": 1
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    this.state.viewing ? this.setState({viewing : 0}) : this.setState({viewing : 1});
  }

  render() {
    return (
      <div>
        <button onClick={this.toggle}>Toggle</button>
        <div className="MainContainer">
          {this.state.viewing ? <Euclidean /> : <RSACrypt />}
        </div>
      </div>
    );
  }
}

export default MainContainner;

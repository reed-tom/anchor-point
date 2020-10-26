import React, { Component } from 'react';
import logo from './logo.svg';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./app/header/Header";
import Body from "./app/content/Body";


class App extends Component {
  constructor(props) {
    super(props);
    this.state={}
  
  }
  componentWillMount() {
  }
  render() {  
    return (
      <div className="ap-root">
        <div id="portal-root" />
        <Header />
        <Body />
      </div>
    )
  }
}
export default App;

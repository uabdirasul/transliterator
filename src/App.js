import React, { Component } from "react";
import Header from "./Layout/Header/Header";
import Main from "./Layout/Main/Main";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Main />
      </React.Fragment>
    );
  }
}

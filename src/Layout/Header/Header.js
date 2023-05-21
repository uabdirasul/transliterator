import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header>
        <div className="container header__container">
          <h1>Latin-Kirill Transliterator</h1>
        </div>
      </header>
    );
  }
}

export default Header;

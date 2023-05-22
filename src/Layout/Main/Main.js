import React, { Component, createRef } from "react";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super();
    this.state = {
      transliterator__text__lang: "kaa_latin",
      transliterator__result__lang: "kaa_cyrillic",
      transliterated__text: "",
    };
    this.transliterateRef = createRef();
  }

  handleSelect = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.from-to.uz/api/v1/transliterate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            body: {
              lang_from: this.state.transliterator__text__lang,
              lang_to: this.state.transliterator__result__lang,
              text: this.transliterateRef.current.value,
            },
          }),
        }
      );
      const result = await response.json();
      this.setState({
        transliterated__text: result.result,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  render() {
    return (
      <main>
        <div className="main__container container">
          <div className="transliterator">
            <div className="transliterator__text">
              <select
                className="transliterator__text__lang"
                name="transliterator__text__lang"
                onChange={this.handleSelect}
                value={this.state.transliterator__text__lang}
              >
                <option value="kaa_latin" key="kaa_latin">
                  Latin
                </option>
                <option value="kaa_cyrillic" key="kaa_cyrillic">
                  Kirill
                </option>
              </select>
              <textarea
                className="textarea"
                cols="30"
                rows="10"
                placeholder="Jazıń..."
                ref={this.transliterateRef}
                onChange={this.fetchData}
              ></textarea>
              <button className="btn reset__button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                  width="30"
                  height="30"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z" />
                </svg>
              </button>
            </div>
            <div className="transliterator__result">
              <select
                className="transliterator__result__lang"
                name="transliterator__result__lang"
                onChange={this.handleSelect}
                value={this.state.transliterator__result__lang}
              >
                <option value="kaa_cyrillic" key="kaa_cyrillic">
                  Kirill
                </option>
                <option value="kaa_latin" key="kaa_latin">
                  Latin
                </option>
              </select>
              <textarea
                className="textarea"
                cols="30"
                rows="10"
                value={this.state.transliterated__text}
              ></textarea>
              <button className="btn copy__button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  width="30"
                  height="30"
                  fill="currentColor"
                >
                  <path d="M280 64h40c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128c0-35.3 28.7-64 64-64h49.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64h9.6zM64 112c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h256c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16h-16v24c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24v-24H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Main;

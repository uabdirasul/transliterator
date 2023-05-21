import React, { Component, createRef } from "react";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super();
    this.state = {
      transliterator__text__lang: "uz_latin",
      transliterator__result__lang: "uz_cyrillic",
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
      console.log(result, this);
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
                <option value="uz_latin" key="uz_latin">
                  Latin
                </option>
                <option value="uz_cyrillic" key="uz_cyrillic">
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
            </div>
            <div className="transliterator__result">
              <select
                className="transliterator__result__lang"
                name="transliterator__result__lang"
                onChange={this.handleSelect}
                value={this.state.transliterator__result__lang}
              >
                <option value="uz_cyrillic" key="uz_cyrillic">
                  Kirill
                </option>
                <option value="uz_latin" key="uz_latin">
                  Latin
                </option>
              </select>
              <textarea className="textarea" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Main;

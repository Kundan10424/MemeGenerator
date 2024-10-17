import React, { Component } from "react";
import Draggable from 'react-draggable'; // Import the Draggable component
import "./memeGenerator.css"

class MemeGenerator extends Component {
  constructor() {
    super()

    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const randomIndex = Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randomMeme = this.state.allMemeImgs[randomIndex]

    this.setState({
      randomImg: randomMeme.url
    })
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data
        this.setState({ allMemeImgs: memes })
      })
  }

  render() {
    return (
      <main>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />

          <button>Generate</button>
        </form>

        <div className="meme">
          <img className="img" src={this.state.randomImg} alt="" />
          
          {/* Make topText draggable */}
          <Draggable>
            <div className="text-overlay top-text">
              <h2>{this.state.topText}</h2>
            </div>
          </Draggable>

          {/* Make bottomText draggable */}
          <Draggable>
            <div className="text-overlay bottom-text">
              <h2>{this.state.bottomText}</h2>
            </div>
          </Draggable>
        </div>
      </main>
    )
  }
}

export default MemeGenerator;

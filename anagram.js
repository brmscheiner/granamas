"use strict"

class Anagram = {
  constructor() {
    this.config = {}
    this.charData = []
    this.lastState = null
  }

  initialize(configDictionary) {
    this.config = configDictionary

    for (let text in this.config.states) {
      if (!this.lastState) {
        this.renderState(text, "visible")
        this.lastState = state
      } else {
        this.renderState(text, "hidden")
      }
    }
  }

  renderState(state, display) {
    let charSpans = this.separateChars(text)
    let charData = initialCharSpans.map(getCharData)
  }

  separateChars(text) {
    let wordArray = text.split(' ')
    wordArray.forEach(())
    let charSpans = charArray.map((char, i) => {
      let charSpan = document.createElement("span")
          charSpan.className = "char"
          charSpan.innerHTML = char
      this.config.container.appendChild(charSpan)
      return charSpan
    })
    return charSpans
  }

  // Re-render the config.container as separate spans

  step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    let pct = progress / config.duration*1000;
    for (i=0; i<allChars.length; i++) {
      this.animationControl(i,pct)
    }
    if (pct<100) {
      requestAnimationFrame(this.step)
    }
  }

  Anagram.animateTo("stateName") => {}
    // then, calculate the positions of all chars
    this.create
    window.requestAnimationFrame(this.step)
  }
}

"use strict"

class Anagram {
  constructor() {
    this.config = {}
    this.charData = []
    this.lastState = null
  }

  animationControl(timestampe,state1,state2) {
    if (!start) start = timestamp;
    let progress = timestamp - start;
  }

  animateTo(state) {
    // then, calculate the positions of all chars
    window.requestAnimationFrame()
  }

  getCharData(charSpan) {
    let charData = {}
    charData.char = charSpan.innerHTML
    charData.x = charSpan.offsetLeft
    charData.y = charSpan.offsetTop
    return charData
  }

  initialize(configDictionary) {
    this.config = configDictionary
    let stateKeys = Object.keys(this.config.states)

    for (let i in stateKeys) {
      if (!this.lastState) {
        this.renderState(i, "visible")
        this.lastState = i
      } else {
        this.renderState(i, "hidden")
      }
    }
  }

  renderState(state, display) {
    let text = this.config.states[state]
    let charSpans = this.separateChars(text)
    this.charData[state] = charSpans.map((charSpan) => getCharData(charSpan))
  }

  separateChars(text) {
    let wordArray = text.split(' ')
    let charSpans = []
    wordArray.forEach((word, i) => {
      let wordSpan = document.createElement("span")
          wordSpan.className = "word"
      let charArray = word.split('')
          charArray.push(' ')
      charArray.forEach((char, i) => {
        let charSpan = document.createElement("span")
            charSpan.className = "char"
            charSpan.innerHTML = char
        wordSpan.appendChild(charSpan)
        charSpans.push(charSpan)
      })
      this.config.container.appendChild(wordSpan)
    })
    return charSpans
  }
}

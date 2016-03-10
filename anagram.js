"use strict"

class Anagram {
  constructor() {
    this.config = {}
    this.counter = 0
    this.charData = []
    this.lastState = null
  }

  animateTo(stateKey) {
    console.log(stateKey)
    this.config.nSteps = this.config.duration * 60 // 60 fps
    let charsToDisplay = this.charData[stateKey]
    charsToDisplay.forEach((char, i) => {
      console.log(char)
      // i.xStep = (i["state2"].x - i["state1"].x)/config.nSteps + i["state1"].x
      // i.yStep = (i["state2"].y - i["state1"].y)/config.nSteps + i["state1"].y
    })

    // window.requestAnimationFrame()
  }

  step(timestamp) {
    for (i=0; i<allChars.length; i++) {
      this.animationControl(i)
    }
    if (this.counter < this.config.nSteps) {
      requestAnimationFrame(this.step)
      this.counter++
    } else {
      this.counter = 0
    }
  }

  animationControl(charObj) {
    element.style.transform = "translate(" + i.xStep + "px, " + i.yStep + "px)"
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

    stateKeys.forEach((stateKey, i) => {
      if (!this.lastState) {
        this.config.container.className = "anagram-container"
        this.renderState(stateKey, this.config.container)
        this.lastState = stateKey
      } else {
        let newContainer = this.config.container.cloneNode()
            newContainer.style = this.config.container.style
            newContainer.className = "anagram-container invisible"
        document.body.appendChild(newContainer)
        this.renderState(stateKey, newContainer)
      }
    })
  }

  renderState(stateKey, container) {
    let text = this.config.states[stateKey]
    container.left = this.config.container.offsetLeft
    container.top = this.config.container.offsetTop
    let charSpans = this.separateChars(text, container)
    this.charData[stateKey] = charSpans.map((charSpan) => this.getCharData(charSpan))
  }

  separateChars(text, container) {
    let wordArray = text.split(' ')
    let charSpans = []
    wordArray.forEach((word, i) => {
      let wordSpan = document.createElement("span")
      wordSpan.className = "word"
      let charArray = word.split('')
      if (i < wordArray.length - 1) {
        charArray.push(' ')
      }
      charArray.forEach((char, i) => {
        let charSpan = document.createElement("span")
        charSpan.className = "char"
        charSpan.innerHTML = char
        wordSpan.appendChild(charSpan)
        charSpans.push(charSpan)
      })
      container.appendChild(wordSpan)
    })
    return charSpans
  }
}

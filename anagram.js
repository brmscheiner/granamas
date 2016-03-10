"use strict"

class Anagram {
  constructor() {
    this.animationData = []
    this.config = {}
    this.counter = 0
    this.charData = []
    this.lastState = null
  }

  animateTo(stateKey) {
    console.log(stateKey)
    this.config.nSteps = this.config.duration * 60 // 60 fps
    this.counter = this.config.nSteps
    let charsToDisplay = this.charData[stateKey]
    this.config.container.innerHTML = ''
    charsToDisplay.forEach((char, i) => {
      let generatedChar = { x: 0, y: 0 }
      let prevChar = this.getPrevChar(char.char) || generatedChar
      let xStep = (char.x - prevChar.x) / this.config.nSteps
      let yStep = (char.y - prevChar.y) / this.config.nSteps
      let animatedChar = {
        element: char.element,
        xStep: xStep,
        yStep: yStep
      }
      this.animationData.push(animatedChar)
      this.config.container.appendChild(char.element)
    })
    window.requestAnimationFrame(() => this.animateStep())
    this.resetUsedChars()
  }

  animateStep(timestamp) {
    this.animationData.forEach((char, i) => {
      this.getAnimation(char)
    })
    if (this.counter > 0) {
      requestAnimationFrame(() => this.animateStep())
      this.counter -= 1
    } else {
      this.counter = 0
    }
  }

  getAnimation(char) {
    char.element.style.transform = "translate(" + char.xStep * this.counter + "px, " + char.yStep * this.counter + "px)"
  }

  getCharData(charSpan) {
    let charData = {}
    charData.element = charSpan
    charData.char = charSpan.innerHTML
    charData.x = charSpan.offsetLeft
    charData.y = charSpan.offsetTop
    return charData
  }

  getPrevChar(char) {
    let prevChars = this.charData[this.lastState]
    for (let i = 0; i < prevChars.length; i++) {
      if (!prevChars[i].used && prevChars[i].char === char) {
        prevChars[i].used = true
        return prevChars[i]
      }
    }
    return null
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

  resetUsedChars() {
    for (let state in this.charData) {
      this.charData[state].forEach((char, j) => {
        delete char.used
      })
    }
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

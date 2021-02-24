import './styles/styles.sass'
import '@fortawesome/fontawesome-free/js/all.min'
import imgOne from './photos/one.jpg'
import imgTwo from './photos/two.jpg'
import imgThree from './photos/three.jpg'
import imgFour from './photos/four.jpg'
import about from './photos/about.jpg'
// App DIV
const app = document.querySelector('#app')
// Image Array
const images = [imgFour, imgOne, imgTwo, imgThree, about, imgFour, imgOne]
// Adds images to slideshow
const addImages = (imagesArray = [], container) => {
  imagesArray.forEach(img => {
    const newImg = new Image()
    newImg.src = img
    container.appendChild(newImg)
  })
}

// Constants and variables
const transformOn = 'transform 500ms'
const transformOff = '0ms all'
const width = 70
const unit = 'vw'
let progress = -width
let currentImg = 1

// Sleep Function
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const handlePrev = async () => {
  // stop autoplay if you press the button
  if (play.innerHTML === 'pause') {
    console.log('TT')
    handlePlay()
  }
  progress += width
  imgContainer.style.transition = transformOn
  imgContainer.style.transform = `translateX(${progress}${unit})`
  currentImg--
  // Logic to make it loop infinitely
  if (currentImg === 0) {
    await sleep(500)
    progress = -width * (images.length - 2)
    imgContainer.style.transition = transformOff
    imgContainer.style.transform = `translateX(${progress}${unit})`
    currentImg = (images.length - 2)
  }
}
// Function fot forward
const handleNext = async (e, program = false) => {
  // stop autoplay if you press the button
  if (play.innerHTML === 'pause' && program === false) {
    handlePlay()
  }
  progress -= width
  imgContainer.style.transition = transformOn
  imgContainer.style.transform = `translateX(${progress}${unit})`
  currentImg++
  // Logic to make it loop infinitely
  if (currentImg === images.length - 1) {
    await sleep(500)
    progress = -width
    imgContainer.style.transition = transformOff
    imgContainer.style.transform = `translateX(${progress}${unit})`
    currentImg = 1
  }
}
// Toggles Play State
const handlePlay = () => {
  if (auto) {
    auto = false
    play.innerHTML = 'play'
    return
  }
  auto = true
  autoPlay()
  play.innerHTML = 'pause'
}
// AutoPlay Flag
let auto = true
// AutoPlay Logic
const autoPlay = async () => {
  if (auto) {
    await sleep(2000)
    handleNext(1, true)
    await sleep(2000)
    autoPlay()
  }
}
// Build Frame Div
const frame = document.createElement('div')
frame.className = 'frame'
// Build Img Container Div
const imgContainer = document.createElement('div')
imgContainer.className = 'imgContainer'
// Add all images to div
addImages(images, imgContainer)
// Render
frame.appendChild(imgContainer)
app.appendChild(frame)
// Build Btn Div
const btnHolder = document.createElement('div')
btnHolder.className = 'btnHolder'
// Creates Buttons
const prev = document.createElement('button')
prev.id = 'prev'
prev.innerHTML = '<'
prev.addEventListener('click', handlePrev)
btnHolder.appendChild(prev)

const play = document.createElement('button')
play.id = 'play'
play.innerHTML = 'pause'
play.addEventListener('click', handlePlay)
btnHolder.appendChild(play)

const next = document.createElement('button')
next.id = 'next'
next.innerHTML = '>'
next.addEventListener('click', handleNext)
btnHolder.appendChild(next)
// Render Buttons
app.appendChild(btnHolder)
// Start AutoPlay
autoPlay()

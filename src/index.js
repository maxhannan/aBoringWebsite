import './styles/styles.sass'
// import '@fortawesome/fontawesome-free/js/all.min'
import imgOne from './photos/one.jpg'
import imgTwo from './photos/two.jpg'
import imgThree from './photos/three.jpg'
import imgFour from './photos/four.jpg'

const app = document.querySelector('#app')
const images = [imgFour, imgOne, imgTwo, imgThree, imgFour, imgOne]

const addImages = (images, container) => {
  images.forEach(img => {
    const newImg = new Image()
    newImg.src = img
    container.appendChild(newImg)
  })
}

const frame = document.createElement('div')
frame.className = 'frame'
const imgContainer = document.createElement('div')
imgContainer.className = 'imgContainer'

addImages(images, imgContainer)

frame.appendChild(imgContainer)
app.appendChild(frame)

// BUTTONS
const transformOn = 'transform 500ms ease-in-out'
const transformOff = '0ms all'
const width = 70
const unit = 'vw'
let progress = -width
let currentImg = 1

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const handlePrev = async () => {
  progress += width
  imgContainer.style.transition = transformOn
  imgContainer.style.transform = `translateX(${progress}${unit})`
  currentImg--
  if (currentImg === 0) {
    await sleep(500)
    progress = -width * (images.length - 2)
    imgContainer.style.transition = transformOff
    imgContainer.style.transform = `translateX(${progress}${unit})`
    currentImg = (images.length - 2)
  }
}

const handleNext = async (e, program = false) => {
  if (play.innerHTML === 'pause' && program === false) {
    console.log('TT')
    handlePlay()
  }
  progress -= width
  imgContainer.style.transition = transformOn
  imgContainer.style.transform = `translateX(${progress}${unit})`
  currentImg++
  if (currentImg === images.length - 1) {
    await sleep(500)
    progress = -width
    imgContainer.style.transition = transformOff
    imgContainer.style.transform = `translateX(${progress}${unit})`
    currentImg = 1
  }
}

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

let auto = true

const autoPlay = async () => {
  if (auto) {
    await sleep(2000)
    handleNext(1, true)
    await sleep(2000)
    autoPlay()
  }
}

const btnHolder = document.createElement('div')
btnHolder.className = 'btnHolder'

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

app.appendChild(btnHolder)

autoPlay()

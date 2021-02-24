import '@fortawesome/fontawesome-free/js/all.min'
const slider = (imagesArray, container, sliderWidth = 70, sliderUnit = 'vw', animation = '500ms') => {
  const transformOn = 'transform ' + animation
  const transformOff = '0ms all'
  const width = sliderWidth
  const unit = sliderUnit
  let progress = -width
  let currentImg = 1
  const images = [imagesArray[imagesArray.length - 1], ...imagesArray, imagesArray[0]]
  const app = container
  // get reassigned when build function is run, used as references
  let play
  let imgContainer

  const init = () => {
    autoPlay()
    activateDot(1)
  }

  const sliderConstructor = () => {
    // Build Frame Div
    const frame = document.createElement('div')
    frame.className = 'frame'
    // Build Img Container Div
    imgContainer = document.createElement('div')
    imgContainer.className = 'imgContainer'
    // Add all images to Img Container Div
    addImages(images, imgContainer)
    // Render
    frame.appendChild(imgContainer)
    app.appendChild(frame)
    // Build Btn Div
    const btnHolder = document.createElement('div')
    btnHolder.className = 'btnHolder'
    // Creates Buttons
    const leftContainer = document.createElement('div')
    leftContainer.id = 'leftContainer'

    const prev = document.createElement('div')
    prev.id = 'prev'
    prev.className = 'btn'
    prev.innerHTML = '<i class="fas fa-chevron-left"></i>'
    prev.addEventListener('click', handlePrev)
    leftContainer.appendChild(prev)

    play = document.createElement('div')
    play.id = 'play'
    play.className = 'btn'
    play.innerHTML = '<i class="fas fa-pause"></i>'
    play.addEventListener('click', handlePlay)
    leftContainer.appendChild(play)

    btnHolder.appendChild(leftContainer)

    const circleHolder = document.createElement('div')
    circleHolder.id = 'circleHolder'

    createDots(images, circleHolder)

    btnHolder.appendChild(circleHolder)

    const rightContainer = document.createElement('div')
    rightContainer.id = 'rightContainer'

    const next = document.createElement('div')
    next.id = 'next'
    next.className = 'btn'
    next.innerHTML = '<i class="fas fa-chevron-right"></i>'
    next.addEventListener('click', handleNext)

    rightContainer.appendChild(next)
    btnHolder.appendChild(rightContainer)
    // Render Buttons
    app.appendChild(btnHolder)
  }
  const addImages = (imagesArray = [], container) => {
    imagesArray.forEach(img => {
      const newImg = new Image()
      newImg.src = img
      container.appendChild(newImg)
    })
  }
  // Sleep Function
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  // Function for backward
  const handlePrev = async () => {
    // stop autoplay if you press the button
    if (auto) {
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
  // Function for forward
  const handleNext = async (e, program = false) => {
    // stop autoplay if you press the button
    if (auto && program === false) {
      handlePlay()
    }
    progress -= width
    imgContainer.style.transition = transformOn
    imgContainer.style.transform = `translateX(${progress}${unit})`
    currentImg++
    activateDot(currentImg)
    // Logic to make it loop infinitely
    if (currentImg === (images.length - 1)) {
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
      play.innerHTML = '<i class="fas fa-play"></i>'
      return
    }
    auto = true
    autoPlay()
    play.innerHTML = '<i class="fas fa-pause"></i>'
  }
  // AutoPlay Flag
  let auto = true
  // AutoPlay Logic
  const autoPlay = async () => {
    await sleep(2000)
    if (auto) {
      handleNext(1, true)
      await sleep(2000)
      autoPlay()
    }
  }

  const createDots = (imagesArray, container) => {
    for (let i = 1; i <= (imagesArray.length - 2); i++) {
      const dot = document.createElement('div')
      dot.className = 'dot'
      dot.id = i
      container.appendChild(dot)
      dot.addEventListener('click', handleDots)
    }
  }
  const handleDots = (e) => {
    if (auto) {
      handlePlay()
    }
    progress = -width * (e.target.id)
    imgContainer.style.transform = `translateX(${progress}${unit})`
    currentImg = Number(e.target.id)
    activateDot(currentImg)
  }

  const activateDot = (current) => {
    const dots = document.querySelectorAll('.dot')

    let currentNum = current
    if (current > images.length - 2) {
      currentNum = 1
    } else if (current < 1) {
      currentNum = images.length - 2
    } else {
      currentNum = current
    }
    const activeDot = [...dots].find(dot => Number(dot.id) === currentNum)
    dots.forEach(dot => dot.classList.remove('active'))
    activeDot.classList.add('active')
  }
  sliderConstructor()
  init()
}

export default slider

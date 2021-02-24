import './styles/styles.sass'
import slider from './slider'

import imgOne from './photos/one.jpg'
import imgTwo from './photos/two.jpg'
import imgThree from './photos/three.jpg'
import imgFour from './photos/four.jpg'
import about from './photos/about.jpg'

// App DIV
const app = document.querySelector('#app')
// Image Array
const images = [imgOne, imgTwo, imgThree, about, imgFour, imgOne, imgTwo, imgThree, about, imgFour]
// Create Image Slider
slider(images, app)

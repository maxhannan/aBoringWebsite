import './styles.scss'
import '../node_modules/@fortawesome/fontawesome-free/js/all'

let hello = document.createElement('div');
hello.className = 'hello'
hello.innerHTML = '<i class="far fa-times-circle"></i>'
document.body.appendChild(hello)
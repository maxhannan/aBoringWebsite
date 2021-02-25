
const navBuilder = () => {
  const nav = document.createElement('nav')
  nav.classList.add('navbar')
  nav.innerHTML = `
    <span class="navbar-toggle" id="js-navbar-toggle">
      <i class="fas fa-bars"></i>
    </span>
    <a href="#" class="logo">Boring Website</a>
    <ul class="main-nav" id="js-menu">
      <li>
          <a href="#" class="nav-links">Slider</a>
      </li>
      <li>
          <a href="#" class="nav-links">Form</a>
      </li>
    </ul>
  `
  document.body.prepend(nav)
}
navBuilder()
const mainNav = document.getElementById('js-menu')
const navBarToggle = document.getElementById('js-navbar-toggle')

navBarToggle.addEventListener('click', function () {
  mainNav.classList.toggle('active')
})

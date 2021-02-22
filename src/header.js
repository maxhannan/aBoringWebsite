const header = (() => {
  const nav = document.createElement('nav')
  nav.innerHTML = `
    <ul>
      <li>Product    <i class="fas fa-chevron-down"></i>
        <ul class = 'dropDown'>
          <li>
            <h6>Prototyping Tool</h6>
            <p>Design hi-fi prototypes for web and mobile</p>
          </li>
          <li>
            <h6>Remote Collaboration</h6>
            <p>Share and get feedback</p>
          </li>
          <li>
            <h6>Enterprise</h6>
              <p>UX platform for all your teams</p>
          </li>
        </ul>
      </li>
      <li>Projects</li>
      <li>Examples</li>
      <li>Free Tools    <i class="fas fa-chevron-down"></i>
        <ul class = 'dropDown'>
          <li>
              <h6>Free wireframing tool</h6>
              <p>unlimited projects and users</p>
          </li>
          <li>
              <h6>UI kits</h6>
              <p>Web, iOS, Android and more</p>
          </li>
        </ul>
      </li>
      <li>Learn  <i class="fas fa-chevron-down"></i>
        <ul class = 'dropDown'>
          <li>
            <h6>Help Center</h6>
            <p>Training and User Guides</p>
          </li>
          <li>
            <h6>Customer stories</h6>
            <p>See how other teams use Groovy</p>
          </li>
          <li>
            <h6>Blog</h6>
            <p>Learn how to master UX and UI design</p>
          </li>
        </ul>
      </li>
    </ul>
  `
  return nav
})()
export {
  header
}

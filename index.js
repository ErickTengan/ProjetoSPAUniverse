
const routes = {
  "/":"/pages/home.html",
  "/universe":"/pages/universe.html",
  "/exploration":"/pages/exploration.html"
}

console.log(routes["/"]);

function route(event) {
  event = event || window.event;
  event.preventDefault();

  window.history.pushState({}, "", event.target.href)
  changeBg();

  handle();
}

function handle() {
  const {pathname} = window.location
  const route = routes[pathname]

  fetch(route)
  .then(data => data.text())
  .then(html => {
    document.querySelector('#app').innerHTML = html;
  })
  let activePage = pathname.substring(1);
  if (activePage == '') {
    activePage = 'home';
  }
  clearBold();
  document.querySelector(`#${activePage}`).classList.add('bold'); 
}

function clearBold() {
  document.querySelector(`#home`).classList.remove('bold');
  document.querySelector(`#universe`).classList.remove('bold');
  document.querySelector(`#exploration`).classList.remove('bold');
}

function changeBg() {
  const { pathname } = window.location;
  const { body } = document;

  switch (pathname) {
    case '/exploration':
      body.className = 'exploration';
      break;

    case '/universe':
      body.className = 'universe';
      break;

    default:
      body.className = '';
      break;
  }
}

handle();

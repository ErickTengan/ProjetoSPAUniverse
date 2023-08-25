export class Router {

  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();
  
    window.history.pushState({}, "", event.target.href)
    this.changeBg();
    this.handle();
  }

  handle() {
    const {pathname} = window.location
    const route = this.routes[pathname]
  
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html;
    })
    let activePage = pathname.substring(1);
    if (activePage == '') {
      activePage = 'home';
    }
    this.clearBold();
    document.querySelector(`#${activePage}`).classList.add('bold'); 
  }

  clearBold() {
    document.querySelector(`#home`).classList.remove('bold');
    document.querySelector(`#universe`).classList.remove('bold');
    document.querySelector(`#exploration`).classList.remove('bold');
  }

  changeBg() {
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
}


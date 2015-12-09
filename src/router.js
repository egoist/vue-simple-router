import minimatch from 'minimatch';

export default class Router {
  constructor ({
    // define default options
  } = {}) {
    this.routes = {};
  }
  map (routes) {
    for (let route in routes) {
      this.routes[route] = routes[route];
    }
  }
  init (bindTo = 'body') {
    this.bindTo = document.querySelector(bindTo);
    this.routes.forEach(route => {
      if (minimatch(location.path, route)) {
        console.log(route);
      }
    });
  }
};

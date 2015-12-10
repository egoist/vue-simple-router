import minimatch from 'minimatch';
import Vue from 'vue';
if (typeof __DEV__ !== 'undefined' && __DEV__) {
  Vue.config.debug = true;
}

export default class Router {
  constructor () {
    this.routes = {};
    this.Vue = Vue;
  }
  use (name, options = {}) {
    this.Vue.use(name, options);
    return this;
  }
  map (routes) {
    for (let route in routes) {
      this.routes[route] = routes[route];
    }
    return this;
  }
  init (bindTo = 'body') {
    this.bindTo = bindTo;
    const pathname = location.pathname + location.search + location.hash;
    for (let i in this.routes) {
      if (minimatch(pathname, i)) {
        const view = this.routes[i].view;
        view.el = this.bindTo;
        // we initial its kids before itself
        // for the scope matter
        // you cannot initial a parent instance
        // then initial its child element
        // same, the parent instance would not own the control of its children
        this.initKids(view.kids);
        new this.Vue(view);
      }
    }
    return this;
  }
  initKids (kids) {
    if (kids && Array.isArray(kids)) {
      kids.forEach(kid => {
        this.initKids(kid.kids);
        new this.Vue(kid)
      });
    }
  }
};

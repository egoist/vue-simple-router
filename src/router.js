import minimatch from 'minimatch';
import Vue from 'vue';
if (typeof __DEV__ !== 'undefined' && __DEV__) {
  Vue.config.debug = true;
}

export default class Router {
  constructor () {
    this.routes = {};
    this.aliasRoutes = {};
    this.Vue = Vue;
    this.fakePath = '';
  }
  use (name, options = {}) {
    this.Vue.use(name, options);
    return this;
  }
  alias (from, to) {
    const aliasRoute = (from, to) => {
      this.aliasRoutes[from] = to;
    }
    if (typeof from === 'string') {
      aliasRoute(from, to);
    } else {
      from.forEach(f => aliasRoute(f, to));
    }
  }
  map (routes) {
    for (let key in routes) {
      const route = routes[key];
      if ('default' in route.view) {
        route.view = route.view.default;
      }
      this.routes[key] = route;
    }
    return this;
  }
  init (bindTo = 'body') {
    this.bindTo = bindTo;
    const pathname = location.pathname + location.search + location.hash;
    // check if the current pathname matched in aliasRoutes
    // if match then return that pattern
    const testAliasRoute = () => {
      for (let i in this.aliasRoutes) {
        if (this.aliasRoutes[i] && (pathname === i  || minimatch(pathname, i))) {
          return i;
        }
      }
      return false
    }
    const aliasRoute = testAliasRoute();
    // if is an aliasRoute ignore mapRoute
    if (aliasRoute) {
      this.fakePath = this.aliasRoutes[aliasRoute];
    } else {
      this.fakePath = pathname;
    }
    for (let i in this.routes) {
      if (minimatch(this.fakePath, i)) {
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
        new this.Vue(kid);
      });
    }
  }
};

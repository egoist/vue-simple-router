import Vue from 'vue';
import minimatch from 'minimatch';

const isDev = (typeof __DEV__ !== 'undefined') && __DEV__;
if (isDev) {
  Vue.config.debug = true;
}

export default class Router {
  constructor () {
    this.routes = [];
    this.Vue = Vue;
    this.includeQuery = false;
  }
  use (name, options = {}) {
    this.Vue.use(name, options);
    return this;
  }
  set (name, value) {
    this[name] = value;
    return this;
  }
  reg (name, route) {
    if (isDev && (!route || !route.view)) {
      throw new ReferenceError('[VSR] Could not reference route view');
    }
    if ('default' in route.view) {
      route.view = route.view.default;
    }
    this.routes.push({
      pattern: name,
      view: route.view
    });
    return this;
  }
  init (bindTo = 'body') {
    this.bindTo = bindTo;
    const fullPath = this.includeQuery ? location.pathname + location.search : location.pathname;
    for (const route of this.routes) {
      const { pattern, view } = route;
      const isMiniMatch = (typeof pattern === 'string') && (pattern === fullPath);
      if (isMiniMatch || pattern.test(fullPath)) {
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

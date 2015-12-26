# vue-simple-router

In fact, it's not simple at all, it's just made for **Non-Single-Page** applications.

## Installation

```bash
npm install vue-simple-router --save-dev
```

## Example

```javascript
import router from 'vue-simple-router';

// define a view for homepage:
// first define a footer element:
const footer = {
  el: '#footer',
  data () {
    return { year: 2015 };
  }
};
const home = {
  data () {
    return { siteName: 'Home' };
  },
  kids: [footer],
  // It works with `Webpack` and `Vue-loader`
  // which means you can write single-file Vue component and use it in Vue Simple Router.
  components: {
    clock: require('./components/clock.vue')
  }
};

// use a plugin, like vue-resource
router.use(VueResource);
// or
router.Vue.use(VueResource);

// map routes, support /user/* style minimatch
router.map({
  '/': {
    view: home
  },
  '/hi': {
    // single-file component can be used in view too.
    view: require('./views/some_view.vue')
  }
});

// initial router and bind it to body
router.init();
// or bind to anywhere
router.init('#app');

// alias routes
router.alias('/u/sox', '/user/egoist');
// support minimatch too
router.alias('/u/*', '/user/egoist');
```

## License

MIT &copy; [EGOIST](https://github.com/egoist).

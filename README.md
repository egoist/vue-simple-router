# vue-simple-router

**WIP** In fact, it's not simple at all, it's just made for **Non-Single-Page** applications.

## Introduction

You give the URL path to VSR(vue-simple-router), it renders the relevant components for you.

In your client-side app entry:

```javascript
import VSR, { Router } from 'vue-simple-router'
Vue.use(VSR)

const router = new Router()
router.map({
  '/': {
    components: [require('./components/home')]
  }
})
```

A component is regular Vue instance without `new`:

```javascript
export default {
  el: '.list',
  data() {
    return {
      list: [{title: 'some title'}]
    }
  }
}
```

You can render your page via backend template engine, like Express with Jade:

```jade
router(path="#{urlPath}")
  #app
    .list
      each item in list
        .item #{item.title}
```

## License

MIT.

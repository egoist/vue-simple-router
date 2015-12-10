System.config({
  map: {
  }
});
var home = {
  data: {
    user: {}
  },
  ready: function () {
    $.getJSON('https://api.github.com/users/egoist').then(function (data) {
      this.user = data;
    }.bind(this));
  }
};

var sox = {
  el: '#sox',
  data: {
    name: 'sox'
  }
};

var egoist = {
  data: {
    repos: []
  },
  ready: function () {
    $.getJSON('https://api.github.com/users/egoist/repos').then(function (data) {
      this.repos = data;
    }.bind(this));
  },
  kids: [sox]
};

System.import('../../dist/vsr.js')
  .then(function (router) {
    return router.default;
  })
  .then(function (router) {
    router.map({
      '/examples/github-users/': {
        view: home
      },
      '/examples/github-users/egoist.html': {
        view: egoist
      }
    });
    router.alias('/examples/github-users/?a=123', '/examples/github-users/')
    router.alias('/examples/github-users/?a=*', '/examples/github-users/')
    router.init('body');
    console.log(router);
  });

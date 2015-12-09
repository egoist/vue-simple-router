System.config({
  map: {
    minimatch: '../../node_modules/minimatch/minimatch.js'
  }
});
var home = {
  ready: function () {
    $.getJSON('https://api.github.com/users/egoist').then(function (data) {
      console.log(data);
    });
  }
};

System.import('../../dist/vsr.common.js').then(function (router) {
  router.map({
    '/': {
      view: home
    }
  });
  console.log(router);
  router.init('body')
});

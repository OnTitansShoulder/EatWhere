/* register the modules the application depends upon here*/
angular.module('dishes', []);
angular.module('restaurants', []);
console.log("App.js");
/* register the application and inject all the necessary dependencies */
var app = angular.module('eatWhere', ['ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps', 'dishes', 'restaurants']);

/* application configuration */
app.config(['$urlRouterProvider', '$locationProvider',
  function($urlRouterProvider, $locationProvider) {
    /* https://docs.angularjs.org/api/ng/provider/$locationProvider */
    $locationProvider.html5Mode(true);

    /* go to the '/search' URL if an invalid route is provided*/
    $urlRouterProvider.otherwise('/search');
  }
]);

/* set the initial state of the application*/
app.run(['$state',
  function($state) {
    $state.go('search.dishes');
  }
]);

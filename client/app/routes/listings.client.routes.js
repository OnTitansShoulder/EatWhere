angular.module('dishes').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider) {
    //Listings state providing
    $stateProvider
      .state('search', {
        url: '/search',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('search.dishes', {
        url: '',
        templateUrl: 'app/views/dishes.client.view.html',
        params: {
          successMessage: null
        }
      })
      .state('search.restaurants', {
        url: '/create',
        templateUrl: 'app/views/restaurants.client.view.html',
        params: {
          successMessage: null
        }
      })
      .state('update', {
        url: '/update',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('update.dishes', {
        url: '/dishes',
        templateUrl: 'app/views/addDish.client.view.html'
      })
      .state('update.restaurants', {
        url: '/restaurants',
        templateUrl: 'app/views/addRestaurant.client.view.html'
      });
  }
]);

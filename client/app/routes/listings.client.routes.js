angular.module('dishes').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider) {
    //Listings state providing
    $stateProvider
      .state('listings', {
        url: '/listings',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('listings.search', {
        url: '',
        templateUrl: 'app/views/searching.client.view.html',
        params: {
          successMessage: null
        }
      })
      .state('listings.create', {
        url: '/create',
        templateUrl: 'app/views/TODO.client.view.html'
      })
      .state('listings.add', {
        url: '/edit/:listingId',
        templateUrl: 'app/views/TODO.client.view.html'
      })
      .state('listings.map', {
        url: '/map',
        templateUrl: 'app/views/TODO.client.view.html'
      })
      .state('listings.view', {
        url: '/:listingId',
        templateUrl: 'app/views/TODO.client.view.html'
      });
  }
]);

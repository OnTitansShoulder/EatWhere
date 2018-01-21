angular.module('dishes').factory('Dishes', ['$http',
  function($http) {
    let methods = {
      searchDish: function(request) {
        return $http.post('/api/dishes/search', request);
      },

      addDish: function(dish) {
        return $http.post('/api/dishes/add', dish);
      }

      // read: function(id) {
      //   return $http.get('/api/listings/' + id);
      // },
      //
      // update: function(id, listing) {
      //   return $http.put('/api/listings/' + id, listing);
      // },
      //
      // delete: function(id) {
      //   return $http.delete('/api/listings/' + id);
      // }
    };

    return methods;
  }
]);

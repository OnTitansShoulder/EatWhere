angular.module('dishes').controller('DishesController', ['$scope', '$location', '$stateParams', '$state', 'Dishes',
  function($scope, $location, $stateParams, $state, Dishes){
    $scope.food_types = ["Chinese", "American", "Indian", "Japanese", "Mexican"];
    $scope.request = true;
    $scope.init = function() {
      $scope.food = {
        lob: 0,
        upb: 20,
        style: 'Restaurant'
      };
    };

    $scope.search = function() {
      let request = { };
      let food_type = [];
      if($scope.food.chf) food_type.push($scope.food.chf);
      if($scope.food.amf) food_type.push($scope.food.amf);
      if($scope.food.inf) food_type.push($scope.food.inf);
      if($scope.food.jaf) food_type.push($scope.food.jaf);
      if($scope.food.mef) food_type.push($scope.food.mef);
      if(food_type.length == 0)
        food_type = $scope.food_types;
      if($scope.food.lob<0) $scope.food.lob = 0;
      if($scope.food.upb<0) $scope.food.upb = $scope.food.lob + 20;
      if($scope.food.lob > $scope.food.upb){
        let temp = $scope.food.lob;
        $scope.food.lob = $scope.food.upb;
        $scope.food.upb = temp;
      }
      request.type = food_type;
      request.lowbound = $scope.food.lob;
      request.upbound = $scope.food.upb;
      request.style = $scope.food.style;

      Dishes.searchDish(request).then(function(response){
        $scope.results = response.data.data;
        console.log(response.data.data);
      }, function(error){
        console.log(error);
      });

      // console.log($scope.results);
    };

    $scope.addDish = function() {
      let new_dish = {
        name: $scope.dish.name,
        restaurant: $scope.dish.restaurant,
        type: $scope.dish.type,
        offered_time: $scope.dish.offered_time,
        style: $scope.dish.style,
        price: parseFloat($scope.dish.price),
        description: $scope.dish.description,
        ingredients: []
      };
      let ingredients = $scope.dish.ingredients.split(",");
      if(ingredients.length > 1) new_dish.ingredients = ingredients;
      console.log(new_dish);
      Dishes.addDish(new_dish);
    };

    $scope.toggle = function() { $scope.request = !$scope.request;};

    $scope.find = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the dishes, then bind it to the scope */
      Dishes.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.dishes = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve dishes!\n' + error;
      });
    };

    $scope.findOne = function() {
      debugger;
      $scope.loading = true;

      var id = $stateParams.listingId;

      Dishes.read(id)
              .then(function(response) {
                $scope.listing = response.data;
                $scope.loading = false;
              }, function(error) {
                $scope.error = 'Unable to retrieve listing with id "' + id + '"\n' + error;
                $scope.loading = false;
              });
    };

    $scope.create = function(isValid) {
      $scope.error = null;

      /*
        Check that the form is valid. (https://github.com/paulyoder/angular-bootstrap-show-errors)
       */
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      /* Create the listing object */
      var listing = {
        name: $scope.name,
        code: $scope.code,
        address: $scope.address
      };

      /* Save the article using the Dishes factory */
      Dishes.create(listing)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('dishes.list', { successMessage: 'Listing succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save listing!\n' + error;
              });
    };

    $scope.update = function(isValid) {

       if (!isValid) {
         $scope.$broadcast('show-errors-check-validity', 'articleForm');

         return false;
       }

       Dishes.update($scope.listing._id, $scope.listing)
                .then(function(response){
                  $state.go('dishes.list', { successMessage: 'Listing successfully updated!'});
                }, function(error){
                  $scope.error = 'Unable to update listing!\n' + error;
                });
    };

    $scope.remove = function() {

      if($scope.listing)
        Dishes.delete($scope.listing._id)
            .then(function(response){
              $state.go('dishes.list', { successMessage: 'Listing successfully removed!'});
            }, function(error){
              $scope.error = 'Unable to delete listing!\n' + error;
            });
    };

    /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
    }

    /* Map properties */
    $scope.map = {
      center: {
        latitude: 29.6515513,
        longitude: -82.3428147
      },
      zoom: 15
    }
  }
]);

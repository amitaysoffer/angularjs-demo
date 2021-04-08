// The Model- container of all controller/components
let myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

// config is code that runs before the application starts
// the routeProvider object is a part of the ngRoute module. Let us setup the different routes
myNinjaApp.config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/home', {
        // the location of the view when a user visits /home
        templateUrl: 'views/home.html',
        controller: 'NinjaController',
      })
      .when('/directory', {
        templateUrl: 'views/directory.html',
        // controller we want to use for this directory
        controller: 'NinjaController',
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        // controller we want to use for this directory
        controller: 'ContactController',
      })
      .when('/contact-success', {
        templateUrl: 'views/contact-success.html',
        // controller we want to use for this directory
        controller: 'ContactController',
      })
      .otherwise({
        redirectTo: '/home',
      });
  },
]);

myNinjaApp.run(() => {
  // console.log('run here');
});

myNinjaApp.directive('randomNinja', function () {
  return {
    // E we can use our directive as element, or A is stands for attribute
    restrict: 'E',
    // Where we pass data through to the directive
    scope: {
      // binding the values from the html file to this scope by using = sign
      ninjas: '=',
      title: '=',
      description: '=',
    },
    // template: '<img ng-src="{{ninjas[random].thumb}}">',
    // template: '{{title}}',
    // exporting the data to another html file
    templateUrl: 'views/random.html',
    // transclude allows us to add elements inside the element we create (random-nina)
    transclude: true,
    // Changes the element we created (random-ninja) with the top parent element of the ng-transclude (div)
    replace: true,
    controller: function ($scope) {
      $scope.random = Math.floor(Math.random() * 3);
    },
  };
});

// $scope as a data passer
// View (index.html) can see what in the scope
// The controller can set the data in scope
// This is how the HTML and JS controller communicates
// The pass information throguh the $scope object
// All the code which controls this section of the web application
myNinjaApp.controller('NinjaController', function ($scope, $http) {
  $scope.removeItem = ninja => {
    const ninjas = $scope.ninjas;
    const ninjaIndex = ninjas.indexOf(ninja);
    ninjas.splice(ninjaIndex, 1);
  };

  // Scope object of the controller which will be available in the view
  $scope.message = 'NinjaController';
  // $scope.ninjas = ['amitay', 'marion', 'avi', 'nurit'];

  $scope.addNinja = () => {
    $scope.ninjas.push({
      name: $scope.newninja.name,
      belt: $scope.newninja.belt,
      age: parseInt($scope.newninja.age),
    });

    $scope.newninja.name = '';
    $scope.newninja.belt = '';
    $scope.newninja.age = '';
  };

  $http.get('data/ninjas.json').then(successCallback, errorCallback);

  function successCallback(response) {
    console.log(response.data);
    $scope.ninjas = response.data;
  }

  function errorCallback(err) {
    console.log('error in get request', err);
  }
  // console.log(angular.toJson($scope.ninjas));
});

myNinjaApp.controller('ContactController', function ($scope, $location) {
  console.log('hey');
  console.log($scope.contact);
  $scope.sendMessage = () => {
    console.log($scope.contact);
    $location.path('contact-success');
  };
});

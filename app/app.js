'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
}]).
run(['$document', '$location' , '$rootScope', function($document, $location, $rootScope){
  var status = kiwoom.getConnectState();
  if(status == 0) {
    kiwoom.commConnect();
  } else {
    $location.path('/view1');
  }

  $document.on('eventConnect.kiwoom', function(){
    console.log('eventConnect.kiwoom');
    $rootScope.$apply(function() {
      $location.path('/view1');
    });
  });
}]);

var app = angular.module('survey-site', []);

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.posts = [
  'Register for an Account',
  'Login to Your Account',
  'Create and Manage your Surveys',
  'Review your Results',
  'Send Yourself Stats and Responses via Email'
];
}]);



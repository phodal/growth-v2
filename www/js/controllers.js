angular.module('starter.controllers', ['starter.factory', 'starter.services', 'hljs', 'starter.utils'])
  .controller('AboutCtrl', function ($scope, $analytics) {
    $analytics.trackView('About Ctrl');
    $scope.isApp = window.cordova !== undefined;
  })

  .controller('SolutionCtrl', function ($scope, $analytics) {
    $analytics.trackView('Solution Ctrl');
    var SOLUTIONS = [{
      "name": "Nginx/Apache Log Analytics",
      "type": "server",
      "stacks": ["Hadoop", "Pig", "Jython", "amMap", "ElasticSearch"],
      "description": ""
    }, {
      "name": "Mobile Application",
      "type": "mobile",
      "stacks": ["Ionic", "Cordova", "ngCordova", "Angular"],
      "description": ""
    }, {
      "name": "Web Application",
      "type": "generic",
      "stacks": ["Gulp", "React", "WebPack", "Babel", "Express"],
      "description": ""
    }, {
      "name": "Web Application",
      "type": "server",
      "stacks": ["Flask", "Jinja2", "SQLAlchemy"],
      "description": ""
    }, {
      "name": "Web Application",
      "type": "server",
      "stacks": ["Spring MVC", "iBATIS", "Gradle"],
      "description": ""
    }];
    $scope.solutions = SOLUTIONS;
  })

  .controller('FeedbackCtrl', function ($scope, $http, $cordovaEmailComposer) {
    $scope.issues = [];
    $http.get('https://api.github.com/repos/phodal/growth/issues').then(function (response) {
      $scope.issues = response.data;
    });

    $scope.OpenIssue = function (url) {
      window.open(url, '_system', 'location=yes');
    };

    if (window.cordova) {
      $scope.sendMail = function () {
        $cordovaEmailComposer.isAvailable().then(function () {
        }, function () {
        });
        var email = {to: 'h@phodal.com', subject: '关于《Growth Ren》', body: '', isHtml: true};
        $cordovaEmailComposer.open(email).then(null, function () {
        });
      }
    }
  })

  .controller('ArticleCtrl', function ($scope, $sce, $stateParams, $http, $ionicLoading, marked, $filter, $analytics) {
    $analytics.trackView('Article Detail');

    $ionicLoading.show({
      animation: 'fade-in',
      template: 'Loading...'
    });
    $http({
      method: 'GET',
      url: 'article/' + $stateParams.slug + '.md'
    }).success(function (response) {
      $ionicLoading.hide();
      $scope.EditArticle = function () {
        window.open('https://github.com/phodal/growth/edit/master/www/article/' + $stateParams.slug + '.md', '_system', 'location=yes');
      };
      $scope.title = $filter('filter')(AllArticle, {"slug": $stateParams.slug})[0].title;
      $scope.htmlContent = $sce.trustAsHtml(marked(response))
    }).error(function (data, status) {
      alert(data + status);
    });
  })

  .controller('ArticleListCtrl', function ($scope, $analytics) {
    $analytics.trackView('Article List');
    $scope.articles = AllArticle;
  });

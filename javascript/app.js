var app = angular.module('app', ['ngRoute', 'ngMaterial', 'app.service', 'app.controller'])
    .config([
        '$routeProvider',
        '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/dashboard', {
                    controller: 'dashboardCtrl',
                    templateUrl: 'template/dashboard.html'
                })
                .when('/process', {
                    controller: 'processCtrl',
                    templateUrl: 'template/process.html'
                })
                .when('/network', {
                    controller: 'networkCtrl',
                    templateUrl: 'template/network.html'
                })
                .when('/disk', {
                    controller: 'diskCtrl',
                    templateUrl: 'template/disk.html'
                })
                .otherwise('/dashboard');
        }
    ]);
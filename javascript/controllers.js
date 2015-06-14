angular.module('app.controller', [])
  .controller('AppCtrl', [
    '$scope',
    '$mdSidenav',
    '$mdUtil',
    '$timeout',
    '$log',
    function($scope, $mdSidenav, $mdUtil, $timeout, $log) {
      var buildToggler = function(navID) {
        var debounceFn = $mdUtil.debounce(function() {
          $mdSidenav(navID)
            .toggle()
            .then(function() {
              $log.debug("toggle " + navID + " is done");
            });
        }, 300);
        return debounceFn;
      }
      $scope.toggleMenu = buildToggler('menu');
    }
  ])
  .controller('menuCtrl', ['$scope', '$location', '$mdSidenav',
    function($scope, $location, $mdSidenav) {
      $scope.label = 'dashboard';
      $scope.navigateTo = function(label) {
        $location.path('/' + label);
        $scope.label = label;
        $mdSidenav('menu').close();
      };
    }
  ])
  .controller('dashboardCtrl', ['$scope', '$location', 'DashboardService', 'pull',
    function($scope, $location, DashboardService, pull) {
      pull(function() {
        DashboardService.cpuTimes().success(function(data) {
          $scope.cpuTimes = data.data.cpu_times;
        });
      }, 1000);
      
      pull(function() {
        DashboardService.memoryVirtual().success(function(data) {
          $scope.memory = data.data;
        });
      }, 1000);

      pull(function() {
        DashboardService.memorySwap().success(function(data) {
          console.log(data);
          $scope.swap = data.data;
        });
      }, 1000);
    }
  ])
  .controller('processCtrl', ['$scope', '$location',
    function($scope, $location) {
      console.log('process');
    }
  ])
  .controller('networkCtrl', ['$scope', '$location', 'NetworkService', 'pull',
    function($scope, $location, NetworkService, pull) {
      pull(function() {
        NetworkService.io().success(function(data) {
          $scope.io = data.data.net_io_counters;
        });
        NetworkService.connections().success(function(data) {
          $scope.connections = data.data.net_connections;
        });
      }, 1000);
      
    }
  ])
  .controller('diskCtrl', ['$scope', '$location', 'DiskService', 'pull',
    function($scope, $location, DiskService, pull) {
      pull(function() {
        DiskService.partitions().success(function(data) {
          $scope.partitions =  data.data.disk_partitions;
        });
        DiskService.io().success(function(data) {
          $scope.io =  data.data.disk_io_counters;
        });
        DiskService.usage().success(function(data) {
          $scope.usage =  data.data;
        });
      }, 1000);
      
    }
  ]);
angular.module('app.service', [])
  .constant('API_HOST', 'http://107.170.238.58:8080')
  .factory('pull', ['$timeout', function($timeout) {
    return function(fn, interval) {
      (function loop() {
        fn();
        $timeout(loop, interval);
      })();
    }
  }])
  .factory('DashboardService', ['$http', 'API_HOST', function($http, API_HOST) {
    //查询系统CPU时间
    var cpuTimes = function(percpu) {
      return $http.get(API_HOST + '/api/cpu/times');
    };
    //查询CPU占用率信息
    var cupPercent = function(percpu) {
      return $http.get(API_HOST + '/api/cpu/percent');
    };
    //查询CPU工作于各模式下的时间占用率
    var percent = function(percpu, interval) {
      return $http.get(API_HOST + '/api/cpu/times/percent');
    };
    //查询系统内存的使用情况
    var memoryVirtual = function() {
      return $http.get(API_HOST + '/api/memory/virtual');
    };
    //查询内存置换(swap memory)的数据
    var memorySwap = function() {
      return $http.get(API_HOST + '/api/memory/swap');
    };

    return {
      cpuTimes: cpuTimes,
      cupPercent: cupPercent,
      percent: percent,
      memoryVirtual: memoryVirtual,
      memorySwap: memorySwap
    }
  }])
  .factory('DiskService', ['$http', 'API_HOST', function($http, API_HOST) {
    //查询所有已挂在分区的信息
    var partitions = function() {
      return $http.get(API_HOST + '/api/disk/partitions');
    };
    //查询磁盘的IO数据
    var io = function(perdisk) {
      return $http.get(API_HOST + '/api/disk/io/counters');
    };
    //查询磁盘空间的使用情况
    var usage = function(path) {
      return $http.get(API_HOST + '/api/disk/usage');
    };

    return {
      partitions: partitions,
      io: io,
      usage: usage
    }
  }])
  .factory('NetworkService', ['$http', 'API_HOST', function($http, API_HOST) {
    //查询网络IO数据
    var io = function(pernic) {
      return $http.get(API_HOST + '/api/network/io/counters');
    };
    //查询网络连接信息
    var connections = function() {
      return $http.get(API_HOST + '/api/network/connections');
    };

    return {
      io: io,
      connections: connections
    }

  }])
  .factory('ProcessService', ['$http', function($http) {
    //查询指定pid的进程信息
    var process = function(pid) {
      return $http.get('/api/process');
    };

    var processTotal = function() {
      return $http.get('/api/process/total');
    };

    return {
      process: process,
      processTotal: processTotal
    }

  }]);
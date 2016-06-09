myApp.controller('mainCtrl', function(popService, $http){

  var vm = this;
  var pop = popService.getCountry();
  pop.then(function(data){
    
    console.log(data);
    vm.contents = data;
  }, function(error){
    console.log(error);
  });

  // vm.getData = function() {
  //   $http.get('http://api.census.gov/data/timeseries/idb/1year?get=AREA_KM2,NAME,AGE,POP&FIPS=IN&time=2012&SEX=0')
  //   .then(function(content) {
  //    vm.group = content.data;
  //    console.log(vm.group);
  //    // group: content.group
  //   }).catch(function(error){
  //     $log.error('failure loading', error);
  //   });
  // };
  // vm.getData();
});

myApp.service('popService', function($resource, $q){

  var vm = this;

  vm.getCountry = function(){

    var Obj = $resource('http://api.census.gov/data/timeseries/idb/1year?get=AREA_KM2,NAME,AGE,POP&FIPS=IN&time=2012&SEX=0');
    var rsp = Obj.query();
    var deferred = $q.defer();
    rsp.$promise.then(function(data){
      // console.log(data);
      var len = data.length;
      for(var i=0; i<len; i++){
        ObjLeague = data[i];
      }
      deferred.resolve(data);
    },function(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  } 
});
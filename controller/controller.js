myApp.controller('mainCtrl', function(popService, $http){

  var main = this;

  main.country = "IN";
  main.year = "2010";

  main.getdata = function(){

    main.data = popService.getData.query({FIPS: main.country, time: main.year, SEX: 0 });
    console.log(main.data);
  }
  main.getdata();
});

myApp.controller('popCtrl', function(popService, $http){

  var pop = this;
  
  pop.country = "IN";
  pop.year = "2010";
  pop.year2 = "2011";

  pop.getdata = function(){

    pop.data = popService.getData.query({FIPS: pop.country, time: pop.year, SEX: 0 });
    console.log(pop.data);
  }
  pop.getdata();

  pop.newdata = function(){

    pop.data = popService.getData.query({FIPS: pop.country, time: pop.year2, SEX: 0 });
    console.log(pop.data1);
  }
  pop.newdata();

  pop.roundedPercentage = function(){
    var result = ((pop.data1['3'] - pop.data['3']/pop.data['3'])*100)
    return Math.round(result, 2);
  }
  pop.roundedPercentage();
});

myApp.service('popService', function($resource){

  var vm = this;

  // vm.getCountry = function(){

  //   var Obj = $resource('http://api.census.gov/data/timeseries/idb/1year?get=AREA_KM2,NAME,AGE,POP');
  //   var rsp = Obj.query(FIPS: vm.country, time: vm.year, SEX: 0);
  //   var deferred = $q.defer();
  //   rsp.$promise.then(function(data){
  //     // console.log(data);
  //     var len = data.length;
  //     for(var i=0; i<len; i++){
  //       ObjLeague = data[i];
  //     }
  //     deferred.resolve(data);
  //   },function(err) {
  //     deferred.reject(err);
  //   });
  //   return deferred.promise;
  // } 

  vm.getData = $resource('http://api.census.gov/data/timeseries/idb/1year?get=AREA_KM2,NAME,AGE,POP&key=2d9a9381bb1ad0fe9987cb593c81de5431f21ce6');
});
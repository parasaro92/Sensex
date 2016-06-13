myApp.controller('mainCtrl', function(popService, $http){

  var main = this;

  main.country = "IN";
  main.year = "2010";
  main.sex = "0";

  main.getdata = function(){

    var res = popService.getPopData(main.country, main.year, main.sex);
    res.then(function(data){
      var result = data;
      console.log(result);

      // main.data = result[0];
      // console.log(main.data);

      // main.graphArr = result[1];
      // console.log(main.graphArr);

      main.chartConfig = {
        options: {
          chart: {
            type: 'column'
          },
          tooltip: {
            style: {
              padding: 10,
              fontWeight: 'bold'
            }
          }
        },
        //Series object (optional) - a list of series using normal Highcharts series options.
        series: [{
          data: result
        }],
        title: {
          text: 'Population Graph'
        },
        loading: false,
        yAxis: {
          title: {text: 'Population'}
        },
        xAxis: {
          title: {text: 'Age'}
        }
      };
    }, function(err){
      console.log("error");
    });
    console.log("inside getdata");
  };
  main.getdata();
});

myApp.controller('popCtrl', function(popService, $http, $q){

  var pop = this;
  
  pop.country = "IN";
  pop.year = "2010";
  pop.year2 = "2011";

  pop.getdata = function(){

    var response = popService.getData.query({FIPS: pop.country, time: pop.year, SEX: 0 });
    var deferred = $q.defer();
    response.$promise.then(function(data){
      pop.result = data;
      deferred.resolve(data);
    },function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  }
  pop.getdata();

  pop.newdata = function(){

    var response = popService.getData.query({FIPS: pop.country, time: pop.year2, SEX: 0 });
    var deferred = $q.defer();
    response.$promise.then(function(data){
      pop.result = data;
      deferred.resolve(data);
    },function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  }
  pop.newdata();

  // pop.roundedPercentage = function(){
  //   var result = ((pop.data1['3'] - pop.data['3']/pop.data['3'])*100)
  //   return Math.round(result, 2);
  // }
  // pop.roundedPercentage();
});

myApp.service('popService', function($resource, $q){

  var vm = this;

  vm.getData = function(country, year, sex){

    var Obj = $resource('http://api.census.gov/data/timeseries/idb/1year?get=AREA_KM2,NAME,AGE,POP&key=2d9a9381bb1ad0fe9987cb593c81de5431f21ce6');
    return Obj.query({FIPS:country, time:year, SEX:sex});
  } 

  vm.getPopData = function(country, year, sex){
    var response = vm.getData(country, year, sex);
    var deferred = $q.defer();
    response.$promise.then(function(result){
      var resArr = [];
      result.splice(0,1);
      console.log(result);

      var graphArr = [];
      for(i=0; i<result.length; i++){
        graphArr.push(parseInt(result[i][3]));
      }
      console.log(graphArr);

      resArr.push(result);
      resArr.push(graphArr);

      deferred.resolve(graphArr);
    }, function(err){
      console.log("Error");
    });
    return deferred.promise;
  };
  // vm.getData = $resource('http://api.census.gov/data/timeseries/idb/1year?get=AREA_KM2,NAME,AGE,POP&key=2d9a9381bb1ad0fe9987cb593c81de5431f21ce6');
});
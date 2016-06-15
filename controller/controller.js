myApp.controller('mainCtrl', function(popService, $http){

  var main = this;

  main.country = "IN";
  main.year = "2010";
  main.sex = "0";

  main.getdata = function(){

    var res = popService.getPopData(main.country, main.year, main.sex);
    res.then(function(data){
      var result = data;
      // console.log(result);

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
  };
  main.getdata();
});

myApp.controller('percentCtrl', function(popService, $http, $q){

  var perc = this;
  
  perc.country = "IN";
  perc.year1 = "2010";
  perc.year2 = "2011";

  perc.getperc = function(){

    var res = popService.getpercent(perc.country, perc.year1, perc.year2);
    res.then(function(data){
      perc.result = data;
      // console.log(perc.result[1]);

      // perc.resData1 = result[1];
      // console.log(perc.resData1);

      perc.chartConfig = {
        options: {
          chart: {
            type: 'area'
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
          data: perc.result[1]
        }],
        title: {
          text: '% Inc/Dec in these years'
        },
        loading: false,
        xAxis: {
          title: {text: 'Age'}
        },
        yAxis: {
          title: {text: 'Population'}
        }
      };
    }, function(err){
      console.log("error");
    });
  };
  perc.getperc();
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
      // console.log(result);

      var graphArr = [];
      for(i=0; i<result.length; i++){
        graphArr.push(parseInt(result[i][3]));
      }
      // console.log(graphArr);

      resArr.push(result);
      resArr.push(graphArr);

      deferred.resolve(graphArr);
    }, function(err){
      console.log("Error");
    });
    return deferred.promise;
  };

  vm.getpercent = function(country, year1, year2){
    var resp1 = vm.getData(country, year1);
    var deferred = $q.defer();
    resp1.$promise.then(function(result1){
      var resp2 = vm.getData(country, year2);
      resp2.$promise.then(function(result2){
        // console.log(result1);
        // console.log(result2);

        var Arr = [];
        var Arr1 = [];
        var Arr2 = [];

        for(var i=1; i<result1.length; i++){
          var obj = {};

          obj.age = result1[i]['2'];

          obj.pop1 = result1[i]['3'];
          obj.pop2 = result2[i]['3'];

          obj.fin = obj.pop2 - obj.pop1;
          obj.perc = (obj.fin/obj.pop1)*100;

          Arr1.push(obj);
          Arr2.push(obj.perc);
        }
        Arr.push(Arr1);
        Arr.push(Arr2)

        deferred.resolve(Arr);
      }, function(err){
        console.log(error);
      })
    }, function(err){
      console.log(error);      
    });
    return deferred.promise;
  }
});
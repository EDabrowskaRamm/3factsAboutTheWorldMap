$(function(){

//svg libary
  var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
  var currentObject;
  var map;
  map = AmCharts.makeChart( "chartdiv", {
    "type": "map",

    "imagesSettings": {
      "rollOverColor": "#089282",
      "rollOverScale": 3,
      "selectedScale": 3,
      "selectedColor": "#089282",
      "color": "#13564e"
    },

    "zoomControl": {
      "buttonFillColor": "#007B72"
    },

    "areasSettings": {
      "unlistedAreasColor": "#15A892",
      "selectable": true,
      "autoZoom": true,
      "color": '#CCCCCC',
      "rollOverColor": '#EF5159',
      "rollOverOutlineColor": '#EF5159',
      "selectedColor": '#007B72',
      "selectedOutlineColor": '#007B72'
    },

    "dataProvider": {
      "map": "worldLow",
      "getAreasFromMap": true
    },

    "listeners": [ {
//get data event
      "event": "clickMapObject",
      "method":  getData
    }, {
//hide info event
      "event": "homeButtonClicked",
      "method": function(event){

        var $countryDataDiv = $('.map_country_data');
        $countryDataDiv.css('display', 'none');
      }
    }
   ]

  } );


  // function clickObject( id ) {
  //   map.clickMapObject( map.getObjectById( id ) );
  // }


  var countryMapID;
  var countryMapName;

//get country data
   function getData(event){

     var info = event.chart.getDevInfo();

     console.log({
       "latitude": info.latitude,
       "longitude": info.longitude
     });


//map object var
     countryMapID = event.mapObject.id;
     countryMapName = event.mapObject.enTitle;
//html map containers
     var $countryFactsContainer = $('.article_map');
     var $countryDataDiv = $countryFactsContainer.find('.map_country_data');
     var $countryFactsList = $countryFactsContainer.find('.map_data_list');
     var countryUrl = 'https://restcountries.eu/rest/v1/alpha/';
//vars to be used jQuery
     var $listItem;
     var $countryName;
//vars to be used js
     var listItemHTML;
     var countryName;

//vars that was used
     var countryCode = $(this).attr('id');
     var thisCountry = this;

     $countryDataDiv.css('display', 'block');

//ajax
       $.ajax({
         url: countryUrl + countryMapID,
         type: 'get',
         dataType: 'json'
       }).done(function(response){

          $countryFactsList.empty();

           listItemHTML = '<li class="country_full_info">' +
               '<h3 class="country_name">' + response.name + '</h3>' +
               '<p class="country_capit">Capital: ' + response.capital + '</p>' +
               '<p class="country_lang">Language: ' + response.languages + '</p>' +
               '<p clss="country_curr">Currency: ' + response.currencies + '</p>' +
               '</li>';

           $listItem = $(listItemHTML);
           $countryFactsList.append($listItem);

       }).fail(function(error){
           console.log(error);
       });

   }


   function searchCountry(map) {

     var $searchContainer = $('.header_form');
     var $searchForm = $searchContainer.find('form');
     var $searchInput = $searchForm.find('input[type="search"]');
     var $submitInput = $searchForm.find('input[type="submit"]');
     var $magnGlass = $searchForm.find('.fa-search');
     var countryUrl = 'https://restcountries.eu/rest/v1/alpha/';
     var searchVal;

     $magnGlass.on('click', function(e) {

//console.log(map.dataProvider);

       searchVal = $searchInput.val();

       var landsArray = map.dataProvider.areas;

       for(var i = 0, len = landsArray.length; i < len; i++) {

         var countryDataID = landsArray[i].id;
         var countryDataName = landsArray[i].enTitle;

  // path kazdego kraju ??!!
  //       console.log(map.dataProvider.areas[i].displayObject.path);

         $.ajax({
           url: countryUrl + countryDataID,
           type: 'get',
           dataType: 'json'
         }).done(function(response){
           var countryName = response.name;
           var countryID = response.alpha2Code;

           if(searchVal == countryName){
             console.log(countryDataName);
             console.log(countryDataID);
             console.log(countryName);

        //     countryDataID == countryID
        // i to nr kraju. jak zrobic zeby to byl konkretny nr a nie wszystkie
        //     console.log(map.dataProvider.areas[i].displayObject.path);

           }

         }).fail(function(error){
           console.log(error);
         });

       }

     });


   }
searchCountry(map);
//searchCountry(event);

// $('.fa-search').click(function() {
//
//   console.log(map.dataProvider.areas[0]);
//   //map.zoomToSelectedObject(map.dataProvider.areas[0]);
//   map.zoomIn();
// })


});

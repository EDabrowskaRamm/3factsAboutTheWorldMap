$(function(){
//navigation drop down
  var $navContainer = $('.navigation');
  var $headerBars = $navContainer.find('i');
  var $navigation = $navContainer.find('nav');

  $headerBars.on('click', function(){
    $navigation.toggle();
  });


//svg libary
  var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
  var currentObject;
  var map = AmCharts.makeChart( "chartdiv", {
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
      'color': '#CCCCCC',
      'rollOverColor': '#EF5159',
      'rollOverOutlineColor': '#EF5159',
      'selectedColor': '#007B72',
      'selectedOutlineColor': '#007B72'
    },

    "dataProvider": {
      "map": "worldLow",
      "getAreasFromMap": true
    },

    "listeners": [ {
      "event": "clickMapObject",
      "method": function( event ) {
        var countryMapID = event.mapObject.id;
        var countryMapName = event.mapObject.enTitle;
        console.log(event.mapObject);

        // check if the map is already at traget zoomLevel and go to url if it is
        // if ( 'undefined' != typeof currentObject && event.mapObject.id == currentObject.id ) {
        //   window.location.href = event.mapObject.myUrl;
        // }
        // currentObject = event.mapObject;
      }
    } ]




  } );

  // function clickObject( id ) {
  //   map.clickMapObject( map.getObjectById( id ) );
  // }

//ajax
   var $countryFactsContainer = $('.article_map');
   var $countryDataDiv = $countryFactsContainer.find('.map_country_data');
   var $countryFactsList = $countryFactsContainer.find('.map_data_list');
   var countryUrl = 'https://restcountries.eu/rest/v1/alpha/';
//get country data
   function getData(){
     var $listItem;
     var $countryName;
     var $countryCapit;
     var $countryLang;
     var $countryCurr;
     var listItemHTML;
     var countryName;
     var countryCapit;
     var countryLang;
     var countryCurr;

     $('.land').click(function(){
       var countryCode = $(this).attr('id');
       var thisCountry = this;
       console.log(countryCode);

       $countryDataDiv.css('display', 'block');
       $countryFactsList.empty();

       $.ajax({
         url: countryUrl + countryCode,
         type: 'get',
         dataType: 'json'
       }).done(function(response){
         console.log(response);

           listItemHTML = '<li class="country_full_info">' +
               '<h3 class="country_name">' + response.name + '</h3>' +
               '<p class="country_capit">' + response.capital + '</p>' +
               '<p class="country_lang">' + response.languages + '</p>' +
               '<p clss="country_curr">' + response.currencies + '</p>' +
               '</li>';

           $listItem = $(listItemHTML);
           $countryFactsList.append($listItem);

       }).fail(function(error){
           console.log(error);
       });
     });
   }
  getData();

//get data from input search

  function getSearchData(){
    var $searchContainer = $('.header_form');
    var $searchForm = $searchContainer.find('form');
    var $searchInput = $searchForm.find('input[type="search"]');
    var $submitInput = $searchForm.find('input[type="submit"]');
    console.log($submitInput);

    $searchForm.on('submit', function(e) {
      e.preventDefault();
      searchVal = $searchInput.val();

      console.log(searchVal);
      //potrzebuje porownac name. musze sie dostac do danych z mapy
    });
  }

getSearchData();


});

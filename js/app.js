$(function(){
//navigation drop down
  var $navContainer = $('.navigation');
  var $headerBars = $navContainer.find('i');
  var $navigation = $navContainer.find('nav');

  $headerBars.on('click', function(){
    $navigation.toggle();
  });

//country highlight

  var SVGcontainer = document.getElementById('mySvg');

  SVGcontainer.onload = function(){
    var lands = SVGcontainer.querySelectorAll('.land');

    for(var i = 0, len = lands.length; i < len; i++){
      lands[i].addEventListener('mouseenter', function(){
        this.style.fill = '#EF5159';
      })

      lands[i].addEventListener('click', function(){
        console.log('clicked' + i);
        this.style.scale(2, 2);
      })
    }

    for(var i = 0, len = lands.length; i < len; i++){
      lands[i].addEventListener('mouseout', function(){
        this.style.fill = '#CCCCCC';
      })
    }
  };

//clicked country gets bigger


//ajax
  var $countryFactsContainer = $('.article_map');
  var $countryFactsList = $countryFactsContainer.find('.map_data_list');
  var countryCapitUrl = 'https://restcountries.eu/rest/v1/capital';
//get country data
  function getData(){
    var $land = $(SVGcontainer).find('.land');
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
//id pobrać z path
    $.ajax({
      url: countryCapitUrl,
      type: 'get',
      dataType: 'json'
    }).done(function(response){
      for(var i = 0, len = response.length; i < len; i++){
        listItemHTML = '<li class="country_full_info">' +
          '<h3 class="country_name">' + response[i].name + '</h3>' +
          '<p class="country_capit">' + response[i].capital + '</p>' +
          '<p class="country_lang">' + response[i].languages + '</p>' +
          '<p clss="country_curr">' + response[i].currencies + '</p>' +
          '</li>';

        $listItem = $(listItemHTML);
        $countryFactsList.append($listItem);
      }
    }).fail(function(error){
        console.log(error);
    });
console.log('get data');
  }

getData();

//czy moga byc 2 ajaxt w 1 funkcji
//trzeba włozyc wyswietlanie danych do funkcji pobierania
//trzea zrobic each po landach zeby zrobic event click i wyswietlic dane

});

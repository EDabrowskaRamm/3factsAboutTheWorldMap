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
/*
      lands[i].addEventListener('click', function(){
        console.log('clicked' + i);
        this.style.scale(2, 2);
      }) */
    }

    for(var i = 0, len = lands.length; i < len; i++){
      lands[i].addEventListener('mouseout', function(){
        this.style.fill = '#CCCCCC';
      })
    }
  };


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
      thisCountry.style.fill = '#007B72';
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

//country is bigger after click
      var s = Snap('.map');
      var singleCountry = s.select('#' + countryCode);
      var bbox = singleCountry.getBBox();
      console.log(bbox);

      singleCountry.animate({
        transform: 's2,2,' + bbox.cx + ',' + bbox.cy
      }, 3000);



    });



//counry info hide
    $('.land').focusout(function(){
      $countryDataDiv.css('display', 'none');
    });

  }

getData();


});

//tooltip na hover
//zrobic na if jesli kolor czerw to jak mouseout to zmien na bialy.
//jesli kolor zielony to zostaw i wylacz kiedy inny kraj bedzie klikniety

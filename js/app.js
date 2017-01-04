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









});

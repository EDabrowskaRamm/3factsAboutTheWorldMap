$(function(){
  var $navContainer = $('.navigation');
  var $headerBars = $navContainer.find('i');
  var $navigation = $navContainer.find('nav');

//navigation drop down
  $headerBars.on('click', function(){
    $navigation.toggle();
  });


});

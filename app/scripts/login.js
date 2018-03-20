$(function(){
  var deviceH = window.screen.height,
      headH = $('header').height(),
      conMainH = deviceH - headH;
  $('#ConMain').height(conMainH);
})

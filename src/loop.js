function doLoop(){
  window.setInterval(function(){
    calculateScene(1);
    drawScene();
  }, 50);    
}
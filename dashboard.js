/*
	todo: specular glow shader?
	todo: block 'fade-in' animation
*/

var scene = scene_7;

var world = {  
  models: {},  
  objects: {},  
  camera: {
    position: [0,10,50],
    rotation: [40,0,0],
    dolly: [0,0,0],
    aperture: 45
  }  
}


var config = {
	models: [ 'box', 'box_white', 'plane' ],
  timer: 20,		 
  cents_per_block: 100,
  cube_size: 3,
	shaders: [
    ['data/vertex_light.shader','vertex'],
    ['data/fragment_light.shader','fragment']
  ]
}


try{
	var cube_size = parseInt(document.location.hash.split('#')[1]);
	if(cube_size>1){ config.cube_size = cube_size; }	
} catch(e){ }

$(document).ready(function(){  
  initGL();
  initEngine();
});

last_donation=0;
function pollDonations(){
  var api_url = 'http://www.bp42.com/de/activity_feed/donations';
  if(last_donation>0){ api_url+='?since='+last_donation; }
  $.get(api_url, function(d){
    var data = JSON.parse(d);
    $(data).each(function(i){
      if(this.time>last_donation){ last_donation = this.time; }
      addDonation(this.amount, this.codonation);
    });
    window.setTimeout(pollDonations, 2000);
  });
}
pollDonations();








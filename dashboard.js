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
  timer: 40,		 
  cents_per_block: 100,
  cube_size: 4,
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
  initInterface();
});

start_date=new Date();
start_date.setHours(start_date.getHours()-1);
last_donation=Math.floor(Number(start_date)/1000);

function pollDonations(){
  $.ajax({
    url: 'feed.php?since='+last_donation,
    complete: function(x,s){
      try{
        var data = JSON.parse(x.responseText);
        $(data).each(function(i){
          if(this.time>last_donation){ last_donation = this.time; }
          addDonation(this.amount, this.codonation);
        });
      } catch(e){}
      window.setTimeout(pollDonations, 5000);
    }
  });
}
pollDonations();

function initInterface(){
  $('#status').html('  since: ' + start_date.getDate() + '.' + start_date.getMonth() + ' ' + start_date.getHours() + ':'  + start_date.getMinutes() + ':' + start_date.getSeconds());  
}









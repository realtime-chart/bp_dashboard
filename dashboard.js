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
	shaders: [
    ['data/vertex_light.shader','vertex'],
    ['data/fragment_light.shader','fragment']
  ]
}


$(document).ready(function(){  
  initGL();
  initEngine();
});


/* test */
window.setInterval(function(){
	var amount = Math.random()*2000;
	if(Math.random()>0.5){
		addDonation(amount, true);
	} else {
		addDonation(amount, false);
	}	
}, 1000);






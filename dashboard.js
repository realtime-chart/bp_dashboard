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
	scenes: [ scene_1 ],   
  timer: 20,		 
	shaders: [
    ['data/vertex_light.shader','vertex'],
    ['data/fragment_light.shader','fragment']
  ]
}


/* test */
var cube_queue = new Array;
window.setInterval(function(){
	if(Math.random()>0.5){
		cube_queue.push(true);	
	} else {
		cube_queue.push(false);
	}	
}, 50);


$(document).ready(function(){  
  initGL();
  initEngine();
});




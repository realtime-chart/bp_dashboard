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
  timer: 30,		 
	shaders: [
    ['data/vertex_color.shader','vertex'],
    ['data/fragment_color.shader','fragment']
  ]
}



$(document).ready(function(){  
  initGL();
  initEngine();
});



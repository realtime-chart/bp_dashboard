var scene = scene_6;

var world = {  
  models: {},  
  objects: {},  
  camera: {
    position: [0,10,50],
    rotation: [40,0,0],
    dolly: [0,0,0]
  }  
}


var config = {
	models: [ 'box', 'plane' ],
	scenes: [ scene_1 ],   
  timer: 20,		 
	shaders: [
    ['data/vertex_color.shader','vertex'],
    ['data/fragment_color.shader','fragment']
  ]
}



$(document).ready(function(){  
  initGL();
  initEngine();
});



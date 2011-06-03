var scene = scene_1;

var world = {  
  models: {},  
  objects: {},  
  camera: {
    position: [0,10,-100],
    rotation: [30,0,0]
  }  
}


var config = {
	models: [ 'box', 'plane' ],
	scenes: [ scene_1 ],   
  timer: 200,		 
	shaders: [
    ['data/vertex_color.shader','vertex'],
    ['data/fragment_color.shader','fragment']
  ]
}



$(document).ready(function(){  
  initGL();
  initEngine();
});



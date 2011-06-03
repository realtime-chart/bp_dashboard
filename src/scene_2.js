scene_2 = {


	initScene: function(){
		gl.clearColor((99/255.0), (107/255.0), (112/255.0), 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		
		createObject('box_1', 'box');
		moveObjectAbs('box_1', [0, 0, 0]);	
	},

	calculateScene: function(diff){
		world.camera.position = [0,0,-100];
		world.camera.rotation = [30,0,0];
	}
	
}



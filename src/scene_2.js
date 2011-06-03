scene_2 = {

	"camPathPos": 0,

	initScene: function(){
		gl.clearColor((99/255.0), (107/255.0), (112/255.0), 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		
		createObject('box_1', 'box');
		createObject('box_2', 'box');  
	},

	calculateScene: function(diff){
		moveObject('box_1', [0, -0.5, 0]);		
		moveObjectAbs('box_2', [0, -1.5, 1]);		
		if(getObject('box_1').position[1] <= -30){
		  moveObject('box_1', [0, 100, 0]);
		}
		this.camPathPos += 1 * diff;
		world.camera.rotation[1] = this.camPathPos*0.2;   
	}
	
}



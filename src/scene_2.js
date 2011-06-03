scene_2 = {

	cube_width: 1,
	cube_height: 1,
	cube_spacing: 2.5,
	cubes: new Array,	

	initScene: function(){
		gl.clearColor((99/255.0), (107/255.0), (112/255.0), 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		
		createObject('plane_1', 'plane');
		moveObjectAbs('plane_1', [10, 45, 0]);	

		/*createObject('box_2', 'box');
		moveObjectAbs('box_2', [1.5, 0, 0]);	*/		
	},

	calculateScene: function(diff){
		this.addCube();
		world.camera.position = [0,0,-100];
		world.camera.rotation = [30,30,0];
	},
	
	addCube: function(){	
		pos = this.nextCubePos();				
		var t = 'box_'+this.cubes.length;
		createObject(t, 'box');
		moveObjectAbs(t, [(pos[0]*this.cube_spacing), 0, (pos[2]*this.cube_spacing)]);
		this.cubes.push(t);
	},
	
	nextCubePos: function(){
		var n = this.cubes.length;
		var total = (this.cube_width*this.cube_width);
		if(n>=total){
			this.cube_width += 1;
		}
		
		var total_xz = (this.cube_width*this.cube_width);
		var row_c = n - ((this.cube_width-1)*(this.cube_width-1));
		if(row_c>this.cube_width-1){			
			return [this.cube_width-1-((row_c-this.cube_width)+1), 0, this.cube_width-1];
		} else {
			return [this.cube_width-1, 0, this.cube_width-(this.cube_width-row_c)];
		}			
	}
	
}



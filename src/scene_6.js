scene_6 = {

	cube_spacing: 1.5,
	bigcube_spacing: 2,
	cube_size: 3,
	cubes_total: 0,
	camera_pos: 0,
	
	x_offset: 0,	
	time: 0,
	
	initScene: function(){
		gl.clearColor((99/255.0), (107/255.0), (112/255.0), 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		
		this.initCubes();
		this.max_cubes = (this.cube_size*this.cube_size*this.cube_size);

		/*createObject('plane_1', 'plane');
		moveObjectAbs('plane_1', [10, 35, 0]);	*/
	},

	calculateScene: function(diff){		
		world.camera.position = [0,0,0];
		world.camera.rotation = [0,-10,0];
		world.camera.dolly = [0,0,-30]
		this.time += diff;
		if(this.time > 300){
			this.addCubes();
			this.time = 0;
		}
		for(n=0; n<this.cubes_total; n++){
			moveObject('box_'+n, [0, 0, 0]);
		}
		world.camera.dolly[0] =0 + this.camera_pos;
		if(this.camera_pos > -this.x_offset){
			this.camera_pos -= (0.002 * diff) * ((this.x_offset+this.camera_pos)/(this.cube_size + this.bigcube_spacing));
		}
		//console.log(this.camera_pos + " - " + this.x_offset);
	},
	
	addCubes: function(){
		if(this.cubes_num==this.max_cubes){
			this.x_offset += this.cube_size*this.cube_spacing*this.bigcube_spacing;
			this.initCubes();
		} else {
			this.addCube();
		}				
	},
	
	addCube: function(){	
		var pos = this.nextCubePos();				
		var t = 'box_'+this.cubes_total;
		createObject(t, 'box');
		moveObjectAbs(t, [(pos[0]*this.cube_spacing)+this.x_offset, (pos[1]*this.cube_spacing), (pos[2]*this.cube_spacing)]);		
		this.cubes[this.cube_lvl].push(t);
		this.cubes_num += 1;
		this.cubes_total += 1;
	},
	
	initCubes: function(){		
		this.cube_width = 1;
		this.cube_height = 1,	
		this.cubes = [ [] ];
		this.cubes_num = 0;
		this.cube_lvl = 0;
		this.cube_widths = [ 1 ];
	},
	
	nextCubePos: function(){	
		if(this.cubes[this.cube_lvl].length>=(this.cube_widths[this.cube_lvl]*this.cube_widths[this.cube_lvl])){
			this.cube_widths[this.cube_lvl] += 1;
		}		
				
		if(this.cube_widths[this.cube_lvl]>this.cube_width+1){	
			this.cube_height += 1;			
			this.cubes.push(new Array)
			this.cube_lvl += 1;
			this.cube_widths.push(1);
		} 
		
		if(this.cube_lvl >= this.cube_size){
			this.cube_lvl = 0;
		}

		return this.nextCubeLvlPos(this.cube_lvl, this.cube_widths[this.cube_lvl], this.cubes[this.cube_lvl]);
	},
	
	nextCubeLvlPos: function(lvl, width, lvl_cubes){
		var n = lvl_cubes.length;
		var total = (width*width);
		var total_xz = (width*width);
		var row_c = n - ((width-1)*(width-1));
		if(row_c>width-1){			
			return [width-1-((row_c-width)+1), lvl, width-1];
		} else {
			return [width-1, lvl, width-(width-row_c)];
		}			
	}
	
}



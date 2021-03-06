scene_7 = {

	cube_spacing: 1.5,
	bigcube_spacing: 2,
	bigcubes_prune: 5,
	cube_size: 0,
	cubes_total: 0,
	camera_pos: 0,
	camera_zoom: 50,
	camera_zoom_t: 50,
		
	x_offset: 0,	
	time: 0,
	
	initScene: function(){
		gl.clearColor((99/255.0), (107/255.0), (112/255.0), 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		
		this.cube_size = config.cube_size;
		this.initCubes();
		this.big_cubes = [];
		this.max_cubes = (this.cube_size*this.cube_size*this.cube_size);
	},

	calculateScene: function(diff){		
		world.camera.position = [0,0,0];
		world.camera.rotation = [20,-10,0];
		world.camera.dolly = [0,-12,-30];
		
		var zoomout_f=0.1;
		if((world.camera.aperture)>this.camera_zoom+(zoomout_f * diff)){
			world.camera.aperture -= (zoomout_f * diff);
			if(world.camera.aperture<=this.camera_zoom+(zoomout_f * diff)){
				this.camera_zoom = this.camera_zoom_t;
			}
		} 
		var zoomin_f=0.08;
		if((world.camera.aperture)<this.camera_zoom){
			world.camera.aperture += (zoomin_f * diff);
			if(world.camera.aperture>=this.camera_zoom-(zoomin_f * diff)){
				this.camera_zoom = this.camera_zoom_t;
			}
		} 
		
		this.time += diff;
		
		if(this.big_cubes.length > this.bigcubes_prune){
			var del_cubes = this.big_cubes[0];
			this.big_cubes.splice(0,1);
			for(l=0; l<del_cubes.length; l++){
				for(n=0; n<del_cubes[l].length; n++){
					destroyObject(del_cubes[l][n]);
				}				
			}

		}
		
		if(this.time > 50){
			if(cube_queue.length>0){
				var next_cube = cube_queue[0];
				cube_queue.splice(0,1);
				this.addCubes(next_cube);
			}
			this.time = 0;
		}
		
		world.camera.dolly[0] =0 + this.camera_pos;
		
		if(this.camera_pos > -this.x_offset){
			this.camera_pos -= (0.002 * diff) * ((this.x_offset+this.camera_pos)/(this.cube_size + this.bigcube_spacing));
		}
	},
	
	addCubes: function(white){
		if(this.cubes_num==this.max_cubes){
			this.camera_zoom = 40;
			this.big_cubes.push(this.cubes);
			this.x_offset += this.cube_size*this.cube_spacing*this.bigcube_spacing;
			this.initCubes();
		} else {
			this.addCube(white);	
		}				
	},
	
	addCube: function(white){	
		var pos = this.nextCubePos();				
		var t = 'box_'+this.cubes_total;
		if(white==true){ createObject(t, 'box_white'); } else { createObject(t, 'box'); }		
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



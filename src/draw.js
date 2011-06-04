function drawScene(){
  var width = canvas.width = canvas.clientWidth;
  var height = canvas.height = canvas.clientHeight;  
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  
  gl.viewport(0, 0, width, height);
  
  /*light*/
  /*gl.uniform3f(shaderProgram.ambientColorUniform, 1.0, 0.0, 0.0);
  gl.uniform3f(shaderProgram.pointLightingLocationUniform, 1.0, 0.0, 0.0);
  gl.uniform3f(shaderProgram.pointLightingColorUniform, 1.0, 0.0, 0.0);*/
    
  gl.uniform3f(gl.getUniformLocation(shaderProgram, "uAmbientColor"), 0.4, 0.4,0.4);
  /*var vLightDirection = Vector.create([2.0,-2.0,2.0]);
  var vAdjustedLDir   = vLightDirection.toUnitVector().x(-1);
  var flatLD = [vAdjustedLDir.e(1),vAdjustedLDir.e(2),vAdjustedLDir.e(3)];*/
  gl.uniform3f(gl.getUniformLocation(shaderProgram, "uLightingDirection"), 0, -2, 0);
  gl.uniform3f(gl.getUniformLocation(shaderProgram, "uDirectionalColor"), 0.8, 0.8, 0.8);

     
  jQuery.each(world['objects'], function(i){
    

		pMatrix = makePerspective(45, width/height, 0.1, 1000.0);
		mvMatrix = Matrix.I(4);  
		mvMatrix = mvMatrix.x(create3DTranslationMatrix(Vector.create(world.camera.position)).ensure4x4());  
		mvMatrix = mvMatrix.x(Matrix.Rotation(world.camera.rotation[0]* Math.PI / 180.0, Vector.create([1,0,0])).ensure4x4());
		mvMatrix = mvMatrix.x(Matrix.Rotation(world.camera.rotation[1]* Math.PI / 180.0, Vector.create([0,1,0])).ensure4x4());
		mvMatrix = mvMatrix.x(Matrix.Rotation(world.camera.rotation[2]* Math.PI / 180.0, Vector.create([0,0,1])).ensure4x4());  
	
		mvTranslate(world.camera.dolly);
    mvTranslate(this.position);
        
        
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.model.colors);
    gl.vertexAttribPointer(vertexColorAttribute,4, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,this.model.normals);
    gl.vertexAttribPointer(vertexNormalAttribute,this.model.normals.itemSize, gl.FLOAT, false, 0,0);  
    
    gl.bindBuffer(gl.ARRAY_BUFFER,this.model.vertices);
    gl.vertexAttribPointer(vertexPositionAttribute,this.model.vertices.itemSize, gl.FLOAT, false, 0,0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this['model'].indices);  
  
    setMatrixUniforms();  
    
    gl.drawElements(gl.TRIANGLES, this['model'].indices.numItems, gl.UNSIGNED_SHORT, 0);
    
  });  
}

function initScene(){
  gl.clearColor((99/255.0), (107/255.0), (112/255.0), 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
}

function calculateScene(diff){
  yRot += 5 * diff;
}

function drawScene(){
  var width = canvas.width = canvas.clientWidth;
  var height = canvas.height = canvas.clientHeight;
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  
  
  /*camera*/
  pMatrix = createPerspectiveMatrix(45, width/height, fZnear, fZfar);
  mvMatrix = Matrix.I(4);  
  mvMatrix = mvMatrix.x(create3DTranslationMatrix(Vector.create([0.0, 0.0, -3.0])).ensure4x4());  
  mvMatrix = mvMatrix.x(Matrix.Rotation(xRot* Math.PI / 180.0, Vector.create([1,0,0])).ensure4x4());
  mvMatrix = mvMatrix.x(Matrix.Rotation(yRot* Math.PI / 180.0, Vector.create([0,1,0])).ensure4x4());
  mvMatrix = mvMatrix.x(Matrix.Rotation(zRot* Math.PI / 180.0, Vector.create([0,0,1])).ensure4x4());

  /*light*/
  gl.uniform3f(gl.getUniformLocation(shaderProgram, "uAmbientColor"), 0.4, 0.4,0.4);
  var vLightDirection = Vector.create([2.0,2.0,-2.0]);
  var vAdjustedLDir   = vLightDirection.toUnitVector().x(-1);
  var flatLD = [vAdjustedLDir.e(1),vAdjustedLDir.e(2),vAdjustedLDir.e(3)];
  gl.uniform3f(gl.getUniformLocation(shaderProgram, "uLightingDirection"), flatLD[0], flatLD[1], flatLD[2]);
  gl.uniform3f(gl.getUniformLocation(shaderProgram, "uDirectionalColor"), 0.8, 0.8, 0.8);
 
 
  /* action */
  jQuery.each(world, function(i){
    //var obj = world['box'];    
    gl.bindBuffer(gl.ARRAY_BUFFER,this.normals);
    gl.vertexAttribPointer(vertexNormalAttribute,this.normals.itemSize, gl.FLOAT, false, 0,0);  
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertices);
    gl.vertexAttribPointer(vertexPositionAttribute,this.vertices.itemSize, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices);  
    setMatrixUniforms();  
    gl.drawElements(gl.TRIANGLES, this.indices.numItems, gl.UNSIGNED_SHORT, 0);
  });
  
}
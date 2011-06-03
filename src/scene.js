function initScene(){
  gl.clearColor((99/255.0), (107/255.0), (112/255.0), 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  
  createObject('plane_1', 'plane');
  createObject('box_1', 'box');
  createObject('box_2', 'box');  
}

function createObject(name, model){
  world['objects'][name] = {
    model: world['models'][model],
    position: [0,0,0],
    rotation: [0,0,0]
  }
}

function moveObject(name, pos){
  world['objects'][name].position[0] += pos[0];
  world['objects'][name].position[1] += pos[1];
  world['objects'][name].position[2] += pos[2];
}

function moveObjectAbs(name, pos){
  world['objects'][name].position[0] = pos[0];
  world['objects'][name].position[1] = pos[1];
  world['objects'][name].position[2] = pos[2];
}

function getObject(name){
  return world['objects'][name];
}

function calculateScene(diff){
  moveObject('box_1', [0, -0.5, 0])
  
  moveObjectAbs('box_2', [0, -1.5, 1])
  
  if(getObject('box_1').position[1] <= -30){
    moveObject('box_1', [0, 100, 0])
  }
  camPathPos += 1 * diff;
  //world.camera.position[1] = camPathPos; 
  world.camera.rotation[1] = camPathPos*0.2; 
  
}

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
    
    /*camera*/
    pMatrix = makePerspective(45, width/height, 0.1, 1000.0);
    mvMatrix = Matrix.I(4);  
    mvMatrix = mvMatrix.x(create3DTranslationMatrix(Vector.create(world.camera.position)).ensure4x4());  
    mvMatrix = mvMatrix.x(Matrix.Rotation(world.camera.rotation[0]* Math.PI / 180.0, Vector.create([1,0,0])).ensure4x4());
    mvMatrix = mvMatrix.x(Matrix.Rotation(world.camera.rotation[1]* Math.PI / 180.0, Vector.create([0,1,0])).ensure4x4());
    mvMatrix = mvMatrix.x(Matrix.Rotation(world.camera.rotation[2]* Math.PI / 180.0, Vector.create([0,0,1])).ensure4x4());
        
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
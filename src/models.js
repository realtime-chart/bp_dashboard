function initModels(models, model_names){
  jQuery.each(models, function(i){
    name = model_names[i];
    
    var obj = {
      'data': this,
      'vertices': gl.createBuffer()
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this[0]), gl.STATIC_DRAW);
    obj.vertices.itemSize = 3;
    obj.vertices.numItems = this[0].length/3;

    world[name] = obj;
    
    mainObjNormalBufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mainObjNormalBufferID);
    var faMainObjNormals = this[1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faMainObjNormals), gl.STATIC_DRAW);
    mainObjNormalBufferID.itemSize = 3;
    mainObjNormalBufferID.numItems = this[1].length/3;

    mainObjVertexIndexBuffID = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mainObjVertexIndexBuffID);
    var faMainObjVertexIndices = this[2];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faMainObjVertexIndices), gl.STATIC_DRAW);
    mainObjVertexIndexBuffID.itemSize = 1;
    mainObjVertexIndexBuffID.numItems = this[2].length;
  });
}

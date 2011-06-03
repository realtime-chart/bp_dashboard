function initModels(models, model_names){
  jQuery.each(models, function(i){
    //alert(model_names[i]);

    mainObjVertexPosBuffID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mainObjVertexPosBuffID);
    var faMainObjVertexPos = this[0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faMainObjVertexPos), gl.STATIC_DRAW);
    mainObjVertexPosBuffID.itemSize = 3;
    mainObjVertexPosBuffID.numItems = 24;

    mainObjNormalBufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mainObjNormalBufferID);
    var faMainObjNormals = this[1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faMainObjNormals), gl.STATIC_DRAW);
    mainObjNormalBufferID.itemSize = 3;
    mainObjNormalBufferID.numItems = 24;

    mainObjVertexIndexBuffID = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mainObjVertexIndexBuffID);
    var faMainObjVertexIndices = this[2];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faMainObjVertexIndices), gl.STATIC_DRAW);
    mainObjVertexIndexBuffID.itemSize = 1;
    mainObjVertexIndexBuffID.numItems = 36;
  });
}

function initModels(models, model_names){
  jQuery.each(models, function(i){
    name = model_names[i];
    
    var obj = {
      'data': this,
      'vertices': gl.createBuffer(),
      'normals': gl.createBuffer(),
      'indices': gl.createBuffer()
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this[0]), gl.STATIC_DRAW);
    obj.vertices.itemSize = 3;
    obj.vertices.numItems = this[0].length/3;

    gl.bindBuffer(gl.ARRAY_BUFFER, obj.normals);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this[1]), gl.STATIC_DRAW);
    obj.normals.itemSize = 3;
    obj.normals.numItems = this[1].length/3;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this[2]), gl.STATIC_DRAW);
    obj.indices.itemSize = 1;
    obj.indices.numItems = this[2].length;
    
    world['models'][name] = obj;
  });
}

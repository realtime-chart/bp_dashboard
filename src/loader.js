function loadShaders(shader_files, callback){
  shaders = new Array;
  $(shader_files).each(function(i,shader_info){
    $.get(shader_info[0], function(data){
        shaders.push(loadShader(data, shader_info[1]));
        if(shaders.length == shader_files.length){ initShaders(shaders); callback(); }
    });
  });
}

function loadShader(shader_file, type){
  var shader;
  if (type=='fragment'){ shader = gl.createShader(gl.FRAGMENT_SHADER); }
  if (type=='vertex'){ shader = gl.createShader(gl.VERTEX_SHADER); }

  gl.shaderSource(shader, shader_file);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){ 
    alert("can't compile shader: " + gl.getShaderInfoLog(shader)); 
    return null;
  } else {
    return shader;
  }
}


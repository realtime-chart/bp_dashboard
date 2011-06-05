function initGL()  {
  canvas = document.getElementById("dashboard_canvas"); 
  try { gl = canvas.getContext("experimental-webgl", { antialias: true }); } catch(e){  }  
  if (!gl){ alert("no webGL"); }
}

function initShaders(shaders){
  shaderProgram = gl.createProgram();
  $(shaders).each(function(i,shader){
    gl.attachShader(shaderProgram, shader);
  });
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){ alert("can't init shaders"); }
  gl.useProgram(shaderProgram);
  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  vertexNormalAttribute   = gl.getAttribLocation(shaderProgram, "aVertexNormal");
  vertexColorAttribute   = gl.getAttribLocation(shaderProgram, "aVertexColor");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.enableVertexAttribArray(vertexNormalAttribute);
  gl.enableVertexAttribArray(vertexColorAttribute);
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

function mvTranslate(v){
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function multMatrix(m){
  mvMatrix = mvMatrix.x(m);
}

function setMatrixUniforms(){
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(pMatrix.flatten()));
  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  var normalMatrix = mvMatrix.inverse();
  normalMatrix = normalMatrix.transpose();
  var nUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
  gl.uniformMatrix4fv(nUniform, false, new Float32Array(normalMatrix.flatten()));
}

function createPerspectiveMatrix(fFoVVy, fAspect, fZnear, fZfar){
  return (Matrix.create([[Math.tan(fFoVVy* Math.PI / 180.0)/fAspect, 0, 0, 0],
    [0, 1/Math.tan(fFoVVy* Math.PI / 180.0), 0, 0],
    [0, 0, (fZnear+fZfar)/(fZnear-fZfar), 2*fZnear*fZfar/(fZnear-fZfar)],
    [0, 0, -1, 0]]));
};

function create3DTranslationMatrix(v){
  var Mtrans = Matrix.I(4); 
  Mtrans.elements[0][3] = v.elements[0];
  Mtrans.elements[1][3] = v.elements[1];
  Mtrans.elements[2][3] = v.elements[2];
  return(Mtrans);
};

function create3DRotationMatrix(angle,v){
  var Mrot = Matrix.I(4); 
  Mrot.elements[0][3] = v.elements[0];
  Mrot.elements[1][3] = v.elements[1];
  Mrot.elements[2][3] = v.elements[2];
  return(Mrot);
};

function makePerspective(fovy, aspect, znear, zfar){
  var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
  var ymin = -ymax;
  var xmin = ymin * aspect;
	var xmax = ymax * aspect;
  return makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
}

function makeFrustum(left, right, bottom, top, znear, zfar){
	var X = 2*znear/(right-left);
  var Y = 2*znear/(top-bottom);
  var A = (right+left)/(right-left);
  var B = (top+bottom)/(top-bottom);
  var C = -(zfar+znear)/(zfar-znear);
  var D = -2*zfar*znear/(zfar-znear);
  return $M([[X, 0, A, 0],[0, Y, B, 0],[0, 0, C, D],[0, 0, -1, 0]]);
}

Matrix.Translation = function(v){
  if (v.elements.length == 2) {
    var r = Matrix.I(3);
    r.elements[2][0] = v.elements[0];
    r.elements[2][1] = v.elements[1];
    return r;
  }
  if (v.elements.length == 3) {
    var r = Matrix.I(4);
    r.elements[0][3] = v.elements[0];
    r.elements[1][3] = v.elements[1];
    r.elements[2][3] = v.elements[2];
    return r;
  }
  throw "Invalid length for Translation";
}


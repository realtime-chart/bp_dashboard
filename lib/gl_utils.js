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
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.enableVertexAttribArray(vertexNormalAttribute);

}

function setMatrixUniforms()  {
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

/* refactored */

/*


function createOrthographicMatrix(left,right,bottom,top,near,far){
  return(Matrix.create([[2/(right-left), 0 , 0 , -(right+left)/(right-left)],
                        [0, 2/(top-bottom), 0 , -(top+bottom)/(top-bottom)],
						[0,0,      2/(far-near), (far+near)/(far-near)],
						[0,0,0,1]]));
};



//function create3DTranslationMatrix(v) konvertiert einen Vektor in eine Translationsmatrix
//function create3DTranslationMatrix(v)


function sleep(ms){ 
var zeit=(new Date()).getTime(); 
var stoppZeit=zeit+ms; 
while((new Date()).getTime()<stoppZeit){}; 
}

//Klassendefinition JSVertexTriangle (Dreieck aus einzelnen Vertizes)
function JSVertexTriangle(xyz1, xyz2, xyz3){
  this.vertex1 = Vector.create(xyz1);
  this.vertex2 = Vector.create(xyz2);
  this.vertex3 = Vector.create(xyz3);
  this.textureCoords1 = [0.0,0.0];
  this.textureCoords2 = [1.0,0.0];
  this.textureCoords3 = [1.0,1.0];
  this.getNormal = function()  {
    var sideOne=this.vertex2.subtract(this.vertex1);
	var sideTwo=this.vertex3.subtract(this.vertex1);
	var normal = sideOne.cross(sideTwo);
    normal= normal.toUnitVector();
	//alert("NORMALE Berechnet:" + normal.e(1) +" / " + normal.e(2) + " / "+ normal.e(3) + "\n" );
  
	return(normal);
  }
  this.TransRotCopy = function(mvMatrix)  {
    var trTriangle = new JSVertexTriangle([0,0,0],[0,0,0],[0,0,0]);
	trTriangle.vertex1 = mvMatrix.x(this.vertex1);
	trTriangle.vertex2 = mvMatrix.x(this.vertex2);
	trTriangle.vertex3 = mvMatrix.x(this.vertex3);
	return(trTriangle);
  }
}
  

function JSIndexedFaceSet(){
  this.m_avVertices      = new Array(); //Vector Array
  this.m_avNormals       = new Array(); //NormalenVektoren
  this.m_avTextureCoords = new Array(); //Texturkoordinaten zu den Indizes
  
  this.m_aiIndices       = new Array(); //Indizes zur Erzeugung der Facetten
  this.m_aiNormalIndices = new Array(); //NormalenIndizes der Facetten
  this.m_aiTexIndices    = new Array(); //Texturekoordinatenindizes
  
  this.m_vBoundingBoxMin = Vector.create([999999.0,999999.0,999999.0,]);
  this.m_vBoundingBoxMax = Vector.create([-999999.0,-999999.0,-999999.0,]);
  
}


*/








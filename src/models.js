function initObjBuffers()  {
  mainObjVertexPosBuffID = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, mainObjVertexPosBuffID);
var faMainObjVertexPos = [
   // Vorderseite
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Rueckseite
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Oberseite
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Unterseite
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // rechte Seite
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // linke Seite
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,

];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faMainObjVertexPos), gl.STATIC_DRAW);
  mainObjVertexPosBuffID.itemSize = 3;
mainObjVertexPosBuffID.numItems = 24;

mainObjNormalBufferID = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, mainObjNormalBufferID);
var faMainObjNormals = [
// Front face
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,

    // Back face
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,

    // Top face
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,

    // Bottom face
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,

    // Right face
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,

    // Left face
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faMainObjNormals), gl.STATIC_DRAW);
  mainObjNormalBufferID.itemSize = 3;
  mainObjNormalBufferID.numItems = 24;

  mainObjVertexIndexBuffID = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mainObjVertexIndexBuffID);
  var faMainObjVertexIndices = [
    0, 1, 2,      0, 2, 3,    // Vorderseite
    4, 5, 6,      4, 6, 7,    // Rückseite
    8, 9, 10,     8, 10, 11,  // Oberseite
    12, 13, 14,   12, 14, 15, // Unterseite
    16, 17, 18,   16, 18, 19, // rechte Seite
    20, 21, 22,   20, 22, 23  // linke Seite
  ];
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faMainObjVertexIndices), gl.STATIC_DRAW);
  mainObjVertexIndexBuffID.itemSize = 1;
  mainObjVertexIndexBuffID.numItems = 36;
}
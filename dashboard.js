var gl, shaderProgram, vertexPositionAttribute, vertexNormalAttribute, pMatrix, mvMatrix;
var mainObjVertexPosBuffID, mainObjVertexIndexBuffID;

var xRot = 30;
var yRot = -20;
var zRot = 0;
var xCamTrans = 0;
var yCamTrans = 0;
var zCamTrans = 0;
var alphaCam  = 0;
var lastTime = 0;

var fZnear =0.1;
var fZfar  =100.0;


function _loadShaders(callback){
  loadShaders([
    ['shaders/vertex.shader','vertex'],
    ['shaders/fragment.shader','fragment']
  ], callback);
}

function _loadScene(callback){
  initObjBuffers();
  initScene();
  callback();
}

$(document).ready(function(){
  
  initGL();
  
  _loadShaders(function(){
    _loadScene(function(){
      doLoop();
    });
  });  

});
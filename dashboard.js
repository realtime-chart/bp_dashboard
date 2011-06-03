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

var fZnear = 0.1;
var fZfar  = 100.0;

var world = {};

function _loadShaders(callback){
  loadShaders([
    ['data/vertex.shader','vertex'],
    ['data/fragment.shader','fragment']
  ], callback);
}

function _loadModels(callback){
  loadModels([ 'plane', 'box' ], callback);
}

function _loadScene(callback){
  initScene();
  callback();
}

$(document).ready(function(){
  
  initGL();
  
  _loadShaders(function(){
    _loadModels(function(){
      _loadScene(function(){
        doLoop();
      });
    });
  });  

});
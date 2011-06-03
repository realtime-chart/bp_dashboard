var gl, shaderProgram, vertexPositionAttribute, vertexNormalAttribute, pMatrix, mvMatrix;
var mainObjVertexPosBuffID, mainObjVertexIndexBuffID;


var alphaCam  = 0;
var lastTime = 0;

var camPathPos = 0;

var world = {  
  models: {},
  objects: {},
  camera: {
    position: [0,10,-100],
    rotation: [30,0,0]
  }
}

function _loadShaders(callback){
  loadShaders([
    ['data/vertex_color.shader','vertex'],
    ['data/fragment_color.shader','fragment']
  ], callback);
}

function _loadModels(callback){
  loadModels([ 'box', 'plane' ], callback);
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
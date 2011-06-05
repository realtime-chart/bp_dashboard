var vertexPositionAttribute, vertexNormalAttribute, vertexColorAttribute;
var gl, shaderProgram, pMatrix, mvMatrix;
var lastTime=0;

function _loadShaders(callback){
  loadShaders(config.shaders, callback);
}

function _loadModels(callback){
  loadModels(config.models, callback);
}

function _loadScene(callback){
  scene.initScene();
  callback();
}

function initEngine(){
  _loadShaders(function(){
    _loadModels(function(){
      _loadScene(function(){
      	lastTime = new Date().getTime();
        window.setInterval(function(){
         	 var diff = new Date().getTime() - lastTime;
        	 lastTime = new Date().getTime();
        	 updateStatsDisplay();
			   	 scene.calculateScene(diff);			   	 
				   drawScene();				   
			  }, config.timer);
      });
    });
  }); 
}


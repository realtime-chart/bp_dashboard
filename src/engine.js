function _loadShaders(callback){
  loadShaders(config.shaders, callback);
}

function _loadModels(callback){
  loadModels(config.models, callback);
}

function _loadScene(callback){
	scene = config.scenes[0];
  scene.initScene();
  callback();
}

function initEngine(){
  _loadShaders(function(){
    _loadModels(function(){
      _loadScene(function(){
        window.setInterval(function(){
			   	 scene.calculateScene(1);
				   drawScene();
			  }, 500);
      });
    });
  }); 
}


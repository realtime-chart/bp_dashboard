function loadShaders(shader_files, callback){
  shaders = new Array;
  $(shader_files).each(function(i,shader_info){
    $.get(shader_info[0], function(data){
      shaders.push(loadShader(data, shader_info[1]));
      if(shaders.length == shader_files.length){ initShaders(shaders); callback(); }
    });
  });
}

function loadModels(model_names, callback){
  models = new Array;
  
  $(model_names).each(function(i,model_name){    
    $.get('data/'+model_name+'.model', function(data){
      try{ var model = JSON.parse(data); } catch(e) { alert(e); }
      if(!model){ alert("can't load model: "+model_name); } else {
        models.push([model,model_name]);
      }
      if(models.length == model_names.length){ initModels(models); callback(); }
    });
  });
}

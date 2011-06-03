function createObject(name, model){
  world['objects'][name] = {
    model: world['models'][model],
    position: [0,0,0],
    rotation: [0,0,0]
  }
}

function moveObject(name, pos){
  world['objects'][name].position[0] += pos[0];
  world['objects'][name].position[1] += pos[1];
  world['objects'][name].position[2] += pos[2];
}

function moveObjectAbs(name, pos){
  world['objects'][name].position[0] = pos[0];
  world['objects'][name].position[1] = pos[1];
  world['objects'][name].position[2] = pos[2];
}

function getObject(name){
  return world['objects'][name];
}



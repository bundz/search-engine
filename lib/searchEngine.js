var SearchEngine = function (config) {
  
  this.isFinalState = config.isFinalState;
  this.generatePossibleStates = config.generatePossibleStates;
  
};

SearchEngine.prototype.breadthFirst = function (state, hashFunction) {
  
  var queue = [];
  var visited = {}; 
  var actualState; 
  var possibleStates;
  var key;
  
  queue.unshift(state);
  
  while(queue.length > 0) {
    
    actualState = queue.pop();
    
    key = hashFunction(actualState);
    visited[key] = actualState;
    
    if(this.isFinalState(actualState)) {
      return getResultObject(state, actualState, visited, actualState.result); 
    }  
    
    actualState.result = actualState.result || [];
    
    possibleStates = this.generatePossibleStates(actualState);
    
    
    possibleStates.forEach(function (possibleState) {
      
      possibleKey = hashFunction(possibleState);
      
      if(!(visited[possibleKey])) {
        
        possibleState.result = actualState.result.slice(0);
        possibleState.result.push(key);
        
        queue.unshift(possibleState);
        
      }
      
    });
    
  }
  
  return { error: "No end state" };
  
};

SearchEngine.prototype.depthFirst = function (state, hashFunction) {
  
  var stack = [];
  var visited = {}; 
  var actualState; 
  var possibleStates;
  var key;
  
  stack.push(state);
  
  while(stack.length > 0) {
    
    actualState = stack.pop();
    
    key = hashFunction(actualState);
    visited[key] = actualState;
    
    if(this.isFinalState(actualState)) {
      return getResultObject(state, actualState, visited, actualState.result); 
    }  
    
    actualState.result = actualState.result || [];
    
    possibleStates = this.generatePossibleStates(actualState);
    
    
    possibleStates.forEach(function (possibleState) {
      
      possibleKey = hashFunction(possibleState);
      
      if(!(visited[possibleKey])) {
        
        possibleState.result = actualState.result.slice(0);
        possibleState.result.push(key);
        
        stack.push(possibleState);
        
      }
      
    });
    
  }
  
  return { error: "No end state" };
  
};

SearchEngine.prototype.limitedDepthFirst = function (state, hashFunction, limit) {
  
  var stack = [];
  var visited = {}; 
  var actualState; 
  var possibleStates;
  var key;
  state.height = 0;
  
  stack.push(state);
  
  while(stack.length > 0) {
    
    actualState = stack.pop();
    
    key = hashFunction(actualState);
    visited[key] = actualState;
    
    if(this.isFinalState(actualState)) {
      return getResultObject(state, actualState, visited, actualState.result); 
    }  
    
    actualState.result = actualState.result || [];
    
    possibleStates = this.generatePossibleStates(actualState);
    
    possibleStates.forEach(function (possibleState) {
      
      possibleKey = hashFunction(possibleState);
      
      if(actualState.height < limit) {
        
        possibleState.height = actualState.height + 1;
        possibleState.result = actualState.result.slice(0);
        possibleState.result.push(key);
        
        stack.push(possibleState);
        
      }
      
    });
    
  }
  
  return { error: "No end state" };
  
};

SearchEngine.prototype.iterativeDepthFirst = function (state, hashFunction) {
  
  var i = 1;
  var result;
  
  do {
    
    result = this.limitedDepthFirst(state, hashFunction, i);
    
    i++;
    
  } while (result.error);
  
  return result;
};

function wasVisited (visited, puzzle) {
  
  for(var i = 0; i < visited.length; i++) {
    if(isEqual(visited[i], puzzle)) {
     return true; 
    }
  }
  
  return false;
  
}

function isEqual (p1, p2) {
  
  for(var i = 0; i < p1.state.length; i++) {
    
    for(var j = 0; j < p1.state.length; j++) {
     
      if(p1.state[i][j] != p2.state[i][j]) {
        return false; 
      }
      
    }
    
  }
  
  return true;
  
}

function getResultObject (initialState, endState, hash, result) {
  
  var obj = { initialState: initialState, endState: endState };
  
  var resultStates = result.map(function (key) {
    return hash[key];
  });
  
  obj.result = resultStates;
  
  return obj;
  
}


module.exports = SearchEngine;
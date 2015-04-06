var getResultObject = require('./utils/getResultObject');

Array.prototype.insertState = function (state) {
  
  for(var i = 0; i < this.length; i++) {
   
    if(this[i].value > state.value) {
      this.splice(i,0,state); 
      return;
    }
    
  }
  
  this.push(state);
  
};


var aStar = function (state, hashFunction, heuristc) {
  
  var list = [];
  var visited = {}; 
  var actualState; 
  var possibleStates;
  var key;
  
  state.value = heuristc(state);
  list.insertState(state);
  
  while(list.length > 0) {
    
    actualState = list.shift();
    
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
        
        possibleState.value = heuristc(possibleState);
        possibleState.result = actualState.result.slice(0);
        possibleState.result.push(key);
        
        list.insertState(possibleState);
        
      }
      
    });
    
  }
  
  return { error: "No end state" };
  
};

module.exports = aStar;
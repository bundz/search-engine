var getResultObject = require('./utils/getResultObject');

var depthFirst = function (state, hashFunction) {
  
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

module.exports = depthFirst;
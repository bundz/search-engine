var getResultObject = require('./utils/getResultObject');

var breadthFirst = function (state, hashFunction) {
  
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

module.exports = breadthFirst;
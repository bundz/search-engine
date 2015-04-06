var getResultObject = require('./utils/getResultObject');

var limitedDepthFirst = function (state, hashFunction, limit) {
  
  var stack = [];
  var visited = {}; 
  var actualState; 
  var possibleStates;
  var key;
  state.height = 0;
  var maxStackLength = 0;
  
  stack.push(state);
  
  while(stack.length > 0) {
    
    maxStackLength = stack.length > maxStackLength ? stack.length : maxStackLength;
    
    actualState = stack.pop();
    
    key = hashFunction(actualState);
    visited[key] = actualState;
    
    if(this.isFinalState(actualState)) {
      return getResultObject(state, actualState, visited, actualState.result, maxStackLength); 
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

module.exports = limitedDepthFirst;
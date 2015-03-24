var getResultObject  = function (initialState, endState, hash, result) {
  
  var obj = { initialState: initialState, endState: endState };
  
  var resultStates = result.map(function (key) {
    return hash[key];
  });
  
  obj.result = resultStates;
  
  return obj;
  
};

module.exports = getResultObject;
var getResultObject  = function (initialState, endState, hash, result, maxStackLength) {
  
  var obj = { initialState: initialState, endState: endState, maxStackLength: maxStackLength };
  
  var resultStates = result.map(function (key) {
    return hash[key];
  });
  
  obj.result = resultStates;
  
  return obj;
  
};

module.exports = getResultObject;
var iterativeDepthFirst = function (state, hashFunction) {
  
  var i = 1;
  var result;
  
  do {
    
    result = this.limitedDepthFirst(state, hashFunction, i);
    
    i++;
    
  } while (result.error);
  
  console.log(result);
  return result;
};

module.exports = iterativeDepthFirst;
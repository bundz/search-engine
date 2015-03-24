var breadthFirst = require('./algorithms/breadthFirst'),
    depthFirst = require('./algorithms/depthFirst'),
    limitedDepthFirst = require('./algorithms/limitedDepthFirst'),
    iterativeDepthFirst = require('./algorithms/iterativeDepthFirst');

var SearchEngine = function (config) {
  
  this.isFinalState = config.isFinalState;
  this.generatePossibleStates = config.generatePossibleStates;
  
};

SearchEngine.prototype.breadthFirst = breadthFirst;

SearchEngine.prototype.depthFirst = depthFirst;

SearchEngine.prototype.limitedDepthFirst = limitedDepthFirst;

SearchEngine.prototype.iterativeDepthFirst = iterativeDepthFirst;

module.exports = SearchEngine;
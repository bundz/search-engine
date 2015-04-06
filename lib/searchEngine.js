var breadthFirst = require('./algorithms/breadthFirst'),
    depthFirst = require('./algorithms/depthFirst'),
    limitedDepthFirst = require('./algorithms/limitedDepthFirst'),
    iterativeDepthFirst = require('./algorithms/iterativeDepthFirst'),
    aStar = require('./algorithms/aStar');

var SearchEngine = function (config) {
  
  this.isFinalState = config.isFinalState;
  this.generatePossibleStates = config.generatePossibleStates;
  
};

SearchEngine.prototype.breadthFirst = breadthFirst;

SearchEngine.prototype.depthFirst = depthFirst;

SearchEngine.prototype.limitedDepthFirst = limitedDepthFirst;

SearchEngine.prototype.iterativeDepthFirst = iterativeDepthFirst;

SearchEngine.prototype.aStar = aStar;

module.exports = SearchEngine;
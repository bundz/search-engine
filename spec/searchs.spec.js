var chai = require("chai"),
    expect = chai.expect,
    SearchEngine = require("../lib/searchEngine");

function isFinalState (state) {
  
  var value = 1;
  
  for(var i = 0; i < state.puzzle.length; i++) {
   
    for(var j = 0; j < state.puzzle.length; j++) {
     
      if(state.puzzle[i][j] != value && !(i == state.puzzle.length - 1 && j == state.puzzle.length - 1)) {
       
        return false;
        
      }
    
      value++;
      
    }
    
  }
  
  return true;
  
}

function getPossibleStates (state) {
  
  var states = [];
  var x = state.empty.x;
  var y = state.empty.y;
  
  var cloneState = function (state) {
    
    var clone = {};
    
    clone.empty = state.empty;
    
    clone.puzzle = [];
    
    for(var i = 0; i < state.puzzle.length; i++) {
     
      clone.puzzle.push(new Array(state.puzzle.length));
      
      for(var j = 0; j < state.puzzle.length; j++) {
       
          clone.puzzle[i][j] = state.puzzle[i][j];
        
      }
      
    }
    
    return clone;
    
  };
  
  var swap = function (p1, p2, state) {
    
    var aux = state.puzzle[p1.x][p1.y];
    state.puzzle[p1.x][p1.y] = state.puzzle[p2.x][p2.y];
    state.puzzle[p2.x][p2.y] = aux;

    if(state.puzzle[p1.x][p1.y] == null) {
      state.empty = p1;
    }

    if(state.puzzle[p2.x][p2.y] == null) {
      state.empty = p2;
    }
    
  };
  
  var possibleState = cloneState(state);
  
  //left
  if (y > 0) {
    
    swap({ x: x,  y: y }, { x: x, y: y - 1 }, possibleState);
    possibleState.movements = "l";
    states.push(possibleState);
    possibleState = cloneState(state);
  }
  
  //up
  if (x > 0) {
    swap({ x: x,  y: y }, { x: x - 1, y: y }, possibleState);
    possibleState.movements = "u";
    states.push(possibleState);
    possibleState = cloneState(state);
  }
  
  //rigth
  if (y < state.puzzle.length - 1) {
    swap({ x: x,  y: y }, { x: x, y: y + 1 }, possibleState);
    possibleState.movements = "r";
    states.push(possibleState);
    possibleState = cloneState(state)
  }
  
  //down
  if (x < state.puzzle.length - 1) {
    swap({ x: x,  y: y }, { x: x + 1, y: y }, possibleState);
    possibleState.movements = "d";
    states.push(possibleState);
    possibleState = cloneState(state);
  }
  
  return states;
  
}

function hash (state) {
  
  var key = "";
  
  state.puzzle.forEach(function (array) {
    
    array.forEach(function (item) {
      
      if(item != null) {
       key += item; 
      } else {
        key += 0;
      }
      
    });
    
  });
  
  return key;
  
};

var config = {isFinalState: isFinalState, generatePossibleStates: getPossibleStates}; 

var search = new SearchEngine(config);
var state =  { puzzle : [[null, 5, 2], [1, 4, 3], [7, 8, 6]], empty: { x: 0, y: 0 } };

describe("Search Engine", function () {
  describe("When doing Breadth First Search", function () {
    
    var result = search.breadthFirst(state, hash);
    
    it("should return an object with result, endState and initialState", function () {
      
      expect(result).to.have.property("result");
      expect(result).to.have.property("endState");
      expect(result).to.have.property("initialState");
      
    });
    
    it("endState should be equal 1 2 3 4 5 6 7 8", function () {
      
      expect(result.endState.puzzle.toString()).to.be.equals("1,2,3,4,5,6,7,8,");
      
    });
    
    it("result length should be below 25", function () {
      expect(result.result.length).to.be.below(25);
    });
    
  });
  
  
  describe("When doing Depth First Search", function () {
    
    var result = search.depthFirst(state, hash);
    
    it("should return an object with result, endState and initialState", function () {
      
      expect(result).to.have.property("result");
      expect(result).to.have.property("endState");
      expect(result).to.have.property("initialState");
      
    });
    
    it("endState should be equal 1 2 3 4 5 6 7 8", function () {
      
      expect(result.endState.puzzle.toString()).to.be.equals("1,2,3,4,5,6,7,8,");
      
    });
    
    it("result length should be below 25", function () {
      expect(result.result.length).to.be.above(25);
    });
    
  });
  
  describe("When doing Limited Depth First Search", function () {
    
    var result = search.limitedDepthFirst(state, hash, 25);
    
    it("should return an object with result, endState and initialState", function () {
      
      expect(result).to.have.property("result");
      expect(result).to.have.property("endState");
      expect(result).to.have.property("initialState");
      
    });
    
    it("endState should be equal 1 2 3 4 5 6 7 8", function () {
      
      expect(result.endState.puzzle.toString()).to.be.equals("1,2,3,4,5,6,7,8,");
      
    });
    
    it("result length should be below 25", function () {
      expect(result.result.length).to.be.below(25);
    });
    
  });
  
  describe("When doing Iterative Depth First Search", function () {
    
    var result = search.iterativeDepthFirst(state, hash);
    
    it("should return an object with result, endState and initialState", function () {
      
      expect(result).to.have.property("result");
      expect(result).to.have.property("endState");
      expect(result).to.have.property("initialState");
      
    });
    
    it("endState should be equal 1 2 3 4 5 6 7 8", function () {
      
      expect(result.endState.puzzle.toString()).to.be.equals("1,2,3,4,5,6,7,8,");
      
    });
    
    it("result length should be below 25", function () {
      expect(result.result.length).to.be.below(25);
    });
    
  });
  
  describe("When doing A*", function () {
    
    var heuristic = function (state) {
      
      var value = 0;
      var expectedX, expectedY;
      
      
      for(var i = 0; i < state.puzzle.length; i++) {
       
        
        for(var j = 0; j < state.puzzle.length; j++) {
         
          
          if(state.puzzle[i][j] == null) {
            expectedX = state.puzzle.length - 1;
            expectedY = state.puzzle.length - 1;
          } else {
            expectedX = Math.floor((state.puzzle[i][j] - 1)/(state.puzzle.length));
            expectedY = (state.puzzle[i][j] - 1) % state.puzzle.length;
          }
          
          value += Math.abs(expectedX - i) + Math.abs(expectedY - j);
          
        }
        
      }
      
      return value;
      
    };
    
    var result = search.aStar(state, hash, heuristic);
    
    console.log(result.endState);
    
    it("should return an object with result, endState and initialState", function () {
      
      expect(result).to.have.property("result");
      expect(result).to.have.property("endState");
      expect(result).to.have.property("initialState");
      
    });
    
    it("endState should be equal 1 2 3 4 5 6 7 8", function () {
      
      expect(result.endState.puzzle.toString()).to.be.equals("1,2,3,4,5,6,7,8,");
      
    });
    
    it("result length should be below 25", function () {
      expect(result.result.length).to.be.below(25);
    });
    
  });
  
});










































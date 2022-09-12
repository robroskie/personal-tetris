allShapes = []
let allShapeLocations = [];

generateAllShapeLocations = () => {
  allShapeLocations = [];

  allShapes.forEach(element => {

    for(let x = 0; x < element.points.length; x++){
      for(let y = 0; y < element.points[x].length; y++){
        if(element.points[x][y] == 1){
          allShapeLocations.push(element.location + x * 10 + y);
        }
      }
    }
  })
  console.log(allShapeLocations);
}

const grid = [];
for (let i = 0; i < 100; i++) {
  grid[i] = 0;
}

addColorHandler = (Obj) => {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] == 1) {
      addColor(Obj, i);
    } else {
      removeColor(i);
    }
  }
};

addColor = (Obj, point) => {
  grid[point] = 1;

  const row = Math.floor(point / 10);
  const col = (point % 10) + 1;

  const temp_add = ".grid-item" + (row + 1) + "-" + col;

  document.querySelector(temp_add).classList.add(Obj.colour);
};

updateColors = (Obj) => {
  const arr = Obj.points;

  for (let z = 0; z < arr.length; z++) {
    for (let i = 0; i < arr[z].length; i++) {
      if (arr[z][i] == 1) {
        addColor(Obj, Obj.location + z * 10 + i);
      }
    }
  }
};

removeColor = (Obj, point) => {
  grid[point] = 0;
  let row = Math.floor(point / 10);
  let col = (point % 10) + 1;
  const temp_add = ".grid-item" + (row + 1) + "-" + col;

  let colour = Obj.colour;

  document.querySelector(temp_add).classList.remove(colour);
};

removeAllColors = (Obj) => {
  const arr = Obj.points;

  for (let z = 0; z < arr.length; z++) {
    for (let i = 0; i < arr[z].length; i++) {
      if (arr[z][i] == 1) {
        const toRemove = Obj.location + z * 10 + i;
        
        removeColor(Obj, toRemove);
      }
    }
  }
};

checkCollisionPoints = (Obj) => {
  const collisionPoints = getBottomCollisionPoints(Obj);

  for (let i = 0; i < collisionPoints.length; i++) {
    const pointToCheck =
      Obj.location + collisionPoints[i][0] * 10 + collisionPoints[i][1];
    {
      if (grid[pointToCheck + 10] == 1 || pointToCheck >= 90) {
        Obj.active = false;
        return true;
      }
    }
  }
  return false;

  // collisionPoints.forEach(function (part, index, arr) {
  //   const pointToCheck = Obj.location + arr[index][0] * 10 + arr[index][1];

  //   if (grid[pointToCheck + 10] == 1 || pointToCheck >= 90) {
  //     Obj.active = false;
  //   }
  // });
};

moveShapeDown = (Obj) => {
  removeAllColors(Obj);
  Obj.location += 10;
  updateColors(Obj);
};

checkShapeLeft = (Obj) => {
  let blocked = false;
  const leftColPoints = getLeftCollisionPoints(Obj);

  for (let i = 0; i < leftColPoints.length; i++) {
    const pointToCheck =
      Obj.location + leftColPoints[i][0] * 10 + leftColPoints[i][1];
    if (grid[pointToCheck - 1] == 1 || pointToCheck % 10 == 0) {
      blocked = true;
      return true;
    }
  }
  return false;
};



moveShapeLeft = (Obj) => {
  const leftColPoints = Obj.leftPoints;
  generateAllShapeLocations();
  
  let move = true;

  // Check if hitting left side
  let leftmost = 100;

  Obj.leftPoints.forEach(e => {
    leftmost = Math.min((Obj.location + e[1] + e[0] * 10) % 10, leftmost);
  });
  console.log(`leftmost=${leftmost}`);

  if(leftmost <= 0)
    move = false;

  // Check if hitting another object
  Obj.leftPoints.forEach(e => {
    const curBotPoint = Obj.location + e[1] + e[0] * 10;

    if(allShapeLocations.includes(curBotPoint - 1)){
      move = false;
    }

  });

  if(move){
    removeAllColors(Obj);
    Obj.location -= 1;
    updateColors(Obj);
  }

};


moveShapeRight = (Obj) => {
  const rightColPoints = getRightCollisionPoints(Obj);
  let blocked = checkShapeRight(Obj);

};

getLeftCollisionPoints = (Shape) => {
  const left_points = [];


  for (let i = 0; i < Shape.points.length; i++) {
    let found = false;
    for (let z = 0; z < Shape.points[i].length && !found; z++) {
      if (Shape.points[i][z] == 1) {
        left_points.push([i, z]);
        found = true;
      }
    }
  }

  return left_points;
};

getRightCollisionPoints = (Shape) => {
  const right_points = [];

  for (let i = 0; i < Shape.points.length; i++) {
    let found = false;
    for (let z = Shape.points[i].length; z >= 0 && !found; z--) {
      if (Shape.points[i][z] == 1) {
    
        right_points.push([i, z]);
        found = true;
      }
    }
  }

  return right_points;
};

//This returns a list of all sets of points at the bottom surface of the shape as (x, y) pairs
getBottomCollisionPoints = (Shape) => {
  const bottom_points = [];

  for (let i = Shape.points.length - 1; i >= 0; i--) {
    let found = false;
    for (let z = Shape.points[i].length - 1; z >= 0 && !found; z--) {
      if (Shape.points[z][i] == 1) {
        bottom_points.push([z, i]);

        found = true;
      }
    }
  }

  return bottom_points;
};

function Line() {
  this.location = 4;
  this.colour = 'Line';

  this.points = [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  this.orientation = 0;
  this.active = true;
}

function S() {
  this.location = 4;
  this.colour = 'S';

  this.points = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ];

  this.orientation = 0;
  this.active = true;
}

function Z() {
  this.location = 4;
  this.colour = 'S';

  this.points = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ];

  this.orientation = 0;
  this.active = true;
}

function Square() {
  this.location = 4;
  this.colour = "Square";
  this.orientation = 0;
  this.active = true;

  this.points = [
    [1, 1]
    [1, 1]
  ];

  this.bottomPoints = [[1,0], [1,1]];

  function leftPoints(el){
    if(el.orientation == 0)
      return [[0,0], [1,1], [2,1]];
    else if(el.orientation == 1)
      return [[0,0], [1,0], [2,0]];
    else if(el.orientation == 2)
      return [[2,0], [1,1], [0,1]];
    else 
      return [[0,2], [1,0], [2,2]];
  }

  this.leftPoints = [[0,0], [1,0]];
}

function L() {
  this.location = 4;
  this.colour = "L";

  this.points = [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ];

  this.orientation = 0;
  this.active = true;
}

function J() {
  this.location = 4;
  this.colour = "L";

  this.points = [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  this.orientation = 0;
  this.active = true;
}

function T() {
  this.location = 4;
  this.colour = "T";
  this.orientation = 0;
  this.active = true;

  this.points = [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ];

  function bottomPoints(el){
    if(el.orientation == 0)
      return [[0,0], [2,1], [0,2]];
    else if(el.orientation == 1)
      return [[1,0], [1,1], [2,2]];
    else if(el.orientation == 2)
      return [[2,0], [2,1], [2,2]];
    else 
      return [[2,0], [1,1], [1,2]];
    
  }
  this.bottomPoints = bottomPoints(this);

  function leftPoints(el){
    if(el.orientation == 0)
      return [[0,0], [1,1], [2,1]];
    else if(el.orientation == 1)
      return [[0,0], [1,0], [2,0]];
    else if(el.orientation == 2)
      return [[2,0], [1,1], [0,1]];
    else 
      return [[0,2], [1,0], [2,2]];
  }
  this.leftPoints = leftPoints(this);

}

rotate = (currObj) => {
  // Do a rotation but don't update the grid. If the rotation does not create a collision, update the grid
  // If the rotation does create a collision, currObj.orientation--; and do nothing else
  if (!(currObj instanceof Square)) {

    currObj.orientation += 1;
    currObj.orientation %= 4;

    let blocked = false;
    blocked = checkShapeLeft(currObj);
    blocked = checkShapeRight(currObj);

    if (blocked) {
      currObj.orientation -= 1;
    } else {
      currObj.points = currObj.points[0].map((val, index) =>
        currObj.points.map((row) => row[index]).reverse()
      );
      updateColors(currObj);
    }
  }
};

removeRow = (row) => {
  printGrid();
  for (let x = row; x < row + 10; x++) {
    grid[x] = 0;
    removeColor(x);
  }
  for (let x = row; x >= 0; x -= 10) {
    for (let z = x; z < x + 10; z++) {
      grid[z] = grid[z - 10];
    }
  }

  // printGrid();

  // addColorHandler();
};

// Scan from left to right, bottom to top
// If any given row contains all 10 elements, pop the row and move everything above it down by one
checkCompleteRows = (currObj) => {
  let x = 90;
  while (x >= 0) {
    let rr = true;
    for (z = x; z < x + 10; z++) {
      if (grid[z] == 0) {
        rr = false;
        break;
      }
    }

    if (rr) {
      removeRow(x);
      x = 90;
    } else {
      x -= 10;
    }
  }
};

printGrid = () => {
  let str = "";
  let nextrow = 1;
  console.log("---------------");
  for (let i = 0; i < grid.length; i++) {
    str += grid[i] + ", ";
    if (nextrow == 10) {
      console.log(str);
      console.log("\n");
      str = "";
      nextrow = 0;
    }
    nextrow++;
  }
  console.log("---------------");
};

nextShape = (currObj) => {
  let allShapeLocations = [];

  // Update list of current absolute shape locations
  generateAllShapeLocations();
  

  const temp = new T();

  temp.bottomPoints.forEach(e => {
    const curBotPoint = temp.location + e[1] + e[0] * 10;

    if(allShapeLocations.includes(curBotPoint + 10)){
      console.log('game over');
      endgame();
    }
})



  const allShapes = [
    new T(),
    new Square(),
    
    new Line(),
    new S(),
    new Z(),
    
    new L(),
    new J(),
    
  ];

  // const shapeVal = Math.floor(Math.random() * 6);
  // if (typeof currObj !== 'undefined'){
  //   while(allShapes[shapeVal] instanceof currObj){
  //     shapeVal = Math.floor(Math.random() * 6);
  //   }
  // }
  // return allShapes[shapeVal];

  return new T();

};


currObj = nextShape();
allShapes.push(currObj);
updateColors(currObj);

const interval = 400;

let gameOver = false;

endgame = () => {
  clearInterval(runGame);
};

checkGameOver = (Obj) => {
  const collisionPoints = getBottomCollisionPoints(Obj);
  for (let i = 0; i < collisionPoints.length; i++) {
    const pointToCheck =
      Obj.location + collisionPoints[i][0] * 10 + collisionPoints[i][1];
    if (grid[pointToCheck + 10] == 1 || pointToCheck >= 90) {
      Obj.active = false;
      return true;
    }
  }
  return false;
};




let runGame = setInterval(() => {


  generateAllShapeLocations();
  


  allShapes.forEach(element => {




    // Check if bottom point(s) will go outside map
    if(element.active){
      element.bottomPoints.forEach(e => {
      
        const curBotPoint = element.location + e[1] + e[0] * 10;

        if(curBotPoint >= 90){
          element.active = false;
          
          currObj = nextShape();
          allShapes.push(currObj);
          updateColors(currObj);
        }

    })

    }

    // Check if the collision points will collide with another shape 
    element.bottomPoints.forEach(e => {
      const curBotPoint = element.location + e[1] + e[0] * 10;

      if(allShapeLocations.includes(curBotPoint + 10)){
        element.active = false;

        currObj = nextShape();
        allShapes.push(currObj);
        updateColors(currObj);
      }
  })

    // Move the shape down if it is active
    if(element.active){
      moveShapeDown(element);
    }





    




  });

  


  // if (currObj.active) {
  //   // moveShapeDown(currObj);
  // } else {
  //   checkCompleteRows(currObj);
  //   currObj = nextShape();
  //   allShapes.push(currObj);
  //   updateColors(currObj);
  //   gameOver = checkGameOver(currObj);

  //   if (gameOver) {
  //     endgame();
  //     console.log("game over");
  //   }
  // }
  // printGrid();
  document.onkeydown = checkKey;

  // Detect keypresses
  function checkKey(e) {
    removeAllColors(currObj);
    e = e || window.event;
    if (e.keyCode == "38") 
      rotate(currObj);
    else if (e.keyCode == "37") {
      console.log('go left!')
      moveShapeLeft(currObj);
    }

    else if (e.keyCode == "39") 
      moveShapeRight(currObj);
  }

}, interval);

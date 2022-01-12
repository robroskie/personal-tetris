const grid = [];
for (let i = 0; i < 100; i++) {
  grid[i] = 0;
}

removeColor = (point) => {
  grid[point] = 0;
  let row = Math.floor(point / 10);
  let col = (point % 10) + 1;
  const temp_add = ".grid-item" + (row + 1) + "-" + col;
  document.querySelector(temp_add).classList.remove("selected");
};

addColorHandler = () => {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] == 1) {
      addColor(i);
    } else {
      removeColor(i);
    }
  }
};

addColor = (point) => {
  grid[point] = 1;

  const row = Math.floor(point / 10);
  const col = (point % 10) + 1;

  const temp_add = ".grid-item" + (row + 1) + "-" + col;

  document.querySelector(temp_add).classList.add("selected");
};

updateColors = (Obj) => {
  const arr = Obj.points;

  for (let z = 0; z < arr.length; z++) {
    for (let i = 0; i < arr[z].length; i++) {
      if (arr[z][i] == 1) {
        addColor(Obj.location + z * 10 + i);
      }
    }
  }
};

removeAllColors = (Obj) => {
  const arr = Obj.points;

  for (let z = 0; z < arr.length; z++) {
    for (let i = 0; i < arr[z].length; i++) {
      if (arr[z][i] == 1) {
        const toRemove = Obj.location + z * 10 + i;

        removeColor(toRemove);
      }
    }
  }
};

checkCollisionPoints = (Obj) => {
  // const collisionPoints = Obj.getCollisionPoints();
  const collisionPoints = getBottomCollisionPoints(Obj);
  collisionPoints.forEach(function (part, index, arr) {
    const pointToCheck = Obj.location + arr[index][0] * 10 + arr[index][1];

    if (grid[pointToCheck + 10] == 1 || pointToCheck >= 90) {
      Obj.active = false;
    }
  });
};

moveShapeDown = (Obj) => {
  if (Obj.active) {
    removeAllColors(Obj);

    Obj.location += 10;

    updateColors(Obj);
  }
};

moveShapeLeft = (Obj) => {
  const leftColPoints = getLeftCollisionPoints(Obj);

  let blocked = false;
  leftColPoints.forEach(function (part, index, arr) {
    const pointToCheck = Obj.location + arr[index][0] * 10 + arr[index][1];

    if (grid[pointToCheck - 1] == 1 || pointToCheck % 10 == 0) {
      blocked = true;
    }
  });

  if (!blocked) {
    Obj.location -= 1;
    removeAllColors(Obj);

    updateColors(Obj);
  }
};

moveShapeRight = (Obj) => {
  const rightColPoints = getLeftCollisionPoints(Obj);
  console.log(rightColPoints);
  let blocked = false;
  rightColPoints.forEach(function (part, index, arr) {
    const pointToCheck = Obj.location + arr[index][0] * 10 + arr[index][1];

    if (grid[pointToCheck + 1] == 1 || pointToCheck % 10 == 9) {
      blocked = true;
    }
  });
  if (!blocked) {
    getRightCollisionPoints(Obj);
    Obj.location += 1;
    removeAllColors(Obj);

    updateColors(Obj);
  }
};

getLeftCollisionPoints = (Shape) => {
  const left_points = [];

  console.log(Shape.points.length);
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

  console.log(Shape.points.length);
  for (let i = 0; i < Shape.points.length; i++) {
    let found = false;
    for (let z = Shape.points[i].length; z >= 0 && !found; z--) {
      if (Shape.points[i][z] == 1) {
        console.log("pushing i, z=" + i + z);
        right_points.push([i, z]);
        found = true;
      }
    }
  }

  return right_points;
};

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

function testBlock() {
  this.location = 0;

  this.points = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  this.orientation = 0;

  // this.getCollisionPoints = function () {
  //   return [
  //     [1, 0],
  //     [1, 1],
  //     [1, 2],
  //     [1, 3],
  //     [1, 4],
  //     [1, 5],
  //     [1, 6],
  //     [1, 7],
  //     [1, 8],
  //     [1, 9],
  //   ];
  // };

  this.active = true;
}

function Line() {
  this.location = 4;

  this.points = [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  this.orientation = 0;

  // this.getCollisionPoints = function () {
  //   if (this.orientation == 0 || this.orientation == 2) {
  //     return [
  //       [0, 0],
  //       [0, 1],
  //       [0, 2],
  //       [0, 3],
  //     ];
  //   } else {
  //     return [[3, 3]];
  //   }
  // };

  this.active = true;
}

function S() {
  this.location = 4;

  this.points = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ];

  this.orientation = 0;

  // this.getCollisionPoints = function () {
  //   if (this.orientation == 0 || this.orientation == 2) {
  //     return [
  //       [1, 0],
  //       [1, 1],
  //       [0, 2],
  //     ];
  //   } else {
  //     return [
  //       [1, 1],
  //       [2, 2],
  //     ];
  //   }
  // };

  this.active = true;
}

function Z() {
  this.location = 4;

  this.points = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ];

  this.orientation = 0;

  // this.getCollisionPoints = function () {
  //   if (this.orientation == 0 || this.orientation == 2) {
  //     return [
  //       [0, 0],
  //       [1, 1],
  //       [1, 2],
  //     ];
  //   } else {
  //     return [
  //       [2, 1],
  //       [1, 2],
  //     ];
  //   }
  // };

  this.active = true;
}

function Square() {
  this.location = 4;

  this.points = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ];

  this.orientation = 0;

  // this.getCollisionPoints = function () {
  //   return [
  //     [1, 1],
  //     [1, 2],
  //   ];
  // };

  this.active = true;
}

function L() {
  this.location = 4;

  this.points = [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ];

  this.orientation = 0;

  // this.getCollisionPoints = function () {
  //   switch (this.orientation) {
  //     case 0:
  //       console.log("case 0");
  //       return [
  //         [0, 0],
  //         [0, 1],
  //         [1, 2],
  //       ];
  //       break;
  //     case 1:
  //       console.log("case 1");
  //       return [
  //         [2, 1],
  //         [2, 2],
  //       ];
  //       break;

  //     case 2:
  //       console.log("case 2");
  //       return [
  //         [2, 0],
  //         [2, 1],
  //         [2, 2],
  //       ];
  //       break;

  //     case 3:
  //       console.log("case 0");
  //       return [[2, 0]];
  //       break;
  //   }
  // };

  this.active = true;
}

function J() {
  this.location = 4;

  this.points = [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  this.orientation = 0;

  // this.getCollisionPoints = function () {
  //   switch (this.orientation) {
  //     case 0:
  //       console.log("case 0");
  //       return [
  //         [1, 0],
  //         [1, 1],
  //         [1, 2],
  //       ];
  //       break;
  //     case 1:
  //       console.log("case 1");
  //       return [
  //         [2, 1],
  //         [0, 2],
  //       ];
  //       break;

  //     case 2:
  //       console.log("case 2");
  //       return [
  //         [1, 0],
  //         [1, 1],
  //         [2, 2],
  //       ];
  //       break;

  //     case 3:
  //       console.log("case 0");
  //       return [
  //         [2, 0],
  //         [2, 1],
  //       ];
  //       break;
  //   }
  // };

  this.active = true;
}

function T() {
  this.location = 4;

  this.points = [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ];

  this.orientation = 0;

  // this.getCollisionPoints = function () {
  //   switch (this.orientation) {
  //     case 0:
  //       console.log("case 0");
  //       return [
  //         [0, 0],
  //         [2, 1],
  //         [0, 2],
  //       ];
  //       break;
  //     case 1:
  //       console.log("case 1");
  //       return [
  //         [1, 0],
  //         [1, 1],
  //         [2, 2],
  //       ];
  //       break;

  //     case 2:
  //       console.log("case 2");
  //       return [
  //         [2, 0],
  //         [2, 1],
  //         [2, 2],
  //       ];
  //       break;

  //     case 3:
  //       console.log("case 0");
  //       return [
  //         [2, 0],
  //         [1, 1],
  //         [1, 2],
  //       ];
  //       break;
  //   }
  // };

  this.active = true;
}

rotate = (currObj) => {
  if (!(currObj instanceof Square)) {
    console.log(`rotating `);
    currObj.orientation += 1;
    currObj.orientation %= 4;

    currObj.points = currObj.points[0].map((val, index) =>
      currObj.points.map((row) => row[index]).reverse()
    );
    updateColors(currObj);
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

  printGrid();

  addColorHandler();
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

currObj = new J();
updateColors(currObj);

let count = 0;

const interval = 200;

setInterval(() => {
  getBottomCollisionPoints(currObj);

  checkCollisionPoints(currObj);

  if (currObj.active) {
    moveShapeDown(currObj);
  } else {
    checkCompleteRows(currObj);
    currObj = new J();
  }

  document.onkeydown = checkKey;

  function checkKey(e) {
    removeAllColors(currObj);
    e = e || window.event;
    if (e.keyCode == "38") {
      rotate(currObj);
    } else if (e.keyCode == "40") {
      console.log("down press");
    } else if (e.keyCode == "37") {
      moveShapeLeft(currObj);
    } else if (e.keyCode == "39") {
      moveShapeRight(currObj);
    }
  }
}, interval);

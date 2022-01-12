let tiles = document.querySelectorAll("#tilemaster");

let grid = [];
for (let i = 0; i < 100; i++) {
  grid[i] = 0;
}

colorTestSquares = (ele1, ele2) => {
  let count = 0;
  tiles.forEach((t) => {
    t.innerHTML = grid[count];

    if (count == ele1 || count == ele2) {
      t.style.color = "magenta";
    } else {
      t.style.color = "pink";
    }
    count++;
  });
};

removeColor = (point) => {
  // console.log(`removing point ${point}`);
  grid[point] = 0;

  let row = Math.floor(point / 10);
  let col = (point % 10) + 1;
  const temp_add = ".grid-item" + (row + 1) + "-" + col;
  document.querySelector(temp_add).classList.remove("selected");
};

addColorHandler = () => {
  // console.log(`grid before adding colors ${grid}`);
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
  //  console.log('call');
  //  console.log(`arr${Obj.points} ${Obj.location}`)
  const arr = Obj.points;

  // Obj.points.forEach(function (part, index, arr){
  for (let z = 0; z < arr.length; z++) {
    for (let i = 0; i < arr[z].length; i++) {
      // console.log('element' + arr[z][i]);
      if (arr[z][i] == 1) {
        addColor(Obj.location + z * 10 + i);
        // switch (z) {
        //   case 0:
        //     addColor(Obj.location + i);
        //     break;
        //   case 1:
        //     addColor(Obj.location + 10 + i);
        //     break;
        //   case 2:
        //     addColor(Obj.location + 20 + i);
        //     break;
        //     case 3:
        //       addColor(Obj.location + 30 + i);
        //       break;
        //   default:
        //     break;
          // code block
        // }
      }
    }
  }
};

removeAllColors = (Obj) => {
  const arr = Obj.points;
  // Obj.points.forEach(function (part, index, arr){
  for (let z = 0; z < arr.length; z++) {
    for (let i = 0; i < arr[z].length; i++) {
      // console.log("element" + arr[z][i]);
      if (arr[z][i] == 1) {
        const toRemove = Obj.location + z * 10 + i;
        // console.log(`to remove=${toRemove}`);
        removeColor(toRemove);
      }
    }
  }
};

addShapeColors = (Obj) => {
  //  console.log('call');
  //  console.log(`arr${Obj.points} ${Obj.location}`)
  const arr = Obj.points;
  // Obj.points.forEach(function (part, index, arr){
  for (let z = 0; z < arr.length; z++) {
    for (let i = 0; i < arr[z].length; i++) {
      console.log('addcolor to' + Obj.location + z * 10 + i);
      if (arr[z][i] == 1) {
        addColor(Obj.location + z * 10 + i);
        // switch (z) {
        //   case 0:
        //     addColor(Obj.location + i);
        //     break;
        //   case 1:
        //     addColor(Obj.location + 10 + i);
        //     break;
        //   case 2:
        //     addColor(Obj.location + 20 + i);
        //   case 3:
        //     addColor(Obj.location + 30 + i);
        //   default:
        //     break;
        //   // code block
      }
    }
  }
};

checkCollisionPoints = (Obj) => {
  const collisionPoints = Obj.getCollisionPoints();
  console.log(collisionPoints);
  // if (Obj instanceof Square) {
  console.log("check");
  collisionPoints.forEach(function (part, index, arr) {
    const pointToCheck = Obj.location + arr[index][0] * 10 + arr[index][1];
    console.log(
      `Obj.location=${Obj.location}    arr[index][0] * 10 = ${
        arr[index][0] * 10
      }  arr[index][1] = ${arr[index][1]}  pointToCheck = ${pointToCheck}`
    );
    if (grid[pointToCheck + 10] == 1 || pointToCheck >= 90) {
      console.log("freeeeze");
      Obj.active = false;
    }
  });
};

// checkShapeFreeze = (Obj) => {
//   const collisionPoints = Obj.getCollisionPoints();
//   collisionPoints.forEach(function (part, index, arr) {
//     // console.log(`checking ${Obj.location }`)
//     const pointToCheck = Obj.location + arr[index][0] * 10 + arr[index][1];
//     // console.log(`point to check is: ${pointToCheck}`);
//     if (grid[pointToCheck + 10] == 1 || pointToCheck >= 90) {
//       console.log('collision');
//       Obj.active = false;
//       // checkCompleteRows(Obj);
//     }
//   });
// };

moveShapeDown = (Obj) => {
  console.log(Obj.points);
  // checkShapeFreeze(Obj);
  if (Obj.active) {
    // console.log("still active");
    removeAllColors(Obj);

    Obj.location += 10;

    updateColors(Obj);
  }
};

moveShapeLeft = (Obj) => {
  Obj.location -= 1;
  removeAllColors(Obj);

  updateColors(Obj);

  // Obj.addColors();
};

moveShapeRight = (Obj) => {
  Obj.location += 1;
  removeAllColors(Obj);

  updateColors(Obj);
};

function testBlock() {
  this.location = 0;

  this.points = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  this.orientation = 0;

  this.getCollisionPoints = function () {
    return [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [1, 8],
      [1, 9],
    ];
  };





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

  this.getCollisionPoints = function () {
    if (this.orientation == 0 || this.orientation == 2) {
      return [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ];
    } else {
      return [
        [3, 3],
      ];
    }
  };




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

  this.getCollisionPoints = function () {
    if(this.orientation == 0 || this.orientation == 2){
      return [[1,0],[1,1],[0,2]]
    }
    else{
      return [[1,1],[2,2]]
    }
  };





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

  this.getCollisionPoints = function () {
    if(this.orientation == 0 || this.orientation == 2){
      return [[0,0],[1,1],[1,2]]
    }
    else{
      return [[2,1],[1,2]]
    }
  };





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

  this.getCollisionPoints = function () {
    return [
      [1, 1],
      [1, 2],
    ];
  };





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

  this.getCollisionPoints = function () {
    switch (this.orientation) {
      case 0:
        console.log("case 0");
        return [
          [0, 0],
          [0, 1],
          [1, 2],
        ];
        break;
      case 1:
        console.log("case 1");
        return [
          [2, 1],
          [2, 2],
        ];
        break;

      case 2:
        console.log("case 2");
        return [
          [2, 0],
          [2, 1],
          [2, 2],
        ];
        break;

      case 3:
        console.log("case 0");
        return [[2, 0]];
        break;
    }
  };





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

  this.getCollisionPoints = function () {
    switch (this.orientation) {
      case 0:
        console.log("case 0");
        return [
          [1, 0],
          [1, 1],
          [1, 2],
        ];
        break;
      case 1:
        console.log("case 1");
        return [
          [2, 1],
          [0, 2],
        ];
        break;

      case 2:
        console.log("case 2");
        return [
          [1, 0],
          [1, 1],
          [2, 2],
        ];
        break;

      case 3:
        console.log("case 0");
        return [[2, 0],[2,1]];
        break;
    }
  };





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

  this.getCollisionPoints = function () {
    switch (this.orientation) {
      case 0:
        console.log("case 0");
        return [
          [0, 0],
          [2, 1],
          [0, 2],
        ];
        break;
      case 1:
        console.log("case 1");
        return [
          [1, 0],
          [1, 1],
          [2, 2],
        ];
        break;

      case 2:
        console.log("case 2");
        return [
          [2, 0],
          [2, 1],
          [2, 2],
        ];
        break;

      case 3:
        console.log("case 0");
        return [
          [2, 0],
          [1, 1],
          [1, 2],
        ];
        break;
    }
  };





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
    addShapeColors(currObj);
    // currObj.addColors();
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
  console.log(`new grid is `);
  printGrid();

  addColorHandler();

  // setTimeout(alert("4 seconds"), 4000);
};

// Scan from left to right, bottom to top
// If any given row contains all 10 elements, pop the row and move everything above it down by one
checkCompleteRows = (currObj) => {
  console.log("checking complete rows");
  let x = 90;
  while (x >= 0) {
    console.log(`x is ${x}`);
    let rr = true;
    for (z = x; z < x + 10; z++) {
      //   console.log(`checking row ${x} and element ${z} with grid[z]=${grid[z]} with currObj = ${currObj.active}`)

      if (grid[z] == 0) {
        rr = false;

        break;
      }
    }

    if (rr) {
      console.log(`remove row ${x}`);
      removeRow(x);
      x = 90;
    } else {
      x -= 10;
    }
  }
};

currObj = new J();
addShapeColors(currObj);
// currObj.addColors();

const container = document.querySelectorAll(".container");

let count = 0;

const interval = 200;

setInterval(() => {
  checkCollisionPoints(currObj);

  if (currObj.active) {
    moveShapeDown(currObj);
  } else {
    checkCompleteRows(currObj);
    currObj = new J();
  }
  // printGrid();

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


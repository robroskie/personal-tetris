let tiles = document.querySelectorAll("#tilemaster");
let spawnNextEle = true;

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



let element = 1;
const shapes = ["line", "square", "L", "T", "open"];

let grid = [];
for (let i = 0; i < 100; i++) {
  grid[i] = 0;
}

// addColor = (...values) => {
//   if (values[2] != null) {
//     let row = values[0];
//     let col = values[1];
//     let idx = values[2];

//     //Add to current element
//     if (row == null) {
//       let row = Math.floor(idx / 10);
//       let col = (idx % 10) + 1;
//       const temp_add = ".grid-item" + (row + 1) + "-" + col;
//       grid[idx] = 1;
//       document.querySelector(temp_add).classList.add("selected");
//     }

//     //Add to element one row below
//     else {
//       const temp_add = ".grid-item" + row + "-" + col;
//       grid[idx + 10] = 1;
//       document.querySelector(temp_add).classList.add("selected");
//     }
//   }

removeColor = (point) => {
  console.log(`removing point ${point}`);
  grid[point] = 0;

  let row = Math.floor(point / 10);
  let col = (point % 10) + 1;
  const temp_add = ".grid-item" + (row + 1) + "-" + col;
  document.querySelector(temp_add).classList.remove("selected");
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
        switch (z) {
          case 0:
            addColor(Obj.location + i);
            break;
          case 1:
            addColor(Obj.location + 10 + i);
            break;
          case 2:
            addColor(Obj.location + 20 + i);
            break;
          default:
            break;
          // code block
        }
      }
    }
  }
};

removeAllColors = (Obj) => {
  removeColor(Obj.location);
  removeColor(Obj.location + 1);
  removeColor(Obj.location + 2);
  removeColor(Obj.location + 10);
  removeColor(Obj.location + 11);
  removeColor(Obj.location + 12);
  removeColor(Obj.location + 20);
  removeColor(Obj.location + 21);
  removeColor(Obj.location + 22);
};

addShapeColors = (Obj) => {
  //  console.log('call');
  //  console.log(`arr${Obj.points} ${Obj.location}`)
  const arr = Obj.points;
  // Obj.points.forEach(function (part, index, arr){
  for (let z = 0; z < arr.length; z++) {
    for (let i = 0; i < arr[z].length; i++) {
      // console.log('element' + arr[z][i]);
      if (arr[z][i] == 1) {
        switch (z) {
          case 0:
            addColor(Obj.location + i);
            break;
          case 1:
            addColor(Obj.location + 10 + i);
            break;
          case 2:
            addColor(Obj.location + 20 + i);
          default:
            break;
          // code block
        }
      }
    }
  }

  // addColor(null, null, arr[index]);

  //   console.log("adding colors");
  // Obj.allPoints.forEach(function (part, index, arr) {
  // addColor(null, null, arr[index]);
  // });

  // Obj.points.forEach(function (part, index, arr){
  //   addColor(null, null, arr[index]);

  // })
};

checkCollisionPoints = (Obj) => {
  const collisionPoints = Obj.getCollisionPoints();
  collisionPoints.forEach(function (part, index, arr) {
    // console.log(`checking ${Obj.location }`)
    const pointToCheck = Obj.location + arr[index][0] * 10 + arr[index][1];
    // console.log(`point to check is: ${pointToCheck}`);
    if (grid[pointToCheck + 10] == 1) {
      // console.log('collision');
      Obj.active = false;
      return false;
      // checkCompleteRows(Obj);
    }
  });
  return true;
}

checkShapeFreeze = (Obj) => {
  if (Obj instanceof testBlock) {
    Obj.allPoints.forEach(function (part, index, arr) {
      if (grid[arr[index] + 10] == 1 || arr[index] + 10 > 99) {
        console.log("shape freeze");
        Obj.active = false;
      }
    });
  } else if (Obj instanceof square) {
    // console.log("checking square downwards movement");
    Obj.bottomPoints.forEach(function (part, index, arr) {
      if (grid[arr[index] + 10] == 1 || arr[index] + 10 > 99) {
        // console.log("shape freeze");
        Obj.active = false;
        checkCompleteRows(Obj);
      }
    });
  } else if (Obj instanceof T) {
    // console.log("checking square downwards movement");
    // Obj.bottomPoints.forEach(function (part, index, arr) {
    //   if (grid[arr[index] + 10] == 1 || arr[index] + 10 > 99) {
    //     console.log("shape freeze");
    //     Obj.active = false;
    //     checkCompleteRows(Obj);
    //   }
    // });
    const collisionPoints = Obj.getCollisionPoints();
    collisionPoints.forEach(function (part, index, arr) {
      // console.log(`checking ${Obj.location }`)
      const pointToCheck = Obj.location + arr[index][0] * 10 + arr[index][1];
      console.log(`point to check is: ${pointToCheck}`);
      if (grid[pointToCheck + 10] == 1 || pointToCheck >= 90) {
        // console.log('collision');
        Obj.active = false;
        // checkCompleteRows(Obj);
      }
    });
  }
};
moveShapeDown = (Obj) => {
  checkShapeFreeze(Obj);
  if(Obj.active){
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
  this.point1 = 0;
  this.point2 = 1;
  this.point3 = 2;
  this.point4 = 3;
  this.point5 = 4;
  this.point6 = 5;
  this.point7 = 6;
  this.point8 = 7;
  this.point9 = 8;
  this.point10 = 9;

  this.allPoints = [
    this.point1,
    this.point2,
    this.point3,
    this.point4,
    this.point5,
    this.point6,
    this.point7,
    this.point8,
    this.point9,
    this.point10,
  ];

  this.addColors = function () {
    addShapeColors(this);
  };

  this.moveDown = function () {
    moveShapeDown(this);
  };

  this.active = true;
  // this.selected = true;
}

function testBlock2() {
  this.point1 = 0;
  this.point2 = 1;
  this.point3 = 2;
  this.point4 = 3;
  this.point5 = 4;
  this.point6 = 5;
  this.point7 = 6;
  this.point8 = 7;
  this.point9 = 8;
  this.point10 = 9;
  this.point11 = 10;
  this.point12 = 11;
  this.point13 = 12;
  this.point14 = 13;
  this.point15 = 14;
  this.point16 = 15;
  this.point17 = 16;
  this.point18 = 17;
  this.point19 = 18;
  this.point20 = 19;

  this.allPoints = [
    this.point1,
    this.point2,
    this.point3,
    this.point4,
    this.point5,
    this.point6,
    this.point7,
    this.point8,
    this.point9,
    this.point10,
    this.point11,
    this.point12,
    this.point13,
    this.point14,
    this.point15,
    this.point16,
    this.point17,
    this.point18,
    this.point19,
    this.point20,
  ];

  this.bottomPoints = [
    this.point11,
    this.point12,
    this.point13,
    this.point14,
    this.point15,
    this.point16,
    this.point17,
    this.point18,
    this.point19,
    this.point20,
  ];

  this.addColors = function () {
    addShapeColors(this);
  };

  this.moveDown = function () {
    moveShapeDown(this);
  };

  this.active = true;
  // this.selected = true;
}

function square() {
  // this.point1 = 5;
  // this.point2 = this.point1 + 1;
  // this.point3 = this.point1 + 10;
  // this.point4 = this.point1 + 11;

  // this.allPoints = [this.point1, this.point2, this.point3, this.point4];

  // this.bottomPoints = [this.point3, this.point4];

  this.addColors = function () {
    addShapeColors(this);
  };

  this.moveDown = function () {
    moveShapeDown(this);
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

  // this.point1 = 4;
  // this.point2 = 5;
  // this.point3 = 6;
  // this.point4 = this.point2 + 10;
  // this.point5 = this.point2 + 20;

  // this.allPoints = [
  //   this.point1,
  //   this.point2,
  //   this.point3,
  //   this.point4,
  //   this.point5,
  // ];

  // this.bottomPoints = [this.point1, this.point3, this.point5];

  this.addColors = function () {
    addShapeColors(this);
  };

  this.moveDown = function () {
    moveShapeDown(this);
  };

  // this.initLowest = function () {
  //   this.bottomPoints = [
  //     this.allPoints[0],
  //     this.allPoints[2],
  //     this.allPoints[4],
  //   ];
  // };

  // this.rotate = function () {
  //   this.points[0].map((val, index) =>
  //     this.points.map((row) => row[index]).reverse()
  //   );
  // addShapeColors(this);
  // console.log(`this.points=${this.points}`);
  // };

  this.active = true;
}

function L(point1) {
  this.point1 = point1;
  addColor(null, null, point1);

  this.point2 = this.point1 - 1;
  addColor(null, null, this.point2);

  this.point3 = this.point1 - 2;
  addColor(null, null, this.point3);

  this.point4 = this.point1 - 12;
  addColor(null, null, this.point4);

  this.orientation = 0;

  this.active = true;

  this.lowest1 = this.point1;

  this.selected = true;
}

function Line(point1) {
  this.point1 = point1;
  addColor(null, null, point1);

  this.point2 = this.point1 + 10;
  addColor(null, null, this.point2);

  this.point3 = this.point1 + 20;
  addColor(null, null, this.point3);

  this.point4 = this.point1 + 30;
  addColor(null, null, this.point4);

  this.orientation = 0;

  this.active = true;

  this.lowest1 = this.point4;

  this.selected = true;
}

function Open(point1) {
  this.point1 = point1;
  addColor(null, null, point1);

  this.point2 = this.point1 + 10;
  addColor(null, null, this.point2);

  this.point3 = this.point1 + 11;
  addColor(null, null, this.point3);

  this.point4 = this.point1 + 21;
  addColor(null, null, this.point4);

  this.orientation = 0;

  this.lowest1 = this.point4;

  this.active = true;

  this.selected = true;
}

let currObjects;
let objects = [];

rotate = (currObj) => {
  console.log(`rotating `);
  currObj.orientation += 1;
  currObj.orientation %= 4;

  // currObj.points[0].map((val, index) =>
  //   currObj.points.map((row) => row[index]).reverse()
  // );

  currObj.points = currObj.points[0].map((val, index) => currObj.points.map(row => row[index]).reverse())

  currObj.addColors();

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
  for (x = row; x < row + 10; x++) {
    grid[x] = 0;
    removeColor(x);

    setInterval(() => {}, 300);
  }
};

// Scan from left to right, bottom to top
// If any given row contains all 10 elements, pop the row and move everything above it down by one
checkCompleteRows = (currObj) => {
  console.log("checking complete rows");
  for (let x = 90; x >= 0; x -= 10) {
    let rr = true;
    for (z = x; z < x + 10; z++) {
      //   console.log(`checking row ${x} and element ${z} with grid[z]=${grid[z]} with currObj = ${currObj.active}`)

      if (grid[z] == 0) {
        rr = false;
        break;
      }
    }
    if (rr) {
      //   console.log(`remove row ${z}`);
      removeRow(x);
    }
  }
};

currObj = new T();
currObj.addColors();

const container = document.querySelectorAll(".container");

let count = 0;

const interval = 200;

setInterval(() => {
  checkShapeFreeze(currObj);

  if (currObj.active) {
    moveShapeDown(currObj);
    
  } else {
    currObj = new T();
  }

  document.onkeydown = checkKey;

  function checkKey(e) {
    removeAllColors(currObj);
    e = e || window.event;
    if (e.keyCode == "38") {
      rotate(currObj);
    } else if (e.keyCode == "40") {
      // console.log('lol');
    } else if (e.keyCode == "37") {
      moveShapeLeft(currObj);
    } else if (e.keyCode == "39") {
      moveShapeRight(currObj);
    }
  }
}, interval);

changeColorObj = (obj) => {
  let x_count = 1;
  let y_count = 1;

  let arr_values = Object.values(obj);

  for (let i = 0; i < arr_values.length - 1; i += 2) {
    //let temp_add = `.grid-item${arr_values[i]}-${arr_values[i+1]}`;
    const temp_add = ".grid-item" + arr_values[i] + "-" + arr_values[i + 1];
    document.querySelector(temp_add).classList.add("selected");
  }
};

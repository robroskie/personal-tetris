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

const orientation = ["Normal", "Left", "Top", "Right"];

let element = 1;
const shapes = ["line", "square", "L", "T", "open"];

let grid = [];
for (let i = 0; i < 100; i++) {
  grid[i] = 0;
}

removeColor = (idx) => {
  if (idx != null) {
    grid[idx] = 0;
    let row = Math.floor(idx / 10);
    let col = (idx % 10) + 1;
    const temp_add = ".grid-item" + (row + 1) + "-" + col;
    document.querySelector(temp_add).classList.remove("selected");
  }
};

addColor = (...values) => {
  if (values[2] != null) {
    let row = values[0];
    let col = values[1];
    let idx = values[2];

    //Add to current element
    if (row == null) {
      let row = Math.floor(idx / 10);
      let col = (idx % 10) + 1;
      const temp_add = ".grid-item" + (row + 1) + "-" + col;
      grid[idx] = 1;
      document.querySelector(temp_add).classList.add("selected");
    }

    //Add to element one row below
    else {
      const temp_add = ".grid-item" + row + "-" + col;
      grid[idx + 10] = 1;
      document.querySelector(temp_add).classList.add("selected");
    }
  }
};

addShapeColors = (Obj) => {
  //   console.log("adding colors");
  Obj.allPoints.forEach(function (part, index, arr) {
    addColor(null, null, arr[index]);
  });
};

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
        console.log("shape freeze");
        Obj.active = false;
        checkCompleteRows(Obj);
      }
    });
  } else if (Obj instanceof T) {
    // console.log("checking square downwards movement");
    Obj.bottomPoints.forEach(function (part, index, arr) {
      if (grid[arr[index] + 10] == 1 || arr[index] + 10 > 99) {
        console.log("shape freeze");
        Obj.active = false;
        checkCompleteRows(Obj);
      }
    });
  }
};

moveShapeDown = (Obj) => {
  Obj.allPoints.forEach(function (part, index, arr) {
    removeColor(arr[index]);
    arr[index] += 10;
  });
  Obj.bottomPoints.forEach(function (part, index, arr) {
    removeColor(arr[index]);
    arr[index] += 10;
  });
  Obj.addColors();
};

moveShapeLeft = (Obj) => {
  Obj.allPoints.forEach(function (part, index, arr) {
    removeColor(arr[index]);
    arr[index] -= 1;
  });
  Obj.bottomPoints.forEach(function (part, index, arr) {
    removeColor(arr[index]);
    arr[index] -= 1;
  });
  Obj.addColors();
};

moveShapeRight = (Obj) => {
  Obj.allPoints.forEach(function (part, index, arr) {
    removeColor(arr[index]);
    arr[index] += 1;
  });
  Obj.bottomPoints.forEach(function (part, index, arr) {
    removeColor(arr[index]);
    arr[index] += 1;
  });
  Obj.addColors();
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
  this.point1 = 5;
  this.point2 = this.point1 + 1;
  this.point3 = this.point1 + 10;
  this.point4 = this.point1 + 11;

  this.allPoints = [this.point1, this.point2, this.point3, this.point4];

  this.bottomPoints = [this.point3, this.point4];

  this.addColors = function () {
    addShapeColors(this);
  };

  this.moveDown = function () {
    moveShapeDown(this);
  };

  this.active = true;
}

function T() {
  this.point1 = 4;
  this.point2 = 5;
  this.point3 = 6;
  this.point4 = this.point2 + 10;
  this.point5 = this.point2 + 20;

  this.allPoints = [
    this.point1,
    this.point2,
    this.point3,
    this.point4,
    this.point5,
  ];

  this.bottomPoints = [this.point1, this.point3, this.point5];

  this.addColors = function () {
    addShapeColors(this);
  };

  this.moveDown = function () {
    moveShapeDown(this);
  };

  this.initLowest = function () {
    this.bottomPoints = [this.allPoints[0], this.allPoints[2], this.allPoints[4]];
  };

  this.active = true;
  this.orientation = 0;
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

modify = (element, value) => {
  removeColor(element);
  element += value;
  addColor(null, null, element);
};

drawT = (element) => {
  switch (element.orientation) {
    case 0:
      removeColor(element.point4);
      element.point4 += 2;
      addColor(null, null, element.point4);
      removeColor(element.point2);
      element.point2 += 9;
      addColor(null, null, element.point2);
      break;

    case 1:
      removeColor(element.point2);
      element.point2 -= 9;
      addColor(null, null, element.point2);
      break;

    case 2:
      removeColor(element.point1);
      element.point1 -= 11;
      addColor(null, null, element.point1);
      break;

    case 3:
      removeColor(element.point1);
      element.point1 += 11;
      addColor(null, null, element.point1);
      removeColor(element.point4);
      element.point4 -= 2;
      addColor(null, null, element.point4);
      break;
  }
};

drawL = (element) => {
  // console.log(`element.point1: ${element.point1}   element.point2: ${element.point2}   element.point3: ${element.point3}    element.point4: ${element.point4}`);
  switch (element.orientation) {
    case 1:
      removeColor(element.point2);
      element.point2 -= 9;
      addColor(null, null, element.point2);
      removeColor(element.point3);
      element.point3 -= 17;
      addColor(null, null, element.point3);
      removeColor(element.point4);
      element.point4 -= 8;
      addColor(null, null, element.point4);
      break;

    case 2:
      break;
  }
  // console.log(`element.point1: ${element.point1}   element.point2: ${element.point2}   element.point3: ${element.point3}    element.point4: ${element.point4}`);
};

drawLine = (element) => {
  // console.log("rotating line")
};

rotate = (currObj) => {



  currObj.orientation += 1;
  currObj.orientation %= 4;

  console.log(`currObj is ${currObj.orientation}`);
  
  if (currObj instanceof T) {
    console.log("rotate T");
    if (currObj.orientation == 1) {
      console.log('rotating');
      removeColor(currObj.allPoints[3]);
      removeColor(currObj.allPoints[4]);
      currObj.allPoints[3] -= 19;
      currObj.allPoints[4] -= 9;

      currObj.bottomPoints = [currObj.allPoints[0], currObj.allPoints[1], currObj.allPoints[4]];

      console.log(currObj.allPoints);
    }

    else if (currObj.orientation == 2) {

      removeColor(currObj.allPoints[0]);
      removeColor(currObj.allPoints[2]);
      removeColor(currObj.allPoints[3]);
      removeColor(currObj.allPoints[4]);
      removeColor(currObj.allPoints[5]);

      let temp = currObj.allPoints[2]

      currObj.allPoints[2] = currObj.allPoints[0];
      currObj.allPoints[0] = temp;
      currObj.allPoints[3] -= 1;
      currObj.allPoints[4] -= 31;

      currObj.bottomPoints = [currObj.allPoints[0], currObj.allPoints[1], currObj.allPoints[2]];
    }

    else if (currObj.orientation == 3) {

      removeColor(currObj.allPoints[0]);
      removeColor(currObj.allPoints[2]);

      currObj.allPoints[0] -= 10;
      currObj.allPoints[2] -= 9;

      currObj.bottomPoints = [currObj.allPoints[1]];
    }

    else if (currObj.orientation == 0) {

      removeColor(currObj.allPoints[0]);
      removeColor(currObj.allPoints[1]);
      removeColor(currObj.allPoints[2]);
      removeColor(currObj.allPoints[3]);
      removeColor(currObj.allPoints[4]);
      removeColor(currObj.allPoints[5]);

      let temp = currObj.allPoints[0]

      currObj.allPoints[0] = currObj.allPoints[3];
      // currObj.allPoints[3] = temp;
      // currObj.allPoints[1] = currObj.allPoints[2];
      // currObj.allPoints[0] = currObj.allPoints[3];
      // currObj.allPoints[4] += 31;

      currObj.bottomPoints = [currObj.allPoints[4]];
    }


    currObj.addColors();
  
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
    currObj.moveDown();
  } else {
    currObj = new T();
  }

  document.onkeydown = checkKey;

  function checkKey(e) {
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

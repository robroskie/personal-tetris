let tiles = document.querySelectorAll('#tilemaster');
let spawnNextEle = true;

colorTestSquares = (ele1, ele2) => {
    let count = 0;
    tiles.forEach(t => {
        t.innerHTML = grid[count];
    
        if(count == ele1 || count == ele2){
            t.style.color = 'magenta';
        }
        else{
            t.style.color = 'pink';
        }
        count++;
    });
}




const interval = 200;

const orientation = ['Normal','Left','Top','Right'];

let element = 1;
const shapes = ['line', 'square', 'L', 'T', 'open'];

let grid = [];
for(let i = 0; i < 100; i++){
    grid[i] = 0;
} 


removeColor = idx => {
    if(idx != null){
        grid[idx] = 0;
        let row = Math.floor(idx / 10);
        let col = idx % 10 + 1;
        const temp_add = ".grid-item" + (row+1) + "-" + col;
        document.querySelector(temp_add).classList.remove("selected");
    }
}

addColor = (...values) => {
    if(values[2] != null) {
        let row = values[0]; let col = values[1]; let idx =values[2];
     
        //Add to current element
        if(row == null){
            let row = Math.floor(idx / 10);
            let col = idx % 10 + 1;
            const temp_add = ".grid-item" + (row + 1) + "-" + col;
            grid[idx] = 1;
            document.querySelector(temp_add).classList.add("selected");
        }

        //Add to element one row below
        else{
            const temp_add = ".grid-item" + row + "-" + col;
            grid[idx + 10] = 1;
            document.querySelector(temp_add).classList.add("selected");
        }
    }
}

addShapeColors = (Obj) => {
    console.log('adding colors');
    Obj.allPoints.forEach(function(part, index, arr) {
        addColor(null, null, arr[index]);
    });
}

moveShapeDown = (Obj) => {
    console.log('adding colors');
    Obj.allPoints.forEach(function(part, index, arr) {
        removeColor(arr[index]);
        arr[index] += 10;
    });
    Obj.addColors();
}

function testBlock(){
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

    this.allPoints = [this.point1, this.point2, this.point3, this.point4, this.point5, this.point6, this.point7, this.point8, this.point9, this.point10];

    this.addColors = function() {
        addShapeColors(this);
    };
    
    this.moveDown = function() {
        moveShapeDown(this);
    };



    this.active = true;
    this.selected = true;
};

function square(point1) {
    this.point1 = point1; 
    addColor(null,null,point1);

    this.point2 = this.point1 + 1;
    addColor(null,null,this.point2);

    this.point3 = this.point1 + 10;
    addColor(null,null,this.point3);

    this.point4 = this.point1 + 11;
    addColor(null,null,this.point4);

    this.lowest1 = this.point3;
    this.lowest2 = this.point4;

    this.active = true;
    this.selected = true;
};

function T(point1) {
    this.point1 = point1; 
    addColor(null,null,point1);

    this.point2 = this.point1 - 11;
    addColor(null,null,this.point2);

    this.point3 = this.point1 - 10;
    addColor(null,null,this.point3);

    this.point4 = this.point1 - 9;
    addColor(null,null,this.point4);
    
    this.orientation = 0;

    this.active = true;

    this.lowest1 = this.point1;

    this.selected = true;
}

function L(point1) {
    this.point1 = point1; 
    addColor(null,null,point1);

    this.point2 = this.point1 - 1;
    addColor(null,null,this.point2);

    this.point3 = this.point1 - 2;
    addColor(null,null,this.point3);

    this.point4 = this.point1 - 12;
    addColor(null,null,this.point4);

    this.orientation = 0;

    this.active = true;

    this.lowest1 = this.point1;

    this.selected = true;
}

function Line(point1) {
    this.point1 = point1; 
    addColor(null,null,point1);

    this.point2 =this.point1 + 10;
    addColor(null,null,this.point2);

    this.point3 = this.point1 + 20;
    addColor(null,null,this.point3);

    this.point4 = this.point1 + 30;
    addColor(null,null,this.point4);    

    this.orientation = 0;

    this.active = true;

    this.lowest1 = this.point4;

    this.selected = true;
}

function Open(point1) {
    this.point1 = point1; 
    addColor(null,null,point1);

    this.point2 = this.point1 + 10;
    addColor(null,null,this.point2);

    this.point3 = this.point1 + 11;
    addColor(null,null,this.point3);

    this.point4 = this.point1 + 21;
    addColor(null,null,this.point4); 

    this.orientation = 0;

    this.lowest1 = this.point4;

    this.active = true;

    this.selected = true;
}



let currObjects;
let objects = [];


modify = (element, value) => {
    // console.log("trig");
    removeColor(element); 
    element += value; 
    addColor(null,null,element); 
}

drawT = (element) => {
    switch(element.orientation) {
        case 0: removeColor(element.point4); element.point4 += 2; addColor(null,null,element.point4); 
        removeColor(element.point2); element.point2 += 9; addColor(null,null,element.point2);   
        break;
        
        case 1: removeColor(element.point2); element.point2 -= 9; addColor(null,null,element.point2);   
        break;

        case 2: removeColor(element.point1); element.point1 -= 11; addColor(null,null,element.point1);   
        break;

        case 3: removeColor(element.point1); element.point1 += 11; addColor(null,null,element.point1);   
        removeColor(element.point4); element.point4 -= 2; addColor(null,null,element.point4);   
        break;
    }
}

drawL = (element) => {
    // console.log(`element.point1: ${element.point1}   element.point2: ${element.point2}   element.point3: ${element.point3}    element.point4: ${element.point4}`);
    switch(element.orientation) {
        case 1: removeColor(element.point2); element.point2 -= 9; addColor(null,null,element.point2); 
        removeColor(element.point3); element.point3 -= 17; addColor(null,null,element.point3);   
        removeColor(element.point4); element.point4 -= 8; addColor(null,null,element.point4); 
        break;

        case 2: 
        break;
    }
    // console.log(`element.point1: ${element.point1}   element.point2: ${element.point2}   element.point3: ${element.point3}    element.point4: ${element.point4}`);
}

drawLine = (element) => {
    // console.log("rotating line")
}

rotate = (currObj) => {

    
    currObj.orientation = currObj.orientation + 1;
    if(currObj.orientation >= 4)
        currObj.orientation = 0;

    if(currObj instanceof T) {
        drawT(element); 
        // console.log("rotate T");
    }
    else if(currObj instanceof L) {
        drawL(element); 
        // console.log("rotate L");
    }
    else if(currObj instanceof Line){
        alert('draw line');
        drawL(element);
    }

    
}



moveLeft = () => {


    // console.log( "**********");
    let element = currObj;

    //Check bounds and that element is not frozen
    if(element.point1 % 10 != 0 && element.point2 % 10 != 0 && element.point3 % 10 != 0 && element.point4 % 10 != 0 && element.active == true) {
        // console.log(`check for ${element.point1}     ${element.point2}      ${element.point3}     ${element.point4}`);
        element.lowest1--;
        element.lowest2--;
        
        if(element.point1 != null)
            removeColor(element.point1);
        if(element.point2 != null)
            removeColor(element.point2);
        if(element.point3 != null)
            removeColor(element.point3);
        if(element.point4 != null)    
            removeColor(element.point4);

        if(element.point1 != null)   
            // console.log('element.point1 before:' + element.point1); 
            element.point1 -= 1;
            // console.log('element.point1 after:' + element.point1); 
        if(element.point2 != null)    
            element.point2 -= 1;
        if(element.point3 != null)
            element.point3 -= 1;
        if(element.point4 != null) 
            element.point4 -= 1;

        if(element.point1 != null)
            addColor(null,null,element.point1);
        if(element.point2 != null)
            addColor(null,null,element.point2);
        if(element.point3 != null)
            addColor(null,null,element.point3);
        if(element.point4 != null) 
            addColor(null,null,element.point4);
    }
}  



moveRight = () => {
   
    // console.log("**********");
    let element = currObj;

    if(element.point1 % 10 != 9 && element.point2 % 10 != 9 && element.point3 % 10 != 9 && element.point4 % 10 != 9 && element.active == true) {
        // console.log(`check for ${element.point1}     ${element.point2}      ${element.point3}     ${element.point4}`);
        element.lowest1++;
        element.lowest2++;

        if(element.point1 != null)
            removeColor(element.point1);
        if(element.point2 != null)
            removeColor(element.point2);
        if(element.point3 != null)
            removeColor(element.point3);
        if(element.point4 != null)    
            removeColor(element.point4);

        if(element.point1 != null)    
            element.point1 += 1;
        if(element.point2 != null)    
            element.point2 += 1;
        if(element.point3 != null)
            element.point3 += 1;
        if(element.point4 != null) 
            element.point4 += 1;

        if(element.point1 != null)
            addColor(null,null,element.point1);
        if(element.point2 != null)
            addColor(null,null,element.point2);
        if(element.point3 != null)
            addColor(null,null,element.point3);
        if(element.point4 != null) 
            addColor(null,null,element.point4);
        
}}       

printGrid = () => {
    let str = "";
    let nextrow = 1;
    console.log("---------------");
    for(let i = 0; i < grid.length; i++){
        str += grid[i] + ", ";
        if(nextrow == 10){
            console.log(str);
            console.log("\n");
            str = "";
            nextrow = 0;
        }
        nextrow++;
    }
    console.log("---------------");
}

// Scan from left to right, bottom to top
// If any given row contains all 10 elements, pop the row and move everything above it down by one
checkCompleteRows = () => {
    for(let z = 90; z < 100; z++){
    if(grid[z] == 0){
        checkbottom = false;
        break;
    }




    // let checkbottom = true;
    // // console.log(`points of active element ${element.point1}     ${element.point2}      ${element.point3}     ${element.point4}`);
    // spawnNextEle = false;

    // while(checkbottom){

    //     for(let z = 90; z < 100; z++){
    //         if(grid[z] == 0){
    //             checkbottom = false;
    //             break;
    //         }
    
    //     }
    
    //     if(checkbottom){
    //         // console.log('clearing row');
        
    //         for(let z = 90; z <= 100; z++){
    //             grid[z] = 0;
    //             // for(let y = z; y >= 10; y-=10){
    //             //     // if(y != element.point1 && y != element.point2 && y != element.point3 && y != element.point4)
    //             //     grid[y] = grid[y-10];
    //             //     console.log('grid[y]' + grid[y] + 'becomes' + grid[y-10]);
    //             //     colorTestSquares();
    //             // }
    //         }    
    //         colorTestSquares();
     
    //     }

    
    

    // colorTestSquares();
    // // console.log(1/0);
    // }
    // spawnNextEle = true;
}


moveShapes = (currObj) => {
    printGrid();

    currObj.moveDown();

    checkBottomRow();

}


currObj = new testBlock();
currObj.addColors();

setInterval(() => {
    moveShapes(currObj);
}, 500);



  
const container = document.querySelectorAll(".container");

let count = 0;








setInterval(() => {
    document.onkeydown = checkKey;

 

    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            rotate(objects[0]);
        }
        else if (e.keyCode == '40') {
            // console.log('lol');
        }
        else if (e.keyCode == '37') {
            moveLeft(objects[0]);
        }
        else if (e.keyCode == '39') {
            moveRight(objects[0]);
        }
    }

}, interval);

changeColorObj = obj => {
    let x_count = 1;
    let y_count = 1;

    let arr_values = Object.values(obj);

    for(let i = 0; i < arr_values.length - 1; i+=2){
        //let temp_add = `.grid-item${arr_values[i]}-${arr_values[i+1]}`;
        const temp_add = ".grid-item" + arr_values[i] + "-" + arr_values[i+1];
        document.querySelector(temp_add).classList.add("selected");
    }
   
}


// Kept for reference. To be deleted after reimplementation 


// moveShapes = (obj) => {
//     //Iterate over each object present on the tetris board

//     element = currObj
//     //If all elements are on the bottom row, shift everything down 1
//     checkBottomRow(element);

//         //If every point is not on the bottom row, the element is not frozen and the element is still active 
//         if(element.point1 < 90 && element.point2 < 90 && element.point3 < 90 && element.point4 < 90 && element.active == true) {
//             printGrid();
//             //If element in starting position cannot move
//             // if(grid[element.lowest1 + 10] == 1 || grid[element.lowest2 + 10] == 1 && grid[4] == 1 && grid[5] == 1){
//             //     checkGameOver();
//             //     break;
//             // }



//             if(element instanceof Line){
//                 // console.log('line');
//                 //horizontal line
//                 if(element.point3 == element.point2 + 1){
//                     // console.log('horizontal line');
//                     if(grid[element1+10] == 1 || grid[element2+10] == 1 || grid[element3+10] == 1 || grid[element4+10] == 1){
//                         console.log('horizontal line frozen');
//                         element.active = false;
//                         objects.pop();
//                         makeShape();
//                     }

//                 }

//                 else{
//                     // console.log('vertical line');
//                     if(grid[element.point4 + 10] == 1){
//                         element.active = false;
//                         // console.log("ELEMENT DEACTIVATED vertical line!");
//                         makeShape();
//                     }
//                 }
//             }

         
//             //If the element reaches the bottom row or hits another block freeze that element
//             else if(element instanceof square){
//                 // console.log('square');
//                 if(grid[element.point3+10] == 1 || grid[element.point4+10] == 4){
//                     // console.log('square frozen');
//                     element.active = false;
    
//                     makeShape();
//                 }

//             }

//             //If the element reaches the bottom row or hits another block freeze that element
//             else if(element instanceof testBlock){
//                 console.log('moving test block')

//                 element.moveDown();
//                 element.addColors();
//             }




        

//             //If element is on the bottom row after moving deactivate it
//             if((element.lowest1 > 89 || element.lowest2 > 89) && element instanceof square){
//                 element.active = false;
//                 // console.log("ELEMENT DEACTIVATED 2!");
//             }

    
//         // }


//         //Color test squares 
//         colorTestSquares(element.lowest1, element.lowest2);
       

//         }
//         else{
//             // element.active = false;
//             // console.log("ELEMENT DEACTIVATED 2!");
//             // makeShape();
//         }
//     }
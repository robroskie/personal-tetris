const interval = 1000;

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

function square(point1) {
    this.point1 = point1; 
    addColor(null,null,point1);

    this.point2 = this.point1 + 1;
    addColor(null,null,this.point2);

    this.point3 = this.point1 - 10;
    addColor(null,null,this.point3);

    this.point4 = this.point1 - 9;
    addColor(null,null,this.point4);

    this.lowest1 = this.point1;
    this.lowest2 = this.point2;

    this.active = true;
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
}



let objects = [];



modify = (element, value) => {
    console.log("trig");
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
    console.log(`element.point1: ${element.point1}   element.point2: ${element.point2}   element.point3: ${element.point3}    element.point4: ${element.point4}`);
    switch(element.orientation) {
        case 1: removeColor(element.point2); element.point2 -= 9; addColor(null,null,element.point2); 
        removeColor(element.point3); element.point3 -= 17; addColor(null,null,element.point3);   
        removeColor(element.point4); element.point4 -= 8; addColor(null,null,element.point4); 
        break;

        case 2: 
        break;
    }
    console.log(`element.point1: ${element.point1}   element.point2: ${element.point2}   element.point3: ${element.point3}    element.point4: ${element.point4}`);
}

rotate = () => {
    for(let i = 0; i < objects.length; i++){
        let element = objects[i];
        element.orientation++;
        if(element.orientation >= 4)
            element.orientation = 0;

        if(element instanceof T && element.active == true) {
            drawT(element); 
            console.log("if draw T");
        }
        else if(element instanceof L && element.active == true) {
            drawL(element); 
            console.log("if draw L");
        }

    }
}

    
moveLeft = () => {
    for(let i = 0; i < objects.length; i++){
        console.log(i + "**********");
        let element = objects[i];
        console.log(grid);
       // console.log(grid);


        if(element.point1 % 10 != 0 && element.point2 % 10 != 0 && element.point3 % 10 != 0 && element.point4 % 10 != 0) {
            console.log(`check for ${element.point1}     ${element.point2}      ${element.point3}     ${element.point4}`);
            if(element.point1 != null)
                removeColor(element.point1);
            if(element.point2 != null)
                removeColor(element.point2);
            if(element.point3 != null)
                removeColor(element.point3);
            if(element.point4 != null)    
                removeColor(element.point4);

            if(element.point1 != null)    
                element.point1 -= 1;
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

}}    

moveRight = () => {
    for(let i = 0; i < objects.length; i++){
        console.log(i + "**********");
        let element = objects[i];
        console.log(grid);
       // console.log(grid);
        if(element.point1 % 10 != 9 && element.point2 % 10 != 9 && element.point3 % 10 != 9 && element.point4 % 10 != 9) {
            console.log(`check for ${element.point1}     ${element.point2}      ${element.point3}     ${element.point4}`);
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
        }
}}       

checkBottomRow = () => {
    let clear_row = false;
    for(let z = 99; z < 100; z++){
        if(grid[z] == 0){
            console.log('botton not all 1s');
            return;
        }
    }
    //console.log('bottom all 1s');
    clear_row = true;
    console.log('clearing row');

    for(let z = 90; z < 100; z++)
        removeColor(z);

    for(let i = 0; i < objects.length; i++){
        //console.log(objects.length);
        let element = objects[i];
        //console.log("inner" + grid);
        if(element.point1 >= 90){
            element.point1 = null;
            grid[element.point1] = 0;
        }
        if(element.point2 >= 90){
            element.point2 = null;
            grid[element.point2] = 0;
        }
        if(element.point3 >= 90){
            element.point3 = null;
            grid[element.point3] = 0;
        }
        if(element.point4 >= 90){
            element.point4 = null;
            grid[element.point4] = 0;
        }
       
    }
    //console.log("outer" + grid);
}

moveShapes = () => {
     for(let i = 0; i < objects.length; i++){
        console.log(i + "**********");
        let element = objects[i];
        //console.log(grid);
       // console.log(grid);

       let a = [element.point1, element.point2, element.point3, element.point4];
       let b = [];

  
       

        if(element.point1 < 90 && element.point2 < 90 && element.point3 < 90 && element.point4 < 90 && !element.frozen  && element.active == true) {
            //element instanceof square && 
            if(grid[element.lowest1 + 10] == 1){
                element.active = false;
                continue;
            }
            console.log("this.lowest" + element.lowest1);
            // else if(element instanceof L && grid[element.point4 + 10] == 1){
            //     this.active = false;
            //     continue;
            // }

            // else if(element instanceof Line && grid[element.point4 + 10] == 1)
            
            console.log(`check for ${element.point1}     ${element.point2}      ${element.point3}     ${element.point4}`);
            
            if(element.point1 != null)
                removeColor(element.point1);
            if(element.point2 != null)
                removeColor(element.point2);
            if(element.point3 != null)
                removeColor(element.point3);
            if(element.point4 != null)    
                removeColor(element.point4);

            if(element.point1 != null)    
                element.point1 += 10;
            if(element.point2 != null)    
                element.point2 += 10;
            if(element.point3 != null)
                element.point3 += 10;
            if(element.point4 != null) 
                element.point4 += 10;

            element.lowest1 += 10;

            if(element.point1 != null)
                addColor(null,null,element.point1);
            if(element.point2 != null)
                addColor(null,null,element.point2);
            if(element.point3 != null)
                addColor(null,null,element.point3);
            if(element.point4 != null) 
                addColor(null,null,element.point4);
    
        }



        checkBottomRow();
    }}
  
const container = document.querySelectorAll(".container");

let count = 0;

makeShape = () => {
    const c = Math.floor(Math.random() * 5);
    switch(c) {
        case 0 : objects.push(new square(14));
        case 1 : objects.push(new T(14));
        case 2 : objects.push(new L(14));
        case 3 : objects.push(new Line(14));
        case 4 : objects.push(new Open(14));
    }
}

//objects.push(new square(14));
//objects.push(new square(44));

objects.push(new L(44));
//objects.push(new T(51));

setInterval(() => {
    count++;
    if(count % 5 == 0){
        //objects.push(new square(14));
    
    }

}, interval);

setInterval(() => {
    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            rotate();
        }
        else if (e.keyCode == '40') {
            console.log('lol');
        }
        else if (e.keyCode == '37') {
            moveLeft();
        }
        else if (e.keyCode == '39') {
            moveRight();
        }
    }

    moveShapes();
    count++;
    if(count % 5 == 0){
        //makeShape();
        //objects.push(new square(14));
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


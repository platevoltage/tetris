const screenWidth = 500;
const screenHeight = 600;
const yMargin = 4;
const yMarginBottom = 1;
const xMargin = 1;
const gridWidth = 10 + xMargin*2;
const gridHeight = 20 + yMargin + yMarginBottom;
const bgColor = "#222222";
const squareWidth = 30;
const squareHeight = 30;
var level = 1;
var speed = 1000  /level;
var score = 0;

var grid = new Array();
var piece;
var scoreBox = new textBox(400, 80, score, 80);
var smallTestSquare = new Array();

function start() {
    

    gameCanvas.start();
    fillGrid();
    setMargins();
    createPiece();
    //testDraw();
   //preFill();
    

    

}

var gameCanvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameCanvas, 40);
        this.speed = setInterval(drop, speed);
        this.keyInterval = setInterval(checkKey, 40);
       
 
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //score = 0;

    }

}
function checkKey() {document.onkeydown = checkKey_;}
function checkKey_(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        fastDrop();
        // up arrow
    }
    else if (e.keyCode == '40') {
        drop();
        // down arrow
    }
    else if (e.keyCode == '37') {
        left();
       // left arrow
    }
    else if (e.keyCode == '39') {
        right();
       // right arrow
    }
    else if (e.keyCode == '32') {
        rotate();
       // right arrow
    }

}

function textBox(x, y, text, size) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.size = size;

    this.update = function() {
        var ctx = gameCanvas.context;
        ctx.fillStyle = "white";
        ctx.font = size + "px Arial";
        ctx.fillText(this.text, this.x, this.y);
        
    }


}

function square(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.isActive = false;
    this.isSet = false;
    this.isTarget = false;
    this.height = height;
    this.width = width;
    

    this.update = function() {
        var ctx = gameCanvas.context;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //ctx.stroke();
    }



}
var rotation = 0;
function updateGameCanvas() {
    //document.onkeydown = checkKey;
    gameCanvas.clear();
    scoreBox.update();
    
   
 
    
    
    
    for(let j=0;j<gridWidth;j++) {
        for(let i=0;i<gridHeight;i++) {
            if ( !grid[j][i].isActive && !grid[j][i].isSet) grid[j][i].color = bgColor;
            
            //if ( grid[j][i].isSet ) grid[j][i].color = "pink";
            if ( grid[j][i].isTarget ) grid[j][i].color = "#444444";
            grid[j][i].update();
        }
    }  
    
    
    //testSquare.update();
    //testDraw();
    //testSquare.update();
    testAnimation();

    
}



function fillGrid() {
    for(let j=0;j<gridWidth+xMargin;j++) {
        var row = new Array();
        for(let i=0;i<gridHeight+yMarginBottom;i++) {
            row.push(new square(30*(j-xMargin),30*(i-yMargin),bgColor,squareWidth, squareHeight));
            //row[i].update();

        }
        grid.push(row);
    }
    
}

function setMargins() {
    for(let i=0;i<gridHeight;i++) {
        grid[gridWidth-xMargin][i].isSet = true;
        grid[gridWidth-xMargin][i].color = "black";
        grid[xMargin-1][i].isSet = true;
        grid[xMargin-1][i].color = "black";
    }
    for(let i=0;i<gridWidth;i++) {
        grid[i][gridHeight - yMarginBottom].isSet = true;
        grid[i][gridHeight - yMarginBottom].color = "black";
    }

}

function _piece(x, y, type, rotation, isTarget) {
    //var squareCoord;
    this.occupiedBlocks; 

    this.rotation = rotation;
    this.x = x;
    this.y = y;
    this.isSet = false;
    this.isActive = true;
    this.isTarget = isTarget;

    this.update = function() {
        x = this.x;
        y = this.y;
    
        switch(type) {
            
            case "jBlock": 
                jBlock();
                break;
            case "lBlock":
                lBlock();
                break;
            case "oBlock": 
                oBlock();
                break;
            case "iBlock": 
                iBlock();
                break;
            case "zBlock": 
                zBlock();
                break;
            case "sBlock": 
                sBlock();
                break;
            case "tBlock": 
                tBlock();
                break;
        }
        this.occupiedBlocks = buildPiece(this.isSet, this.isActive, this.isTarget);
        
        
        var color;
        function buildPiece(isSet, isActive, isTarget) {
            var occupiedBlocks = new Array;
            for(let i=0;i<4;i++) { //set blocks
                occupiedBlocks.push([ x+squareCoord[i][0] , y+squareCoord[i][1] ]);
                    var square = grid[ x+squareCoord[i][0] ][ y+squareCoord[i][1]];
                
                    if (isTarget) {
                    //if (isTarget) {
                      //  if (square.color == bgColor) square.color = "#777777";
                        square.isActive = isActive;
                        
                        //grid[ x+squareCoord[i][0] ][ y+squareCoord[i][1] ].isTarget = isTarget;
                    }
                    
                    else {
                        if (!square.isSet) square.color = color;
                        square.isActive = isActive;
                        if (isSet) square.isSet = true;
                        
                    }
                    square.isTarget = isTarget;
                    
                    
                    
                    
                
                
            }
            return occupiedBlocks;
        }

        function tBlock() {
            color = "white";
            switch(this.rotation) {
                case 0: 
                    squareCoord = [ [1,0],[0,1],[1,1],[2,1] ];  
                    break;
                case 1: 
                    squareCoord = [ [0,1],[1,0],[1,1],[1,2] ];  
                    break;
                case 2: 
                    squareCoord = [ [1,2],[0,1],[1,1],[2,1] ];  
                    break;
                case 3: 
                    squareCoord = [ [2,1],[1,0],[1,1],[1,2] ];  
                    break;

            }
        }
        function sBlock() {
            color = "purple"
            switch(this.rotation) {
                
                case 0:
                case 2: 
                    squareCoord = [ [1,0],[2,0],[0,1],[1,1] ];  
                    break;
                case 1: 
                case 3:
                    squareCoord = [ [2,1],[2,2],[1,0],[1,1] ];  
                    break;
           

             }
        }
        function zBlock() {
            color = "green"
            switch(this.rotation) {
                
                case 0:
                case 2: 
                    squareCoord = [ [0,0],[1,0],[1,1],[2,1] ];  
                    break;
                case 1: 
                case 3:
                    squareCoord = [ [2,0],[2,1],[1,1],[1,2] ];  
                    break;
           

             }
        }     
        function jBlock() {
            color = "red"
            switch(this.rotation) {
                case 0: 
                    squareCoord = [ [0,0],[0,1],[1,1],[2,1] ];  
                    break;
                case 1: 
                    squareCoord = [ [2,0],[1,0],[1,1],[1,2] ];  
                    break;
                case 2: 
                    squareCoord = [ [2,2],[0,1],[1,1],[2,1] ];  
                    break;
                case 3: 
                    squareCoord = [ [0,2],[1,0],[1,1],[1,2] ];  
                    break;

             }
        }      
    
        function lBlock() {
            color = "blue";
            switch(this.rotation) {
                case 0: 
                    squareCoord = [ [2,0],[0,1],[1,1],[2,1] ];    
                    break;
                case 1: 
                    squareCoord = [ [0,0],[1,0],[1,1],[1,2] ];  
                    break;
                case 2: 
                    squareCoord = [ [0,2],[0,1],[1,1],[2,1] ];      
                    break;
                case 3: 
                    squareCoord = [ [2,2],[1,0],[1,1],[1,2] ];      
                    break;

            }
        }
        function oBlock() {
            color = "yellow";
                    squareCoord = [ [0,0],[0,1],[1,0],[1,1] ];
                   
            
        }
        function iBlock() {
            color = "orange";

            switch (this.rotation) {
                case 0:
                case 2:
                    squareCoord = [ [0,2],[1,2],[2,2],[3,2] ];
                    break;
                case 1:
                case 3:
                    squareCoord = [ [1,0],[1,1],[1,2],[1,3] ];
                    break;
            }  

        }


    }  
}

function rotate() {
    var moveable = true;
    piece.isActive = false;
    targetPiece.isActive = false;
    targetPiece.isTarget = false;
    piece.update();
    targetPiece.update();
    if (rotation < 3) rotation++;
    else rotation = 0;

    
    piece.rotation = rotation;
    
    piece.update();
    for (i in piece.occupiedBlocks) {
       // console.log((grid[piece.occupiedBlocks[i][0]][piece.occupiedBlocks[i][1]].isSet));
        if (!grid[piece.occupiedBlocks[i][0]][piece.occupiedBlocks[i][1]].isSet) {
            
            moveable = false;

            
        }
    }
    if (moveable) {    
        if (rotation >= 0) rotation--;
        else rotation = 3;
    }
    
    targetPiece.isActive = true;
    targetPiece.isTarget = true;
    targetPiece.y = piece.y;
    targetPiece.update();
    targetFastDrop();
     piece.isActive = true;
     piece.update();
     

    

}

function createPiece() {
    let type = "";
    let randomNum = 10;
    while(randomNum >= 7) randomNum = Math.floor(Math.random()*10);
    switch (randomNum) {
        case 0: type = "iBlock"; break;
        case 1: type = "jBlock"; break;
        case 2: type = "lBlock"; break;
        case 3: type = "oBlock"; break;
        case 4: type = "sBlock"; break;
        case 5: type = "tBlock"; break;
        case 6: type = "zBlock"; break;
    }
    //console.log(randomNum);

    piece = new _piece(6,2,type,0);  // (x , y)  y higher than 2, x higher than 1
    targetPiece = new _piece(6,2,type,0,true);  // (x , y)  y higher than 2, x higher than 1
    targetPiece.update();
    piece.update();
    
    
}




function targetDrop() {
    var moveable = true;

    targetPiece.isActive = false;
    targetPiece.isTarget = false;
    targetPiece.update();
    for (i in targetPiece.occupiedBlocks) {

        if (grid[targetPiece.occupiedBlocks[i][0]][targetPiece.occupiedBlocks[i][1]+1].isSet) moveable = false;
    }
    if (moveable) targetPiece.y++; 
    

    targetPiece.isActive = true;
    //targetPiece.isTarget = true;
    
    return moveable;
}
function targetFastDrop() {
    while ( targetDrop() );
    targetPiece.isTarget = true;
    targetPiece.update();
    
}

function drop() {
    
    var moveable = true;

    piece.isActive = false;

    piece.update();
    
    for (i in piece.occupiedBlocks) {

        if (grid[piece.occupiedBlocks[i][0]][piece.occupiedBlocks[i][1]+1].isSet) moveable = false;
        
    }
    if (moveable) piece.y++; 
    
    else {
        
        
        set();
        
        createPiece();
        
        
    }
    piece.isActive = true;
    

    piece.update();
    targetFastDrop();
    //targetPiece.update();
    return moveable;
    
}

function fastDrop() {
    while ( drop() );
}

function left() {
    var moveable = true;
    
    piece.isActive = false;
    targetPiece.isActive = false;
    targetPiece.isTarget = false;
  
    piece.update();
    targetPiece.update();
    //console.log(piece.occupiedBlocks);
    for (i in piece.occupiedBlocks) {
       
        if (grid[piece.occupiedBlocks[i][0]-1][piece.occupiedBlocks[i][1]].isSet) moveable = false;
    }

    if (moveable) {
        piece.x--; 
        targetPiece.x = piece.x;
        targetPiece.y = piece.y;
    }
  
  
   targetPiece.isActive = true;
   targetPiece.isTarget = true;
   
   targetPiece.update();
   targetFastDrop();
    piece.isActive = true;
    piece.update();
    
    
    
    
    
    
    
    
    
}
function right() {
    var moveable = true;
    piece.isActive = false;
    targetPiece.isActive = false;
    targetPiece.isTarget = false;
    piece.update();
    targetPiece.update();
    //console.log(piece.occupiedBlocks);
    for (i in piece.occupiedBlocks) {
       
        if (grid[piece.occupiedBlocks[i][0]+1][piece.occupiedBlocks[i][1]].isSet) moveable = false;
    }

    if (moveable) {
        piece.x++;
        targetPiece.x = piece.x;
    }
    targetPiece.isActive = true;
    targetPiece.isTarget = true;
    targetPiece.y = piece.y;
    targetPiece.update();
    targetFastDrop();
     piece.isActive = true;
     piece.update();
     
}

function set() {
    piece.isSet = true;
    piece.update();
    isGameOver();
    scoreLines();
    console.log(score);
    scoreBox.text = score;
    
    
    
}


function isGameOver() {

    for (let i=xMargin; i < gridWidth-xMargin; i++) {
        //console.log(grid[i][4].isSet);
        if(grid[i][4].isSet) gameOver();

    }

}

function gameOver() {
    
    grid = new Array();
    gameCanvas.clear();
    fillGrid();
    setMargins();
    createPiece();
    score = 0;
  

}

function scoreLines() {
    var completedLines = new Array();
    let bottom = gridHeight-yMarginBottom;

    
    for (let i=0; i<bottom; i++) {
        //console.log(i);
        if (scoreLine(i)) completedLines.push(i);
    }
    //console.log(completedLines);
    for (i of completedLines) {
        cutLine(i);
        score++;
        
    }
    
    
}
function scoreLine(line) {
    var completeLine = false;
    var test = new Array();
    for (let i=xMargin; i < gridWidth-xMargin; i++) {
        
        test.push(grid[i][line].isSet);

        if (!grid[i][line].isSet) {
            completeLine = false;
            break;
        }
        else {
            completeLine = true;       
            
        }

    }

    return completeLine;

}

function cutLine(line) {
    setExplosives(line);
    for (let j=line-1; j >= 0; j--) {
        for (let i=xMargin; i < gridWidth-xMargin; i++) {
            grid[i][j+1].color = grid[i][j].color;
            grid[i][j+1].isSet = grid[i][j].isSet;
        }
    }    

    

}

function setExplosives(line) {
    let lineY = (line-yMargin)*30;
    let x = squareWidth;
    
    console.log(x);
    
    for (let i = 0; i < 10; i++) {
        let color = grid[i+xMargin][line].color;
        
        let a = smallTestSquare.length;
        console.log(a);
        
        smallTestSquare.push([]);

        smallTestSquare[a].push(new square(i*x,lineY,color, 15, 15));
        smallTestSquare[a].push(new square(i*x+15,lineY,color, 15, 15));
        smallTestSquare[a].push(new square(i*x+15,lineY+15,color, 15, 15));
        smallTestSquare[a].push(new square(i*x,lineY+15,color, 15, 15));    
        
    }
    
    //testAnimation();
    //console.log(smallTestSquare);
    


}













//---------------------------------------------



function testAnimation() {

    let speed = 1;
    
    if (smallTestSquare.length && Math.abs(smallTestSquare[0][0].x) < 1000) {
        //testSquare.x = 2000;
        for (let i = 0; i < smallTestSquare.length; i++) {
            let randomX = speed+Math.random()*10;
            let randomY = speed/20;

            



            smallTestSquare[i][0].x-=randomX;
            smallTestSquare[i][0].y-=randomY;
            smallTestSquare[i][1].x+=randomX;
            smallTestSquare[i][1].y-=randomY;
            smallTestSquare[i][2].x+=randomX;
            smallTestSquare[i][2].y+=randomY;
            smallTestSquare[i][3].x-=randomX;
            smallTestSquare[i][3].y+=randomY;
        


            for (j in smallTestSquare[i]) {
            
                smallTestSquare[i][j].update();
            }
    
        }    
        

    }
    else {
            
            smallTestSquare = new Array();

        }


}



function preFill() {
    for (let i=1; i<11; i++) {
    grid[i][18].color = "red";
    grid[i][18].isSet = true;
    }
    grid[5][18].color = "yellow";


    for (let i=1; i<11; i++) {
        grid[i][20].color = "blue";
        grid[i][20].isSet = true;
        }
        grid[5][20].color = "yellow";
}

function blow() {

    //gameCanvas.setInterval.start.interval(updateGameCanvas, 10000);
    console.log(gameCanvas.interval);
    
}


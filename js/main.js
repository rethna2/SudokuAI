var current = "00",//stores the id of the currently selected cell. It has two characters. The first character represents the row, and the second character represents the column.
    currentArray=current.split(""), //remove
    currentText = $("#"+current).text(); //remove
var wrong = true; //change variable name.
var difficult,//stores difficulty level: Easy, Hard, Medium
    interval,// Id for setInterval that is used to calculate time.
    second= 0; //stores time. After 10 mins, its value is 600.

//default sudoku which will be shuffled
// 1 star
var numbers_x_1 =[[4,0,8,3,5,0,7,9,0],
                [3,9,0,2,0,4,6,1,0],
                [5,0,0,6,0,9,3,8,0],
                [1,0,0,5,6,0,0,2,7],
                [6,5,4,0,2,7,8,0,1],
                [7,2,0,1,0,8,0,0,9],
                [0,4,0,7,0,2,0,0,3],
                [0,0,5,4,0,6,0,7,0],
                [0,7,1,0,3,5,9,0,6]];
// 2 star
var numbers_x_2 =[[6,0,0,0,0,0,0,2,0],
                [0,0,0,0,7,0,4,0,0],
                [0,0,9,0,1,6,0,0,8],
                [0,0,5,0,9,0,0,8,2],
                [0,0,2,0,0,0,1,0,0],
                [1,6,0,0,4,0,9,0,0],
                [3,0,0,1,6,0,5,0,0],
                [0,0,8,0,5,0,0,0,0],
                [0,7,0,0,0,0,0,0,1]];
// 3 star
var numbers_x_3 =[[0,0,9,0,1,0,0,0,0,0],
                [0,0,3,0,0,0,9,0,7],
                [0,0,0,9,2,7,0,0,0],
                [0,5,0,3,0,0,0,0,0],
                [0,6,7,0,5,0,3,8,0],
                [0,0,0,0,0,2,0,7,0],
                [0,0,0,1,6,8,0,0,0],
                [2,0,6,0,0,0,4,0,0],
                [0,0,0,0,3,0,5,0,0]];
// 4 star
var numbers =[[2,6,0,5,0,0,0,0,0],
                [0,0,0,0,7,0,0,0,0],
                [4,8,0,1,9,0,7,0,0],
                [0,9,0,0,0,0,0,0,0],
                [3,0,6,0,5,0,4,0,7],
                [0,0,0,0,0,0,0,5,0],
                [0,0,3,0,4,6,0,8,9],
                [0,0,0,0,8,0,0,0,0],
                [0,0,0,0,0,9,0,6,5]];
// 5 star
var numbers_x_5 =[[7,0,0,0,0,1,4,6,0],
            [0,0,0,4,0,0,8,3,1],
            [0,0,0,0,3,0,5,0,7],
            [0,0,0,0,9,4,0,0,0],
            [1,0,0,0,0,0,0,0,3],
            [0,0,0,7,5,0,0,0,0],
            [2,0,9,0,1,0,0,0,0],
            [6,4,5,0,0,8,0,0,0],
            [0,1,7,2,0,0,0,0,6]];

var colorChange =  [[03,04,05],
    [13,14,15],
    [23,24,25],
    [63,64,65],
    [73,74,75],
    [83,84,85],
    [30,40,50],
    [31,41,51],
    [32,42,52],
    [36,46,56],
    [37,47,57],
    [38,48,58]];

//mapping of sudoku position with id.
var cubeBox =  [["00","01","02",10,11,12,20,21,22],
    ["03","04","05",13,14,15,23,24,25],
    ["06","07","08",16,17,18,26,27,28],
    [30,31,32,40,41,42,50,51,52],
    [33,34,35,43,44,45,53,54,55],
    [36,37,38,46,47,48,56,57,58],
    [60,61,62,70,71,72,80,81,82],
    [63,64,65,73,74,75,83,84,85],
    [66,67,68,76,77,78,86,87,88]];

//var logic = [[0,1,2],[3,4,5],[6,7,8]];

var easy = [[1,0,1,1,1,0,1,1,0],[1,1,0,1,0,1,1,1,0],[1,0,0,1,0,1,1,1,0],[1,0,0,1,1,0,0,1,1],
    [1,1,1,0,1,1,1,0,1],[1,1,0,1,0,1,0,0,1], [0,1,0,1,0,1,0,0,1], [0,0,1,1,0,1,0,1,0], [0,1,1,0,1,1,1,0,1]];

var medium = [[0,1,1,1,0,1,1,1,0],[0,0,1,1,1,1,1,1,0],[0,0,0,1,0,1,1,1,0],[0,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,0,0,1,1],[1,1,0,0,0,1,0,0,0], [0,1,0,1,0,1,0,0,0], [0,0,1,1,1,1,0,1,0], [0,1,1,0,1,1,1,0,0]];

var hard = [[0,0,1,1,0,0,1,1,0],[0,0,0,1,1,1,1,0,0],[0,0,0,1,0,0,0,1,0],[0,0,0,0,0,0,0,1,1],
    [1,1,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0], [0,1,0,0,0,1,0,0,0], [0,0,1,1,1,1,0,0,0], [0,1,1,0,0,1,1,0,0]];

var test = [[1,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],[1,1,1,1,0,1,1,1,1], [0,1,1,0,1,1,1,1,1], [1,1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1,1]];

var fill = [[0,0,1,1,0,0,1,1,0],[0,0,0,1,1,1,1,0,0],[0,0,0,1,0,0,0,1,0],[0,0,0,0,0,0,0,1,1],
    [1,1,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0], [0,1,0,0,0,1,0,0,0], [0,0,1,1,1,1,0,0,0], [0,1,1,0,0,1,1,0,0]];

var fillAll = [[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1,1]];

//suffleSudokuValues();
function suffleSudokuValues(){
    numbers = rVertical(numbers);
    numbers = rHorizontal(numbers);
    numbers = randomize(numbers);
    //numbers = rearrange(numbers);
    fill = rVertical(fill);
    fill = rHorizontal(fill);
}
$(function(){
    $("#mainSudoku").hide();
    $(".valid").hide();
    $("#tutorial").hide();
    $("#techniques").hide();
});

//fill = rearrange(fill);
// ------------- To change horizontal color if it is wrong ---------------//
function horizontalWrong(key, currentRow, currentColumn){
    var i, compareTexth;
    for(i=0;i<9;i++){
        compareTexth = $("#"+currentRow+i).text();
        if(compareTexth == key ){
            wrong = false;
            $("#horizontalValid").show();
            var topPosition = $("#"+currentRow+"0").position();
            $("#horizontalValid").css({"top":(topPosition.top+3),"left":(topPosition.left+2), "width":($(".sudokuid").css("width"))});
            currentText = key;
            break;
        }else{
            wrong = true;
            $("#horizontalValid").hide();
        }
    }
}
// ------------- To change vertical color if it is wrong ---------------//
function verticalWrong(key, currentRow, currentColumn){
    var i, compareTextv;
    for(i=0;i<9;i++){
        compareTextv = $("#"+i+currentColumn).text();
        if(compareTextv == key){
            wrong = false;
            $("#verticalValid").show();
            var leftPosition = $("#"+0+currentColumn).position();
            $("#verticalValid").css({"left":(leftPosition.left+2), "top":(leftPosition.top-2), "width":$("#00").css("width")+5, "height":$(".sudokuid").css("height")});
            currentText = key;
            break;
        }else{
            wrong = true;
            $("#verticalValid").hide();
            horizontalWrong(key, currentRow, currentColumn);
        }
    }
}
// ------------- To change Cube color if it is wrong ---------------//
function cubeWrong(key, currentRow, currentColumn){
    var i, j, z, temp;
    var cubeColumn = (Math.floor(currentColumn/3))*3;
    var cubeRow = (Math.floor(currentRow/3))*3;
    var cubeId = cubeRow+""+cubeColumn;
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            if(cubeBox[i][j] == current){
                temp = i;
                break;
            }
        }
    }
    for(z=0;z<9;z++){
        //$("#"+cubeBox[i][z]).css("background","#f00");
        var compareTextv = $("#"+cubeBox[temp][z]).text();
        if(compareTextv == key){
            wrong = false;
            $("#cubeValid").show();
            //console.log(cubeId);
            var cubePosition = $("#"+cubeId).position();
            var cubeHeight = parseInt($(".sudokuid").css("height"))/3.2;
            var cubeWidth  = parseInt($(".sudokuid").css("width"))/3.2;
            //console.log(cubeHeight+"-"+cubeWidth);
            $("#cubeValid").css({"left":(cubePosition.left+3), "top":(cubePosition.top+3), "height":(cubeHeight+1), "width":(cubeWidth+3)});
            currentText = key;
            break;
        }else{
            wrong = true;
            $("#cubeValid").hide();
            verticalWrong(key, currentRow, currentColumn);
        }
    }
}
// ------------- swaping values vertically---------------//
function rVertical(a){
    // console.log("working");
    var ran = randomizeArray([0,1,2]);
    var b= new Array();
    var i, j;
    for(i = 0; i < 3; i++){
        for(j = 0; j < 3; j++){
            b[i*3 + j] = a[i*3 + parseInt(ran[j])];
        }
    }
    return b;
}
// ------------- swaping values Horizontally---------------//
function rHorizontal(a){
    var ran = randomizeArray([0,1,2]);
    var b= new Array();
    var i, j;
    for(i = 0; i < 3; i++){
        for(j = 0; j < 3; j++){
            b[j*3 + i] = a[j*3 + parseInt(ran[i])];
        }
    }
    return b;
}
// ------------- swaping values randomlly---------------//
function randomize(a){
    var i,j;
    var rand = randomizeArray([1,2,3,4,5,6,7,8,9]);
    var b = new Array();
    for(i = 0; i < 9; i++){
        b[i] = new Array();
        for(j = 0; j < 9; j++){
            b[i][j] = rand[a[i][j]-1];
        }
    }
    return b;
}
// ------------- The array calld while swaping ---------------//
function randomizeArray(a){
    var b = new Array();
    while(a.length > 0){
        b.push(a.splice(Math.round(Math.random() * (a.length - 1)),1));
    }
    return b;
}

var bg1, bg2;
// ------------- Color Change---------------//
function colorChange2(){
    bg1 = "#999";
    bg2 = "#fff";
    var i, x, y;
    for(x=0;x<12;x++){
        for(y=0;y<3;y++){
            $(".sudokuid").css("background-color",bg2);
            $("#solvedSudoku #"+colorChange[x][y]).css("background",bg1);
            $("#solvedSudoku #0"+colorChange[x][y]).css("background",bg1);
            $("#unsolvedSudoku #"+colorChange[x][y]).css("background",bg1);
            $("#unsolvedSudoku #0"+colorChange[x][y]).css("background",bg1);
            $("#3").css("background",bg2);
            $("#4").css("background",bg2);
            $("#5").css("background",bg2);
        }
    }
    for(i=0;i<9;i++){
        $("#3"+i).css("border-top","3px solid");
        $("#6"+i).css("border-top","3px solid");
        $("#"+i+"3").css("border-left","3px solid");
        $("#"+i+"6").css("border-left","3px solid");
    }
    //borderColor();
}

function borderColor(){
    //var tableBorder = $("#borderColorPicker").val();
    var tableBorder = "#000";
    $(".sudokuid td").css("border-color",tableBorder);
    $(".sudokuid").css("border-color",tableBorder);
}
/*
 function bg1Color(){
 bg1 = $("#bg1ColorPicker").val();
 colorChange2()
 }

 function bg2Color(){
 bg2 = $("#bg2ColorPicker").val();
 $(".sudokuid").css("background-color",bg2);
 colorChange2()
 }

 function DtextColor(){
 var Dtext = $("#DtextColorPicker").val();
 $(".defaultText").css("color",Dtext);
 colorChange2()
 }

 function CtextColor(){
 var Ctext = $("#CtextColorPicker").val();
 $(".changeText").css("color",Ctext);
 colorChange2()
 }
 */

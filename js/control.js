
//--------------- Difficulty Level ----------------//
function settingSudokuLevel(type){
    if(type == "easy"){
        fill = easy;
    }else if(type == "medium"){
        fill = medium;
    }else if(type == "hard"){
        fill = hard;
    }else if(type == "today"){
        fill = easy;
    }
    displaySudoku();
}


$(function(){
    settingSudokuLevel("easy");
    // ------------- Keypad press Event---------------//
    $("#keyPad tr td").click(function(){
        var key = $(this).text();
        var currentRow = current.charAt(0);
        var currentColumn = current.charAt(1);
        //console.log(key);
        if(key == "C"){
            $("#" + current).text("");
            $(".valid").hide();
            wrong = true;
        }else if(key.length >4){
        }else if(currentText != key && fill[ currentArray[0] ][ currentArray[1] ] == "0"){
            //console.log("key"+key);
            horizontalWrong(key, currentRow, currentColumn);
            verticalWrong(key, currentRow, currentColumn);
            cubeWrong(key, currentRow, currentColumn);
            $("#" + current).text(key);
        }
    });
    setTimeout(checkCompletion,100);
    // ---------- Reset button in keypad ---------//
    $("#reset").click(function(){
        $("#drawSudoku").empty();
        second = 0;
        clearInterval(interval);
        interval = 0;
        settingSudokuLevel(difficult);
        $(".valid").hide();
        wrong = true;
    });
});

    // ------------- Checking whether all cell is filled or not ---------------//
function checkCompletion(){
    var j, i;
    for(j = 0; j < 9; j++){
        for(i = 0; i < 9; i++){
            if($("#" +j+i).text() == "" ){
                return false;
                //break;
            }else{
                $("#wrapper").show();
                $("#drawSudoku").empty();
                $("#mainSudoku").hide();
            }
        }
    }
}
// ------------- Draws Sudoku ---------------//
function displaySudoku(){
    var j, k, str;
    // ------ Creating table // Writing Numbers--------//
    str = '<table class = "sudokuid" cellspacing="0" style=" width:80%;height:100%;margin:0 auto">';
    for(j=0;j<9;j++){
        str += '<tr id="'+j+'">';
        for(k=0;k<9;k++){
            if(numbers[j][k] != 0){
                //numbers[j][k] = numbers[j][k];
                str += '<td id= "' + j+k + '" class="defaultText" style="color:#000"><span>' + numbers[j][k] + '</span></td>';
            }
            else{
                numbers[j][k] = "";
                str += '<td id= "' + j+k + '" class="changeText" style="border-color:black;font-size:13px;color:blue;">' +
                    '<span>' + numbers[j][k] + '</span>' +
                    '<table cellspacing="0" class="pencilTable">' +
                    '<tr><td class="pencil1">1</td><td class="pencil2">2</td><td class="pencil3">3</td></tr>' +
                    '<tr><td class="pencil4">4</td><td class="pencil5">5</td><td class="pencil6">6</td></tr>' +
                    '<tr><td class="pencil7">7</td><td class="pencil8">8</td><td class="pencil9">9</td></tr></table></td>';
            }
        }
        str += '</tr>';
    }
    str += '</table>';

    $("#solvedSudoku").append(str);
    $("#unsolvedSudoku").append(str);
    wrong = true;
        setTimeout(colorChange2,500);
        //console.log('sam'+$( "#66" ).offset().left);
        $("#"+current).css("outline","0.25em inset #f00");
    $(".sudokuid td").click(function(){
        //console.log(difficult);
        if(wrong != false){
            //console.log("working");
            $("td").css("outline","none");
            $(this).css("outline","0.25em inset #f00");
            current = $(this).attr("id");
            currentText = $(this).text();
            currentArray = current.split("");
        }
    });
    //solveSudoku();
}
$(function(){
    //console.log(numbers);
    var mySudoku = new SudokuSolver(numbers);
    //$("#"+sudokuArray+"").show();
    $("#getSolution").click(function(){
        //console.log(oneMissingCell);
        //$("#"+sudokuArray+"").show();
        var answer = mySudoku.getSolution();
        $("#solvedSudoku").show();
        for(i=0;i<9;i++){
            for(j=0;j<9;j++){
                if(answer[i][j] != []){
                    $("#solvedSudoku #"+i+""+j+" span").text(answer[i][j]);
                }
            }
        }
    });
    $("#nextAnswer").click(function(){
        var answer = mySudoku.getHint();
        if(answer.Cell != 0){
            console.log("Cell = " + answer.Cell+" / Value =" + answer.Val);
            $("#solvedSudoku").show();
            $("#solvedSudoku #"+answer.Cell+" span").text(answer.Val);
        }else{
            console.log("Thats all");
        }
    });
    $(".pencilTable").hide();
    //$(".pencilTable td").css("visibility","hidden");
    //$(".pencilTable td.pencil9").css("visibility","visible");
});

//----------saravanan----------------


//-------------- Artificial Intelligence ----------------//
var SudokuAI = function(arr){
    var sudokuType = 9, noSolvedThisCycle = 0;
	var  sudokuArray = window.sudokuArray = arr;
	var isHintFinding;
	var cubeBox = window.cubeBox =  [["00","01","02",10,11,12,20,21,22],
    ["03","04","05",13,14,15,23,24,25],
    ["06","07","08",16,17,18,26,27,28],
    [30,31,32,40,41,42,50,51,52],
    [33,34,35,43,44,45,53,54,55],
    [36,37,38,46,47,48,56,57,58],
    [60,61,62,70,71,72,80,81,82],
    [63,64,65,73,74,75,83,84,85],
    [66,67,68,76,77,78,86,87,88]];
    //console.log(JSON.stringify(sudokuArray));
    //rethna start
    var sameBlockArr = ["00,01,02,10,11,12,20,21,22",
        "03,04,05,13,14,15,23,24,25",
        "06,07,08,16,17,18,26,27,28",
        "30,31,32,40,41,42,50,51,52",
        "33,34,35,43,44,45,53,54,55",
        "36,37,38,46,47,48,56,57,58",
        "60,61,62,70,71,72,80,81,82",
        "63,64,65,73,74,75,83,84,85",
        "66,67,68,76,77,78,86,87,88"];
    var cellList = new Array();
    var cellListHash = new Object();
    for(i=0;i<sudokuType;i++){
        for(j=0;j<sudokuType;j++){
            if(arr[i][j] == ""){
                //cellIdList.push(i+""+j);
                cellList.push(new SudokuCell(i+""+j))
            }
        }
    }
    for(var i = 0; i < cellList.length; i++){
        cellListHash[cellList[i].id] = cellList[i];
    }

    var globalCount = 0;
    function solveOpenSingles(){

        if(globalCount > 25){
            return;
        }else{
            globalCount++;
        }
        var noSolved = 0;
        var cellId, cellVal;
        //console.log("solveSudokuFull");
        var counter = 0;
        console.log("cellList.length = " + cellList.length);
        if(cellList.length <=10){
            for(var i = 0; i < cellList.length; i++){
                console.log(i + ":" + cellList[i].pencil);
            }
        }
        while(counter < cellList.length){
            if(cellList[counter].pencil.length == 1){
                cellId = cellList[counter].id;
                cellVal = cellList[counter].pencil[0];

                sudokuArray[cellId.charAt(0)][cellId.charAt(1)] = cellVal;
                //remove the element from the list.
                delete cellListHash[cellId];
                cellList.splice(counter,1);
                noSolved++;
                //call updateDep on each cell
                //console.log(cellId + " : " + cellVal);
                if(cellList.length != 0){
                    for(var j = 0; j < cellList.length; j++){
                        cellList[j].updateDependency(cellId, cellVal);
                    }
                }
				console.log("isHintFinding = " + isHintFinding);
				if(isHintFinding){
					return {cellId:cellId, cellVal:cellVal};
				}
            }else{
                counter++;
            }
        }
        console.log("noSolved = " + noSolved);
        if(noSolved != 0){
            solveOpenSingles();
        }else{
            solveOpenPairs();
        }
    }

    function solveOpenPairs(){
        var noSolved = 0;
        var twoPossibles = new Object;
        for(var i = 0; i < cellList.length; i++){
            if(cellList[i].pencil.length == 2){
                twoPossibles[i] = cellList[i].pencil;
            }
        }
        for(var i in twoPossibles){
            console.log(">>" + i + ":" + twoPossibles[i]);
        }
        for(var j in twoPossibles){
            for(var k in twoPossibles){
                if(j < k){
                    if(cellList[j].dependency[cellList[k].id] !== undefined){
                        if(JSON.stringify(cellList[j].pencil) == JSON.stringify(cellList[k].pencil)){
                            //openPairsSpotted(cellList[j].id,cellList[k].id);
                            openPairsSpotted(j,k);
                            noSolved++;
                        }
                    }
                }
            }
        }
       if(noSolved != 0 || true){
           solveOpenSingles();
        }else{
            console.log("finish");
            return;
          //  solveHiddenSingles();
        }
    }

    function openPairsSpotted(index1, index2){
        var id1 = cellList[index1].id;
        var id2 = cellList[index2].id;
        if(id1.charAt(0) == id2.charAt(0)){
            var rowID = id1.charAt(0);
            for(var i = 0; i < 9; i++){
                var str = rowID +"" +  i
                if(str != id1 && str != id2 && cellListHash[str]){
                    removeNumberFromArray(cellListHash[str].pencil,cellListHash[id1].pencil);
                }
            }
        }else if(id1.charAt(1) == id2.charAt(1)){
            var colID = id1.charAt(1);
            for(var i = 0; i < 9; i++){
                var str = i+ "" + colID;
                if(str != id1 && str != id2 && cellListHash[str]){
                    removeNumberFromArray(cellListHash[i+ "" + colID].pencil,cellListHash[id1].pencil);
                }
            }
        }
       var block = checkSameBlock(id1, id2);
        if(block){
            var blockArr = block.split(',');
            console.log("same block:" + blockArr + ":" + blockArr.length);
            for(var i = 0; i < blockArr.length; i++){
                if(blockArr[i] != id1 && blockArr[i] != id2 && cellListHash[blockArr[i]]){
                    console.log("working :" + cellListHash[blockArr[i]].pencil + ":" + cellListHash[id1].pencil);
                    removeNumberFromArray(cellListHash[blockArr[i]].pencil,cellListHash[id1].pencil);
                    console.log("after :" +cellListHash[blockArr[i]].pencil );
                }
            }
        }
    }

    function removeNumberFromArray(arr, numArr){
        console.log("LLLLLLLLLLLLLLLLLLL : " + arr + ":" + numArr);
        for(var i = 0; i < numArr.length; i++){
            for(var j = 0; j < arr.length; j++){
                if(arr[j] == numArr[i]){
                    if(arr.length != 1){
                        arr.splice(j,1);
                    }
                    break;
                }
            }
        }
    }
    function checkSameBlock(id1, id2){
        for(var i = 0; i < sameBlockArr.length; i++){
            if(sameBlockArr[i].indexOf(id1) != -1){
                if(sameBlockArr[i].indexOf(id2) != -1){
                    return sameBlockArr[i];
                }else{
                    return "";
                }
            }
        }
        return "";
    }

    function solveSudokuFull(){
		isHintFinding = false;
        solveOpenSingles();
        return sudokuArray;
    }

	function getHint(){
		console.log("getHint");
		isHintFinding = true;
		var obj = solveOpenSingles();
        return obj;
	}
    return {
        "getSolution": solveSudokuFull,
		"getHint":getHint
    }
};

var SudokuCell = function(id){
    //console.log("sudokuCell");
    var depList = new Object();
    var _id = id.toString();
    var _pencil = new Array(1,2,3,4,5,6,7,8,9);
    var _dependency = new Array();
    var _empty = new Array();

    (function createDependency(){
        //Find dependencies incorresponding ROW
            var rowId = _id.charAt(0), colId = _id.charAt(1), boxId = _id.charAt(1), compareText, j, i, k, x, depId;
            for(j=0;j<9;j++){
                compareText = sudokuArray[rowId][j];
                depId = rowId+""+j;
                if(depId != _id){
                    depList[depId] = compareText;
                }
            }
        //Find dependencies incorresponding COLUMN
           depId = 0;
            for(j=0;j<9;j++){
                compareText = sudokuArray[j][colId];
                depId = j+""+colId;
                if(depId != _id){
                    depList[depId] = compareText;
                }
            }
        //Find dependencies incorresponding BOX
            depId = 0;
            //find corresponding array in cubeBox
            for(i=0;i<9;i++){
                for(k=0;k<9;k++){
                    if(cubeBox[i][k] == _id){
                        boxId = i;
                    }
                }
            }
            for(j=0;j<9;j++){
                //console.log(cubeBox[boxId][j]);
                compareText = sudokuArray[ cubeBox[boxId][j].toString().charAt(0) ][ cubeBox[boxId][j].toString().charAt(1) ];
                depId = cubeBox[boxId][j];
                if(depId != _id && depList[depId] == undefined){
                    depList[depId] = compareText;
                }
            }
        //return empty values in row, column, box as a array
        _dependency = depList;
    })();

    updatePencil();


    function updateEmptyArray(){
        // count number of empty cell in ROW
        function countRowEmpty(){
            var rowId = _id.charAt(0), temp = 0, compareText, j;
            for(j=0;j<9;j++){
                compareText = sudokuArray[rowId][j];
                if(compareText == "" ){
                    temp++;
                }
            }
            return temp;
        }
        // count number of empty cell in COLUMN
        function countColEmpty(){
            var colId = _id.charAt(1), temp = 0, compareText, j;
            for(j=0;j<9;j++){
                compareText = sudokuArray[j][colId];
                if(compareText == "" ){
                    temp++;
                }
            }
            return temp;
        }
        // count number of empty cell in BOX
        function countBoxEmpty(){
            var boxId = _id.charAt(1), temp = 0, compareText, j, i, k;
            //find corresponding array in cubeBox
            for(i=0;i<9;i++){
                for(k=0;k<9;k++){
                    if(cubeBox[i][k] == _id){
                        boxId = i;
                    }
                }
            }
            for(j=0;j<9;j++){
                compareText = sudokuArray[cubeBox[boxId][j].toString().charAt(0) ][ cubeBox[boxId][j].toString().charAt(1) ];
                if(compareText == "" ){
                    temp++;
                }
            }
            return temp;
        }
        //return empty values in row, column, box as a array
        return [countRowEmpty(), countColEmpty(), countBoxEmpty()];
    }

    // This function should be called whenever any other cell gets filled.
    function updateDependency(cellID, cellValue){
        //console.log(9);
        if( _dependency[cellID] != undefined){
            _dependency[cellID] = cellValue;
            //console.log("one : " + _dependency[12]);
            if(_pencil.length == 1){
                return;
            }
            for(var i = 0; i < _pencil.length; i++){
                if(_pencil[i] == cellValue){
                    _pencil.splice(i,1);
                    break;
                }
            }
            //updatePencil();
        }
    }
    
    function updatePencil(){
       for( var i in _dependency){
            for(var j=0;j<_pencil.length;j++){
                if(_dependency[i] == _pencil[j]){
                    if(_pencil.length != 1){
                        _pencil.splice(j,1);
                    }
                    break;
                }
            }
        } //console.log(_pencil);
    }

    //naked pairs
    function nakedPairs(cellID, cellValue){
        for(var j = 0; j < 2; j++ ){
            _dependency[cellID[j]] = cellValue[j];
            for(var i = 0; i < _pencil.length; i++){
                if(_pencil[i] == cellValue[j]){
                    _pencil.splice(i,1);
                    break;
                }
            }
        }
    }

    //public accessne
    this.id = _id;
    this.pencil = _pencil;
    this.dependency = _dependency;
    this.empty = function(){
        updateEmptyArray();
        _empty = updateEmptyArray();
        return _empty;
    };
    this.updateDependency = updateDependency;
    this.nakedPairs = nakedPairs;
    //this.updatePenciling = updatePenciling;
};
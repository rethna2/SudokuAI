sudokuAI
========

A javascript API to solve a valid sudoku problem. Basic knowledge in javascript is essential to use this library.


How to Use
==========

Step 1: Include the script.

<script src = "js/sudokuAI.js"></script>

Step 2: Initialize the sudoku with the constructor.

var sudokuArr = [

]
var mySudoku = new SudokuAI(arr);
Note: Blank cells are represent by "0".

Step 3 : Accessing the API

This api exposes two public methods.

solveSudoku : returns the solved sudoku. The format is the same as what you gave in the constructor.

getSudokuHint : returns the value of particular cell (easiest) in the puzzle. Return type is an object with two properties: "cellID" and "cellValue".





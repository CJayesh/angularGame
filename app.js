var app=angular.module("HangmanApp",[]);
app.controller("GameController",['$scope','$timeout',function($scope,$timeout){

//var words=['rat','cat','bat','mat'];
var words=[''];
$scope.inCorrectLettersChosen=[];
$scope.correctLettersChosen=[];
$scope.guesses=9;
$scope.displayWord='';
$scope.msg= '';
$scope.input={
	letter : ''
}
$scope.movie='';

/*
var selectRandomWord = function(){
	var index= Math.round(Math.random() * words.length);
	console.log(words[index]);
	console.log(words);
	return words[index];
} 
*/

var newGame = function(){

	$scope.inCorrectLettersChosen=[];
	$scope.correctLettersChosen=[];
	$scope.guesses=9;
	$scope.displayWord='';
	$scope.movie='';

	//selectedWord= selectRandomWord();
	//console.log(selectedWord);

	selectedWord = words[0];

	var tempDisplayWord= '';
	for (var i=0;i<selectedWord.length;i++){
		tempDisplayWord += '*'; 
	}
	$scope.displayWord = tempDisplayWord;
	
}

$scope.movieChosen = function(){

	var movieName = $scope.movie.toLowerCase();
	console.log(movieName);
	words.unshift(movieName);
	console.log(words);
	newGame();

}

$scope.letterChosen = function(){

	for (var i=0; i < $scope.correctLettersChosen.length; i++) {
		if($scope.correctLettersChosen[i].toLowerCase()==$scope.input.letter.toLowerCase()){
			$scope.input.letter='';
			return;
		}
	}

	for (var i=0; i < $scope.inCorrectLettersChosen.length; i++) {
		if($scope.inCorrectLettersChosen[i].toLowerCase()==$scope.input.letter.toLowerCase()){
			$scope.input.letter='';
			return;
		}
	}

	var correct = false;
	for (var i = 0; i < selectedWord.length; i++) {
		if(selectedWord[i].toLowerCase()==$scope.input.letter.toLowerCase()){
			$scope.displayWord = $scope.displayWord.slice(0,i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i+1);
			correct = true;

		}
	}
	if(correct){
		$scope.correctLettersChosen.push($scope.input.letter.toLowerCase());
	}
	else{
		$scope.guesses--;
		$scope.inCorrectLettersChosen.push($scope.input.letter.toLowerCase());
		
	}
	$scope.input.letter = "";
	if($scope.guesses == 0){
		alert("you lost!!");
		words=[''];
		$timeout(function() {
			newGame();
		}, 500);
	}
	if($scope.displayWord.indexOf('*')==-1){
		alert("you won!!");
		words=[''];
		$timeout(function() {
			newGame();
		}, 500);
	}

}

//newGame();

}])
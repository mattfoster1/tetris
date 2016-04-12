/*To do:
	- Generate grid in the dom ("main_grid")
		- Using a for loop with incremented numbers
		- will need to use an 'attribute selector' in css
	
	- Movement:
		- user to be able to move pieces L/R
		- user to be able to rotate pieces CW/CCW
		
	- Make a counter (for movement beats / rate of play)
		- Pieces move every beat
		- Pieces stop when their bottom edge touches something
			- Another piece, or the bottom
	Line disappears when 
	
	- Define piece shapes
	- Random piece generater
		- should have a 'next piece preview', so have the generator take a step back

	- Scoreboard (every line cleared)

	NB keycodes(w===87, a===65, s===83, d===68, left===37, right===39)

*/


var arraySet1 = []; //new array with ten undefined elements
// console.dir(arraySet1);
var beat = 0;
var subBeat = 0;
var gameTime = [0,0];
var interval;
var xAxis;
var yAxis;
var arrivalTime;
var livePieceTime = 0;
var vert = livePieceTime;
var horiz = 4;
livePieceOnBoard = 0;
var livePieceShape;
var position1v = [];
var livePieceTime;
var livePieceAlignment;


var h1;
var v1;
var h2;
var v2;
var h3;
var v3;
var h4;
var v4;


var setUpGrid = function() {

	for (xAxis = 0; xAxis < 10; xAxis++) {  // Gives everything in array a value of 0
		var arraySet0 = [];
		for (yAxis = 0; yAxis < 22; yAxis++) {

			arraySet0.push(0)
			
		};

		arraySet1.push(arraySet0); //ERROR - why is this only getting one instance of arraySet0, rather than 10?
	};

}

var fillOutGrid = function() {
	var toAdd = document.getElementById("addtohtml1");
	for (var xAxis = 0; xAxis < 10; xAxis++) {
		for (var yAxis = 0; yAxis < 22; yAxis++) { // xAxis === x , yAxis === y
			
			var toAddChild = document.createElement("div" + xAxis);
			toAddChild.id = "cell x"+ xAxis + ", y" + yAxis;
			toAddChild.className = "trial1";
			toAddChild.style.left = xAxis*21 + 'px';
			toAddChild.style.top = yAxis*21 + 'px';
			
			if (arraySet1[xAxis][yAxis] === 1) {
				toAddChild.className = "trial2";

			} else if (arraySet1[xAxis][yAxis] === 2){
				toAddChild.className = "trial3";
				console.log("One made Yellow " + horiz + ", " + vert);

			} else if (arraySet1[xAxis][yAxis] === -1){
				toAddChild.className = "trial4";
				console.log("One made gray " + horiz + ", " + vert);
			}

			toAdd.appendChild(toAddChild); //applies it all!
		}
	}
}


var theBeat = function() {
	
	if (beat < 14) { // NOTE: put in here for it to happen every 0.1 secs
		
		subBeat += 0.1;
		// console.log(gameTime);
		gameTime = [beat, subBeat];

		if (livePieceShape === "L") {
			shapeL();
		}
		fillOutGrid();

		if (subBeat >= 1) { //NOTE: put it in here for it to happen every second

			// document.getElementById("timer").innerHTML = "Game time = " + gameTime;

			vert = livePieceTime;
			beat++;
			subBeat = 0;
			
			if (livePieceOnBoard === 0) {
				randomShapeGenerator();
				livePieceTime = 0;
			}
			
			livePieceTime++
			// console.log("theBeat, gameTime = " + gameTime);
		}		
	} 		
}

var start = function() {
	setUpGrid();
	var interval = setInterval(function(){theBeat();}, 100);
}

var randomShapeGenerator = function() {
	// console.log("NOTIFICATION: randomShapeGenerator triggered");
	livePieceOnBoard = 1;
	
	var arrivalTime = gameTime;
	livePieceShape = "L"; //NOTE: just for now, will be generated randomly later
	
	livePieceAlignment = 1;

	//TASK: assign each shape a number, generate random number, match number to shape, display shape
	//TASK: Generate new shape before previous one lands, for preview window
	// setTimeout(function(){ shapeL(); }, 1200);
}

var shapeL = function() {
	getAlignment();

	// h1 = horiz;
	// v1 = vert;
	// h2 = horiz;
	// v2 = vert+1;
	// h3 = horiz;
	// v3 = vert+2;
	// h4 = horiz+1;
	// v4 = vert+2;
	
	if (subBeat < 1) {
		arraySet1[h1][v1] = 1; //top
		arraySet1[h2][v2] = 1; //second from top
		arraySet1[h3][v3] = 1; //bottom
		arraySet1[h4][v4] = 1;//bottom right
	} else {
		arraySet1[h1][v1] = 0; //top
		arraySet1[h2][v2] = 0; //second from top
		arraySet1[h3][v3] = 0; //bottom
		arraySet1[h4][v4] = 0; //bottom right
	}
}



document.onkeydown = function(checkKeyPressed){
		    if(checkKeyPressed.keyCode == 68){
		        goRight();
		    } else if (checkKeyPressed.keyCode == 65){
		        goLeft();
		    } else if (checkKeyPressed.keyCode == 37){
		    	CCW();
		    }
};

var goLeft = function() {
	
	getAlignment();

	// if (livePieceShape === "L") {
	// 	var h1 = horiz;
	// 	var v1 = vert;
	// 	var h2 = horiz;
	// 	var v2 = vert+1;
	// 	var h3 = horiz;
	// 	var v3 = vert+2;
	// 	var h4 = horiz+1;
	// 	var v4 = vert+2;
	// }

	if (horiz >= 1) {
		horiz -= 1;
		
		arraySet1[h1][v1] = 0;
		arraySet1[h2][v2] = 0;
		arraySet1[h3][v3] = 0;
		arraySet1[h4][v4] = 0;

		arraySet1[h1-1][v1] = 1;
		arraySet1[h2-1][v2] = 1;
		arraySet1[h3-1][v3] = 1;
		arraySet1[h4-1][v4] = 1;

		// setInterval(function(){arraySet1[h1][v1] = 0;}, 100);
		// setInterval(function(){arraySet1[h2][v2] = 0;}, 100);
		// setInterval(function(){arraySet1[h3][v3] = 0;}, 100); 
		// setInterval(function(){arraySet1[h4][v4] = 0;}, 100);
		
		console.log("L, horiz = " + horiz)
		console.log("gameTime = " + gameTime);
		
		fillOutGrid();
	}
}

var goRight = function() {
	
	getAlignment();
	console.log(h1);

	if (horiz <= 9) {
		horiz += 1;
		
		arraySet1[h1][v1] = 0;
		arraySet1[h2][v2] = 0;
		arraySet1[h3][v3] = 0;
		arraySet1[h4][v4] = 0;

		arraySet1[h1+1][v1] = 1;
		arraySet1[h2+1][v2] = 1;
		arraySet1[h3+1][v3] = 1;
		arraySet1[h4+1][v4] = 1;		


		// setInterval(function(){arraySet1[h1][v1] = 0;}, 100);
		// setInterval(function(){arraySet1[h2][v2] = 0;}, 100);
		// setInterval(function(){arraySet1[h3][v3] = 0;}, 100); 
		// setInterval(function(){arraySet1[h4][v4] = 0;}, 100);
		
		console.log("R, horiz = " + horiz);
		console.log("gameTime = " + gameTime);

		fillOutGrid();
	}
}

var CCW = function() {
	
	console.log("CCW");

	if (livePieceAlignment === 0){
		livePieceAlignment = 4;
	} else {
		livePieceAlignment--;
	}

	console.log("livePieceAlignment = " + livePieceAlignment);

	// arraySet1[h1][v1] = 0;
	// arraySet1[h2][v2] = 0;
	// arraySet1[h3][v3] = 0;
	// arraySet1[h4][v4] = 0;
	
	fillOutGrid();
}

var getAlignment = function() {
	// console.log("Getting Alignment...");

	if (livePieceShape === "L") {
		if (livePieceAlignment === 1) {
			console.log("Alignment1");
			h1 = horiz;
			v1 = vert;
			h2 = horiz;
			v2 = vert+1;
			h3 = horiz;
			v3 = vert+2;
			h4 = horiz+1;
			v4 = vert+2;
		} else if (livePieceAlignment === 2) {
			console.log("Alignment2");
			h1 = horiz-1;
			v1 = vert-1;
			h2 = horiz;
			v2 = vert+1;
			h3 = horiz+1;
			v3 = vert;
			h4 = horiz+1;
			v4 = vert;
		} else if (livePieceAlignment === 3) {
			console.log("Alignment3");
			h1 = horiz-1;
			v1 = vert-1;
			h2 = horiz;
			v2 = vert+1;
			h3 = horiz+1;
			v3 = vert;
			h4 = horiz+1;
			v4 = vert;
		} else if (livePieceAlignment === 4) {
			console.log("Alignment4");
			h1 = horiz-1;
			v1 = vert-1;
			h2 = horiz;
			v2 = vert+1;
			h3 = horiz+1;
			v3 = vert;
			h4 = horiz+1;
			v4 = vert;
		}
	}
}

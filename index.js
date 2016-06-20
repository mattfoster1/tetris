var arraySet1 = []; //new array with ten undefined elements
var beat = 0;
var gameTime = [0,0];
var interval;
var xAxis;
var yAxis;
var arrivalTime;
var livePieceTime = 0;
var vert = livePieceTime; //timer value (pulls items downwards)
var horiz = 4; //a constant. Defines centerpoint. Items move away from it at the center. 
livePieceOnBoard = 0;
var livePieceShape;
var position1v = [];
var livePieceRotation;
var pauseState = false;
var downInterval;
var downval = 0; //to stop 'down' interval repeating
var beatTime = 500;
var condemnedLine;
var c1;

var deadCellArr = [];

var h1;
var v1;
var h2;
var v2;
var h3;
var v3;
var h4;
var v4;

var pc1;
var pc2;
var pc3;
var pc4;



var setGridtoZero = function() {

	for (xAxis = 0; xAxis < 10; xAxis++) {  // adds 0 to arrays
		var arraySet0 = [];
		for (yAxis = 0; yAxis < 22; yAxis++) {
				console.log("loop");
				arraySet0.push(0)
		};
		arraySet1.push(arraySet0); //ERROR - why is this only getting one instance of arraySet0, rather than 10?
	};
}

var fillOutGrid = function() {
	if (pauseState === false) {
		var toAdd = document.getElementById("addtohtml1");
		for (var xAxis = 0; xAxis < 10; xAxis++) {
			for (var yAxis = 0; yAxis < 22; yAxis++) { // xAxis === x , yAxis === y
				console.log("loop");
				
				var toAddChild = document.createElement("div" + xAxis); //creates all the divs, givs classes and IDs
				toAddChild.id = "cell x"+ xAxis + ", y" + yAxis;
				toAddChild.className = "empty";
				// console.dir(document.getElementById("e.g.").style.height);
				// var cellSize = document.getElementById("e.g.").style.height;
				// toAddChild.style.left = xAxis*30 + 'px';
				// toAddChild.style.top = yAxis*30 + 'px';

				toAddChild.style.left = xAxis*30 + 'px';
				toAddChild.style.top = yAxis*30 + 'px';
				// toAddChild.innerHTML = arraySet1[xAxis][yAxis];
				
				if (arraySet1[xAxis][yAxis] === 1) { //sets up secondary class (for active cells)
					// toAddChild.className = "fullCell";

				} else if (arraySet1[xAxis][yAxis] === 2){
					// toAddChild.className = "trial3";
					// console.log("One made Yellow " + horiz + ", " + vert);

				} else if (arraySet1[xAxis][yAxis] <= -25){
					// toAddChild.className = "deadCell";
					// console.log("One made gray " + horiz + ", " + vert);
				}

				toAdd.appendChild(toAddChild); //applies it all!
			}
		}
	}
}

var theBeat = function() {
	// console.log("Beat = " + beat);

	if (pauseState === false) {
		
		var boardLimit = 23;
		if (beat >= boardLimit) {
			console.log("killa");
			killPiece();
			// fillOutGrid();
		}

		if (beat < boardLimit) { // this will need to be 20 as a cap
			vert = livePieceTime+1;
			
			
			if (livePieceShape === "L") {
				shapeL();
			} else if (livePieceShape === "i") {
				shapeI();
			} else if (livePieceShape === "Z") {
				shapeZ();
			} else if (livePieceShape === "N") {
				shapeN();
			} else if (livePieceShape === "sq") {
				shapeSq();
			} else if (livePieceShape === "T") {
				shapeT();
			}
		
			// vert = livePieceTime+1;
			beat++;		
			livePieceTime++	
		
		} else {
			killPiece();
		}
		
		// console.log("livePieceOnBoard = " + livePieceOnBoard);
		if (livePieceOnBoard === 0) {
			console.log("livePieceOnBoard is zero, setting RSG");
			randomShapeGenerator();
		}
	}
	// console.log("Beat_fillOutGrid");
	//fillOutGrid
	
}

var start = function() {
	setGridtoZero();
	var interval = setInterval(function(){theBeat();}, beatTime);
	fillOutGrid();
	// var interval = setInterval(function(){fillOutGrid();}, beatTime);
	console.log("start");
}

var randomShapeGenerator = function() {
	console.log("NOTIFICATION: randomShapeGenerator triggered");
	// console.log("livePieceOnBoard = " + livePieceOnBoard);
	livePieceOnBoard = 1;
	
	var arrivalTime = gameTime;

	var randomNo = Math.floor(Math.random()*5);
	if (randomNo == 0) {
		livePieceShape = "L";
	} else if (randomNo == 1) {
		livePieceShape = "Z";
	} else if (randomNo == 2) {
		livePieceShape = "i";
	} else if (randomNo == 3) {
		livePieceShape = "sq";
	} else if (randomNo == 4) {
		livePieceShape = "T";
	}

	// console.log(randomNo);

	// livePieceShape = "i"; //PLACEHOLDER -- needs to be removed when RSG is uncommented
	
	livePieceRotation = 1;
	livePieceTime = 0;
	// vert = 4;
	beat = 0;
}

var shapeL = function() {
	getRotation();
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1); //cell #1
	var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	var c4 = document.getElementById("cell x" + h4 + ", y" + v4);
	
	if (v1 > 0) {
		var c1m = document.getElementById("cell x" + h1 + ", y" + (v1-1)); // the cell directly above cell #1
		var c2m = document.getElementById("cell x" + h2 + ", y" + (v2-1));
		var c3m = document.getElementById("cell x" + h3 + ", y" + (v3-1));
		var c4m = document.getElementById("cell x" + h4 + ", y" + (v4-1));
		
		if (c1m && c2m && c3m && c4m) {
			if (livePieceRotation === 1) { //clears excess or junk squares off board
				c1m.className = "empty"; //top-1
				c4m.className = "empty"; //bottom right-1
			} else if  (livePieceRotation === 2) {
				c1m.className = "empty";
				c2m.className = "empty";
				c3m.className = "empty";
			} else if  (livePieceRotation === 3) {
				c3m.className = "empty";
				c4m.className = "empty";
			} else if  (livePieceRotation === 4) {
				c1m.className = "empty";
				c2m.className = "empty";
				c4m.className = "empty";
			}
		}
	}
	// vv fills out appropriate cells vv
	c1.className = "fullCell"; //top
	c2.className = "fullCell"; //second from top
	c3.className = "fullCell"; //bottom
	c4.className = "fullCell"; //bottom right
	bottomChecker();
}

var shapeZ = function() {
	getRotation();
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1); //cell #1
		var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
		var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
		var c4 = document.getElementById("cell x" + h4 + ", y" + v4);
		
		if (v1 > 0) {
			var c1m = document.getElementById("cell x" + h1 + ", y" + (v1-1)); // the cell directly above cell #1
			var c2m = document.getElementById("cell x" + h2 + ", y" + (v2-1));
			var c3m = document.getElementById("cell x" + h3 + ", y" + (v3-1));
			var c4m = document.getElementById("cell x" + h4 + ", y" + (v4-1));

			if (c1m && c2m && c3m && c4m) {
				if (livePieceRotation === 1 || livePieceRotation === 3) { //clears excess or junk squares off board
					c1m.className = "empty"; //top-1
					c3m.className = "empty"; 
					// console.log("LPR");
				} else if  (livePieceRotation === 2 || livePieceRotation === 4) {
					c1m.className = "empty"; 
					c3m.className = "empty"; 
					c4m.className = "empty"; 
				}
			}
		}
	c1.className = "fullCell";
	c2.className = "fullCell";
	c3.className = "fullCell";
	c4.className = "fullCell";
	bottomChecker();
}

var shapeI = function() {
	getRotation();
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1); //cell #1
	var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	var c4 = document.getElementById("cell x" + h4 + ", y" + v4);
	
	if (v1 > 0) {
		var c1m = document.getElementById("cell x" + h1 + ", y" + (v1-1)); // the cell directly above cell #1
		var c2m = document.getElementById("cell x" + h2 + ", y" + (v2-1));
		var c3m = document.getElementById("cell x" + h3 + ", y" + (v3-1));
		var c4m = document.getElementById("cell x" + h4 + ", y" + (v4-1));
		
		if (c1m && c2m && c3m && c4m) {
			if (livePieceRotation === 1 || livePieceRotation === 3) { //clears excess or junk squares off board
				c1m.className = "empty";
				c2m.className = "empty";
				c3m.className = "empty";
				c4m.className = "empty";
			} else if  (livePieceRotation === 2 || livePieceRotation === 4) {
				c1m.className = "empty";
			}
		}
	}
	
	// vv fills out appropriate cells vv
	c1.className = "fullCell"; //top
	c2.className = "fullCell"; //second from top
	c3.className = "fullCell"; //bottom
	c4.className = "fullCell"; //bottom right
	bottomChecker();
}

var shapeSq = function() {
	getRotation();
		
		var c1 = document.getElementById("cell x" + h1 + ", y" + v1); //cell #1
		var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
		var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
		var c4 = document.getElementById("cell x" + h4 + ", y" + v4);
		
		if (v1 > 0) {
			var c1m = document.getElementById("cell x" + h1 + ", y" + (v1-1)); // the cell directly above cell #1
			var c2m = document.getElementById("cell x" + h2 + ", y" + (v2-1));
			var c3m = document.getElementById("cell x" + h3 + ", y" + (v3-1));
			var c4m = document.getElementById("cell x" + h4 + ", y" + (v4-1));
			
			if (c1m && c2m && c3m && c4m) {
				c1m.className = "empty"; //clears excess or junk squares off board
				c2m.className = "empty";
			}
		}
	
	c1.className = "fullCell";
	c2.className = "fullCell";
	c3.className = "fullCell";
	c4.className = "fullCell";
	bottomChecker();
}

var shapeT = function() {
	// console.log("shapeT func");
	getRotation();
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1); //cell #1
	var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	var c4 = document.getElementById("cell x" + h4 + ", y" + v4);
	
	if (v1 > 0) {
		var c1m = document.getElementById("cell x" + h1 + ", y" + (v1-1)); // the cell directly above cell #1
		var c2m = document.getElementById("cell x" + h2 + ", y" + (v2-1));
		var c3m = document.getElementById("cell x" + h3 + ", y" + (v3-1));
		var c4m = document.getElementById("cell x" + h4 + ", y" + (v4-1));
		
		if (c1m && c2m && c3m && c4m) {
			if (livePieceRotation === 1) { //clears excess or junk squares off board
				c1m.className = "empty"; //top-1
				c2m.className = "empty";
				c3m.className = "empty";
			} else if  (livePieceRotation === 2) {
				c1m.className = "empty";
				c4m.className = "empty";
			} else if  (livePieceRotation === 3) {
				c1m.className = "empty";
				c3m.className = "empty";
				c4m.className = "empty";
			} else if  (livePieceRotation === 4) {
				c1m.className = "empty";
				c4m.className = "empty";
			}
		}
	}
	// vv fills out appropriate cells vv
	c1.className = "fullCell"; //top
	c2.className = "fullCell"; //second from top
	c3.className = "fullCell"; //bottom
	c4.className = "fullCell"; //bottom right
	bottomChecker();
}

document.onkeydown = function(checkKeyPressed){
	// if (pauseState == false && livePieceOnBoard == 1) { //NEEDS to be reactivated!

 	    if(checkKeyPressed.keyCode == 68){
	        savePrevCells();//saves cells of the previous rotation
	    	wipePrevCells();//wipes cells of the previous rotation
	        goRight();
	    } else if (checkKeyPressed.keyCode == 65){
	        savePrevCells();
	    	wipePrevCells();
	        goLeft();
	    } else if (checkKeyPressed.keyCode == 37){
	    	savePrevCells();
	    	wipePrevCells();
	    	CCW();
	    } else if (checkKeyPressed.keyCode == 39){
	    	savePrevCells();
	    	wipePrevCells();
	    	clockwise();
	    } else if (checkKeyPressed.keyCode == 32 || checkKeyPressed.keyCode == 40){
	    	if (downval == 0) {
	    		savePrevCells();
	    		wipePrevCells();
	    		down();
	    	}
	    }
	// }
	    
  		// console.log("keypress");
  		// console.dir(arraySet1[7][21]);
}

var goLeft = function() {
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1); //cell #1
	var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	var c4 = document.getElementById("cell x" + h4 + ", y" + v4);

	var c1l = document.getElementById("cell x" + (h1-1) + ", y" + v1); //the cell to the immediate left of cell #1
	var c2l = document.getElementById("cell x" + (h2-1) + ", y" + v2);
	var c3l = document.getElementById("cell x" + (h3-1) + ", y" + v3);
	var c4l = document.getElementById("cell x" + (h4-1) + ", y" + v4);

	getRotation();

	if (
		livePieceOnBoard == 1
		&& c1l.className != "deadCell"
	 	&& c2l.className != "deadCell"
	 	&& c3l.className != "deadCell"
	 	&& c4l.className != "deadCell" //checks nothing to the right of the piece
	 	&& horiz >= 1) { //checks not at the left edge of the board
		
		horiz -= 1;
		
		// c1.className = "empty";
		// c2.className = "empty";
		// c3.className = "empty";
		// c4.className = "empty";
		// c1l.className = "fullCell";
		// c2l.className = "fullCell";
		// c3l.className = "fullCell";
		// c4l.className = "fullCell";

		if (livePieceShape === "L") {
			shapeL();
		} else if (livePieceShape === "i") {
			shapeI();
		} else if (livePieceShape === "Z") {
			shapeZ();
		} else if (livePieceShape === "N") {
			shapeN();
		} else if (livePieceShape === "sq") {
			shapeSq();
		} else if (livePieceShape === "T") {
			shapeT();
		} 
	}
}

var goRight = function() {
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1); //cell #1
	var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	var c4 = document.getElementById("cell x" + h4 + ", y" + v4);

	var c1r = document.getElementById("cell x" + (h1+1) + ", y" + v1); //the cell to the immediate right of cell #1
	var c2r = document.getElementById("cell x" + (h2+1) + ", y" + v2);
	var c3r = document.getElementById("cell x" + (h3+1) + ", y" + v3);
	var c4r = document.getElementById("cell x" + (h4+1) + ", y" + v4);

	if (
		livePieceOnBoard == 1
		&& c1r.className != "deadCell" 
	 	&& c2r.className != "deadCell"
	 	&& c3r.className != "deadCell"
	 	&& c4r.className != "deadCell" //checks nothing to the right of the piece
	 	&& horiz <= 8) { //checks not at the right edge of the board
	
	getRotation();

	horiz += 1;

	// c1.className = "empty";
	// c2.className = "empty";
	// c3.className = "empty";
	// c4.className = "empty";
	// c1r.className = "fullCell";
	// c2r.className = "fullCell";
	// c3r.className = "fullCell";
	// c4r.className = "fullCell";

	if (livePieceShape === "L") {
			shapeL();
		} else if (livePieceShape === "i") {
			shapeI();
		} else if (livePieceShape === "Z") {
			shapeZ();
		} else if (livePieceShape === "N") {
			shapeN();
		} else if (livePieceShape === "sq") {
			shapeSq();
		} else if (livePieceShape === "T") {
			shapeT();
		}
	}
}

var CCW = function() { //rotate counter clockwise
	// var c1CCW = document.getElementById("cell x" + h1 + ", y" + v1); //cell #1
	// var c2CCW = document.getElementById("cell x" + h2 + ", y" + v2);
	// var c3CCW = document.getElementById("cell x" + h3 + ", y" + v3);
	// var c4CCW = document.getElementById("cell x" + h4 + ", y" + v4);

	if ((livePieceRotation == 1 || livePieceRotation == 3) && (horiz <= 0 || horiz >= 9)) { // will need to be altered for 'shapeI'
		
	} else {
		if (livePieceRotation === 1){
			livePieceRotation = 4;
		} else {
			livePieceRotation--;
		}
		getRotation();

		if (livePieceShape === "L") {
			shapeL();
		} else if (livePieceShape === "i") {
			shapeI();
		} else if (livePieceShape === "Z") {
			shapeZ();
		} else if (livePieceShape === "N") {
			shapeN();
		} else if (livePieceShape === "sq") {
			shapeSq();
		} else if (livePieceShape === "T") {
			shapeT();
		}
	}
}

var clockwise = function() { //rotate counter clockwise
	// var c1cl = document.getElementById("cell x" + h1 + ", y" + v1); //cell #1
	// var c2cl = document.getElementById("cell x" + h2 + ", y" + v2);
	// var c3cl = document.getElementById("cell x" + h3 + ", y" + v3);
	// var c4cl = document.getElementById("cell x" + h4 + ", y" + v4);

	if ((livePieceRotation == 1 || livePieceRotation == 3) && (horiz <= 0 || horiz >= 9)) { // will need to be altered for 'shapeI'
		
	} else {
		if (livePieceRotation === 4){
			livePieceRotation = 1;
		} else {
			livePieceRotation++;
		}
		getRotation();
		if (livePieceShape === "L") {
			shapeL();
		} else if (livePieceShape === "i") {
			shapeI();
		} else if (livePieceShape === "Z") {
			shapeZ();
		} else if (livePieceShape === "N") {
			shapeN();
		} else if (livePieceShape === "sq") {
			shapeSq();
		} else if (livePieceShape === "T") {
			shapeT();
		}
	}
	//fillOutGrid
}

var down = function() {
	downval = 1; //stops interval repeating
	// clearInterval(interval);
	downInterval = setInterval(function(){theBeat();}, 50);
}

var getRotation = function() { //rotation
	// console.log("Getting Rotation...");

	if (livePieceShape === "L") {
		if (livePieceRotation === 1) {
			// console.log("___Rotation1___");
			h1 = horiz;
			v1 = vert-1;
			h2 = horiz;
			v2 = vert
			h3 = horiz;
			v3 = vert+1;
			h4 = horiz+1;
			v4 = vert+1;
		} else if (livePieceRotation === 2) {
			// console.log("___Rotation2___");
			h1 = horiz+1;
			v1 = vert;
			h2 = horiz;
			v2 = vert;
			h3 = horiz-1;
			v3 = vert;
			h4 = horiz-1;
			v4 = vert+1;
		} else if (livePieceRotation === 3) {
			// console.log("___Rotation3___");
			h1 = horiz;
			v1 = vert+1;
			h2 = horiz;
			v2 = vert;
			h3 = horiz;
			v3 = vert-1;
			h4 = horiz-1;
			v4 = vert-1;
		} else if (livePieceRotation === 4) {
			// console.log("___Rotation4___");
			h1 = horiz-1;
			v1 = vert;
			h2 = horiz;
			v2 = vert;
			h3 = horiz+1;
			v3 = vert;
			h4 = horiz+1;
			v4 = vert-1;
		}
	} else if (livePieceShape === "Z") {
		if (livePieceRotation === 1 || livePieceRotation === 3) {
			// console.log("___Rotation1___");
			h1 = horiz+1;
			v1 = vert-1;
			h2 = horiz+1;
			v2 = vert;
			h3 = horiz;
			v3 = vert;
			h4 = horiz;
			v4 = vert+1;
		} else if (livePieceRotation === 2 || livePieceRotation === 4) {
			// console.log("___Rotation2___");
			h1 = horiz+1;
			v1 = vert;
			h2 = horiz;
			v2 = vert;
			h3 = horiz;
			v3 = vert-1;
			h4 = horiz-1;
			v4 = vert-1;
		}
	} else if (livePieceShape === "i") {
		if (livePieceRotation === 1 || livePieceRotation === 3) {
			// console.log("___Rotation1___");
			h1 = horiz-2;
			v1 = vert;
			h2 = horiz-1;
			v2 = vert;
			h3 = horiz;
			v3 = vert;
			h4 = horiz+1;
			v4 = vert;
		} else if (livePieceRotation === 2 || livePieceRotation === 4) {
			// console.log("___Rotation2___");
			h1 = horiz;
			v1 = vert-1;
			h2 = horiz;
			v2 = vert;
			h3 = horiz;
			v3 = vert+1;
			h4 = horiz;
			v4 = vert+2;
		}
	} else if (livePieceShape === "sq") {
			h1 = horiz;
			v1 = vert-1;
			h2 = horiz+1;
			v2 = vert-1;
			h3 = horiz+1;
			v3 = vert;
			h4 = horiz;
			v4 = vert;
	} else if (livePieceShape === "T") {
		if (livePieceRotation === 1) {
			// console.log("___Rotation1___");
			h1 = horiz-1;
			v1 = vert;
			h2 = horiz;
			v2 = vert
			h3 = horiz+1;
			v3 = vert;
			h4 = horiz;
			v4 = vert+1;
		} else if (livePieceRotation === 2) {
			// console.log("___Rotation2___");
			h1 = horiz;
			v1 = vert-1;
			h2 = horiz;
			v2 = vert;
			h3 = horiz;
			v3 = vert+1;
			h4 = horiz-1;
			v4 = vert;
		} else if (livePieceRotation === 3) {
			// console.log("___Rotation3___");
			h1 = horiz-1;
			v1 = vert;
			h2 = horiz;
			v2 = vert;
			h3 = horiz+1;
			v3 = vert;
			h4 = horiz;
			v4 = vert-1;
		} else if (livePieceRotation === 4) {
			// console.log("___Rotation4___");
			h1 = horiz;
			v1 = vert-1;
			h2 = horiz;
			v2 = vert;
			h3 = horiz;
			v3 = vert+1;
			h4 = horiz+1;
			v4 = vert;
		}
	}
}

var killPiece = function() {
		// arraySet1[h1][v1] = -25; //top
		// arraySet1[h2][v2] = -25; //second from top
		// arraySet1[h3][v3] = -25; //bottom
		// arraySet1[h4][v4] = -25;//bottom right

		var c1 = document.getElementById("cell x" + h1 + ", y" + v1); //cell #1
		var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
		var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
		var c4 = document.getElementById("cell x" + h4 + ", y" + v4);

		c1.className = "deadCell";
		c2.className = "deadCell";
		c3.className = "deadCell";
		c4.className = "deadCell";

		// console.log("livePieceRotation = " + livePieceRotation);
		downval = 0;
		clearInterval(downInterval);
		console.log("downInterval cleared");
		// var interval = setInterval(function(){theBeat();}, beatTime);
		livePieceOnBoard = 0;
		beat = 0;
		livePieceTime = 0;
		horiz = 4;
		
		console.log("beat = " + beat);
		console.log("---------------dead-----");


		lineCheck();
}

var lineCheck = function() { //checks for a continuous horizontal line of blocks on any part of the board
	for (var yAxis = 0; yAxis < 22; yAxis++) {
		var deadCellCount = 0;

		for (var xAxis = 0; xAxis < 10; xAxis++) {
			// console.log("cellCheck_loop");

			c1 = document.getElementById("cell x" + xAxis + ", y" + yAxis);
			if (c1.className == "deadCell") {
				deadCellCount++
				// console.log("DCC= " + deadCellCount);

				if (deadCellCount >= 10) {//checks that ten cells in a row are 'dead'
					var y1 = yAxis;
					setTimeout(function(){

						console.log("wipeLine1");
						console.log("pause");
						pause();

						for (var x = 0; x < 10; x++) { //wipes the line in question
							var c2 = document.getElementById("cell x" + x + ", y" + y1);
							// console.log(x);
							// console.log(y1);
							c2.className = "trial3"; //yellow - will be changed to "empty"
							// c2.className = "empty";
							// console.log("wipeloop");
						}
					}, 1000);


					setTimeout(function(){
						for (var x = 0; x < 10; x++) { 
							for (var y = 0; y < y1; y++) {
								var c3 = document.getElementById("cell x" + x + ", y" + y); //the cell in question
								var c3u = document.getElementById("cell x" + x + ", y" + (y+1)); //the cell directly underneath c3
								if (c3.className == "deadCell") {
									c3u.className = "deadCell";
									c3.className = "trial4"; //goldenrod
									
									//ISSUE: what if there is a gap/air-hole?
									// console.log("cellChange");
								}
							}
						} //end of 10x loop
					console.log("pause");
					pause();
					}, 2000);
				} // end of wipeLine func
			} else {
				// console.log("cell line incomplete");
				// return;
			}
		}
	}
}

var wipeLine = function() {
	console.log("line wiped");

	//1. pause beat for duration
	//2. wipe var condemnedline, wait one var 'beatTime'
	//3. yAxis -1 for all lines above condemnedLine// can probably be deleted now
}

var bottomChecker = function() { //checks for dead cells or end of board below piece. Kills Live Piece if finds.
	var c1u = document.getElementById("cell x" + h1 + ", y" + (v1+1)); // the cell directly underneath cell #1
	var c2u = document.getElementById("cell x" + h2 + ", y" + (v2+1));
	var c3u = document.getElementById("cell x" + h3 + ", y" + (v3+1));
	var c4u = document.getElementById("cell x" + h4 + ", y" + (v4+1));

	if (c1u == null || c2u == null || c3u == null || c4u == null //end of board 
	|| c1u.className == "deadCell" || c2u.className == "deadCell" || c3u.className == "deadCell" || c4u.className == "deadCell" ) { //if any dead pieces below:
		console.log("bottomChecker triggered");
		killPiece();
	} else {
		// console.log("bottomChecker _ NOT _ triggered");		
	}
}

var pause = function() {
	if (pauseState == true) {
		pauseState = false;
	} else if (pauseState == false) {
		pauseState = true;
	}

	console.log("pause");
}

var wipeCells = function() { // probably not needed any more
	// var c1 = document.getElementById("cell x" + h1 + ", y" + v1);
	// var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	// var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	// var c4 = document.getElementById("cell x" + h4 + ", y" + v4);

	// c1.className = "empty";
	// c2.className = "empty";
	// c3.className = "empty";
	// c4.className = "empty";
}

var savePrevCells = function() {
	pc1 = document.getElementById("cell x" + h1 + ", y" + v1);
	pc2 = document.getElementById("cell x" + h2 + ", y" + v2);
	pc3 = document.getElementById("cell x" + h3 + ", y" + v3);
	pc4 = document.getElementById("cell x" + h4 + ", y" + v4);
}

var wipePrevCells = function() {
	pc1.className = "empty";
	pc2.className = "empty";
	pc3.className = "empty";
	pc4.className = "empty";
}

var showInstr = function() {
// 	if (document.getElementById("instructions").style.height == "0px") {
// 		document.getElementById("instructions").style.height = "400px";
// 		console.log("1");
// 	} else if (document.getElementById("instructions").style.display >= "400px") {
// 		document.getElementById("instructions").style.display = "0px";
// 		console.log("2");
// 	}

 	if (document.getElementById("instructions").className == "iSmall") {
		document.getElementById("instructions").className = "iBig";
		document.getElementById("instrBtn").innerHTML = "close";
		console.log("1");
	} else if (document.getElementById("instructions").className == "iBig") {
		document.getElementById("instructions").className = "iSmall";
		document.getElementById("instrBtn").innerHTML = "Instructions";
		console.log("2");
	}



	console.log("3");
}

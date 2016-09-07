var arraySet1 = [];//new array with ten undefined elements
var beat = 0;
var gameTime = [0,0];
var interval;
var xAxis;
var yAxis;
var arrivalTime;
var livePieceTime = 0;
var vert = livePieceTime;//timer value (pulls items downwards)
var horiz = 4;//a constant. Defines centerpoint. Items move away from it at the center. 
var livePieceOnBoard = 0;
var livePieceShape, nextPieceShape;
var position1v = [];
var livePieceRotation;
var pauseState = false;
var downInterval;
var downval = 0;//to stop 'down' interval repeating
var beatTime = 500;
var jsScore = 0;
var level = 1;
var condemnedLine;
// var c1, c2, c3, c4, c1m, c2m, c3m, c4m, c1r, c2r, c3r, c4r, c1u, c2u, c3u, c4u;
var h1, v1, h2, v2, h3, v3, h4, v4, ppp, x, y;
var pc1, pc2, pc3, pc4;

var setGridtoZero = function() {
	for (xAxis = 0; xAxis < 10; xAxis+=1) {// adds 0 to arrays
		var arraySet0 = [];
		for (yAxis = 0; yAxis < 22; yAxis+=1) {
				console.log("loop");
				arraySet0.push(0);
		}
		arraySet1.push(arraySet0);
	}
};

var fillOutGrid = function() {
	if (pauseState === false) {
		var toAdd = document.getElementById("addtohtml1");
		for (xAxis = 0; xAxis < 10; xAxis+=1) {
			for (yAxis = 0; yAxis < 22; yAxis+=1) {
				console.log("loop");
				var toAddChild = document.createElement("div" + xAxis);//creates all the divs, givs classes and IDs
				toAddChild.id = "cell x"+ xAxis + ", y" + yAxis;
				toAddChild.className = "empty";
				var cellSize = document.getElementById("example"); //looks at template for cell size in CSS, uses it to calculate where everything in grid goes
				var cellSize1 = window.getComputedStyle(cellSize, null).height;
				var cellSize2 = (JSON.stringify(cellSize1)).slice(1, -3);
				
				if (window.innerWidth > window.innerHeight) {
					toAddChild.style.left = (xAxis*cellSize2) + (xAxis) + "px";
					toAddChild.style.top = (yAxis*cellSize2) + (yAxis) +  "px";

				} else {
					toAddChild.style.left = (xAxis*cellSize2) + (xAxis*2) + "px";
					toAddChild.style.top = (yAxis*cellSize2) + (yAxis*2) + "px";
					
				}


				toAdd.appendChild(toAddChild);//applies it all!
			}
		}
	}
};

var theBeat = function() {
	if (pauseState === false) {
		if (livePieceOnBoard === 0) {
			pieceGenerator();
		}

		var boardLimit = 23;
		if (beat >= boardLimit) {
			killPiece();
		}

		if (beat < boardLimit) {// this will need to be 20 as a cap
			vert = livePieceTime+1;		
			
			if (livePieceShape === "L") {
				shapeL();
			} else if (livePieceShape === "i") {
				shapeI();
			} else if (livePieceShape === "Z") {
				shapeZ();
			// } else if (livePieceShape === "N") {
			// 	shapeN();
			} else if (livePieceShape === "sq") {
				shapeSq();
			} else if (livePieceShape === "T") {
				shapeT();
			}
			beat++;		
			livePieceTime++;
		} else {
			killPiece();
		}	
	}
};

var start = function() {
	setGridtoZero();
	fillOutGrid();
	console.log("start");
};

var gameStart = function() {
	var GO_Bgr = document.getElementById("gameOverOverlay");
	GO_Bgr.style.opacity = "0";
	document.getElementById("startBtn").blur();

	interval = setInterval(function(){theBeat(); console.log(1);}, beatTime);
}

var pieceGenerator = function() {
	// console.log("NOTIFICATION: randomShapeGenerator triggered");
	// console.log("livePieceOnBoard = " + livePieceOnBoard);
	livePieceOnBoard = 1;
		arrivalTime = gameTime;

	if (nextPieceShape === undefined) {
		randomShapeGenerator();
	}
	
	livePieceShape = nextPieceShape;//move upcoming piece from memory to put on board
	// console.log(nextPieceShape);

	randomShapeGenerator();
	// livePieceShape = "i";//PLACEHOLDER 
	
	livePieceRotation = 1;
	livePieceTime = 0;
	// vert = 4;
	beat = 0;
	// console.log(nextPieceShape);
};

var randomShapeGenerator = function() {
	var randomNo = Math.floor(Math.random()*5);
	if (randomNo === 0) {
		nextPieceShape = "L";
	} else if (randomNo === 1) {
		nextPieceShape = "Z";
	} else if (randomNo === 2) {
		nextPieceShape = "i";
	} else if (randomNo === 3) {
		nextPieceShape = "sq";
	} else if (randomNo === 4) {
		nextPieceShape = "T";
	}
	
	nextPiecePop();
};

var nextPiecePop = function() {//shows the next piece to appear
	if (nextPieceShape === "L") {
		document.getElementById("nextPiece").style.background = "url('images/L_screenshot.png') no-repeat center center";
	} else if (nextPieceShape === "Z") {
		document.getElementById("nextPiece").style.background = "url('images/z_screenshot.png') no-repeat center center";
	} else if (nextPieceShape === "i") {
		document.getElementById("nextPiece").style.background = "url('images/line_screenshot.png') no-repeat center center";
	} else if (nextPieceShape === "sq") {
		document.getElementById("nextPiece").style.background = "url('images/sq_screenshot.png') no-repeat center center";
	} else if (nextPieceShape === "T") {
		document.getElementById("nextPiece").style.background = "url('images/T_screenshot.png') no-repeat center center";
	}
};

var shapeL = function() {
	getRotation();
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1);//cell #1
	var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	var c4 = document.getElementById("cell x" + h4 + ", y" + v4);
	
	if (v1 > 0) {
		var c1m = document.getElementById("cell x" + h1 + ", y" + (v1-1));// the cell directly above cell #1
		var c2m = document.getElementById("cell x" + h2 + ", y" + (v2-1));
		var c3m = document.getElementById("cell x" + h3 + ", y" + (v3-1));
		var c4m = document.getElementById("cell x" + h4 + ", y" + (v4-1));
		
		if (c1m && c2m && c3m && c4m) {
			if (livePieceRotation === 1) {//clears excess or junk squares off board
				c1m.className = "empty";//top-1
				c4m.className = "empty";//bottom right-1
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
	c1.className = "fullCell";//top
	c2.className = "fullCell";//second from top
	c3.className = "fullCell";//bottom
	c4.className = "fullCell";//bottom right
	bottomChecker();
};

var shapeZ = function() {
	getRotation();
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1);//cell #1
	var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	var c4 = document.getElementById("cell x" + h4 + ", y" + v4);
		
	if (v1 > 0) {
		var c1m = document.getElementById("cell x" + h1 + ", y" + (v1-1));// the cell directly above cell #1
		var c2m = document.getElementById("cell x" + h2 + ", y" + (v2-1));
		var c3m = document.getElementById("cell x" + h3 + ", y" + (v3-1));
		var c4m = document.getElementById("cell x" + h4 + ", y" + (v4-1));

		if (c1m && c2m && c3m && c4m) {
			if (livePieceRotation === 1 || livePieceRotation === 3) {//clears excess or junk squares off board
				c1m.className = "empty";//top-1
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
};

var shapeI = function() {
	getRotation();
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1);//cell #1
	var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	var c4 = document.getElementById("cell x" + h4 + ", y" + v4);
	
	if (v1 > 0) {
		var c1m = document.getElementById("cell x" + h1 + ", y" + (v1-1));// the cell directly above cell #1
		var c2m = document.getElementById("cell x" + h2 + ", y" + (v2-1));
		var c3m = document.getElementById("cell x" + h3 + ", y" + (v3-1));
		var c4m = document.getElementById("cell x" + h4 + ", y" + (v4-1));
		
		if (c1m && c2m && c3m && c4m) {
			if (livePieceRotation === 1 || livePieceRotation === 3) {//clears excess or junk squares off board
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
	c1.className = "fullCell";//top
	c2.className = "fullCell";//second from top
	c3.className = "fullCell";//bottom
	c4.className = "fullCell";//bottom right
	bottomChecker();
};

var shapeSq = function() {
	getRotation();
		
		var c1 = document.getElementById("cell x" + h1 + ", y" + v1);//cell #1
		var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
		var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
		var c4 = document.getElementById("cell x" + h4 + ", y" + v4);
		
		if (v1 > 0) {
			var c1m = document.getElementById("cell x" + h1 + ", y" + (v1-1));// the cell directly above cell #1
			var c2m = document.getElementById("cell x" + h2 + ", y" + (v2-1));
			var c3m = document.getElementById("cell x" + h3 + ", y" + (v3-1));
			var c4m = document.getElementById("cell x" + h4 + ", y" + (v4-1));
			
			if (c1m && c2m && c3m && c4m) {
				c1m.className = "empty";//clears excess or junk squares off board
				c2m.className = "empty";
			}
		}
	
	c1.className = "fullCell";
	c2.className = "fullCell";
	c3.className = "fullCell";
	c4.className = "fullCell";
	bottomChecker();
};

var shapeT = function() {
	// console.log("shapeT func");
	getRotation();
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1);//cell #1
	var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	var c4 = document.getElementById("cell x" + h4 + ", y" + v4);
	
	if (v1 > 0) {
		var c1m = document.getElementById("cell x" + h1 + ", y" + (v1-1));// the cell directly above cell #1
		var c2m = document.getElementById("cell x" + h2 + ", y" + (v2-1));
		var c3m = document.getElementById("cell x" + h3 + ", y" + (v3-1));
		var c4m = document.getElementById("cell x" + h4 + ", y" + (v4-1));
		
		if (c1m && c2m && c3m && c4m) {
			if (livePieceRotation === 1) {//clears excess or junk squares off board
				c1m.className = "empty";//top-1
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
	c1.className = "fullCell";//top
	c2.className = "fullCell";//second from top
	c3.className = "fullCell";//bottom
	c4.className = "fullCell";//bottom right
	bottomChecker();
};

document.onkeydown = function(checkKeyPressed){
	if (pauseState === false && livePieceOnBoard === 1) {

 	    if(checkKeyPressed.keyCode === 68){
	        savePrevCells();//saves cells of the previous rotation
	    	wipePrevCells();//wipes cells of the previous rotation
	        goRight();
	    } else if (checkKeyPressed.keyCode === 65){
	        savePrevCells();
	    	wipePrevCells();
	        goLeft();
	    } else if (checkKeyPressed.keyCode === 37){
	    	savePrevCells();
	    	wipePrevCells();
	    	CCW();
	    } else if (checkKeyPressed.keyCode === 39){
	    	savePrevCells();
	    	wipePrevCells();
	    	clockwise();
	    } else if (checkKeyPressed.keyCode === 32 || checkKeyPressed.keyCode === 40){
	    	if (downval === 0) {
	    		savePrevCells();
	    		wipePrevCells();
	    		down();
	    	}
	    }
	}
};

var cPadPress = function(cPadKey) {
	if (pauseState === false && livePieceOnBoard === 1) {

 	    if(cPadKey === "right"){
	        savePrevCells();//saves cells of the previous rotation
	    	wipePrevCells();//wipes cells of the previous rotation
	        goRight();
	    } else if (cPadKey === "left"){
	        savePrevCells();
	    	wipePrevCells();
	        goLeft();
	    } else if (cPadKey === "rot"){
	    	savePrevCells();
	    	wipePrevCells();
	    	CCW();
	    } else if (cPadKey === "down"){
	    	if (downval === 0) {
	    		savePrevCells();
	    		wipePrevCells();
	    		down();
	    	}
	    }
	}
};

var goLeft = function() {
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1);//cell #1
	var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	var c4 = document.getElementById("cell x" + h4 + ", y" + v4);

	var c1l = document.getElementById("cell x" + (h1-1) + ", y" + v1);//the cell to the immediate left of cell #1
	var c2l = document.getElementById("cell x" + (h2-1) + ", y" + v2);
	var c3l = document.getElementById("cell x" + (h3-1) + ", y" + v3);
	var c4l = document.getElementById("cell x" + (h4-1) + ", y" + v4);

	// console.log(livePieceOnBoard);

	if (
		livePieceOnBoard === 1
		&& c1l
	 	&& c2l
	 	&& c3l
	 	&& c4l
		&& c1l.className !== "deadCell"
	 	&& c2l.className !== "deadCell"
	 	&& c3l.className !== "deadCell"
	 	&& c4l.className !== "deadCell"//checks nothing to the left of the piece
	 	&& horiz >= 1) {//checks not at the left edge of the board
		
		getRotation();		
		horiz -= 1;

		if (livePieceShape === "L") {
			shapeL();
		} else if (livePieceShape === "i") {
			shapeI();
		} else if (livePieceShape === "Z") {
			shapeZ();
		} else if (livePieceShape === "sq") {
			shapeSq();
		} else if (livePieceShape === "T") {
			shapeT();
		} 
	}
};

var goRight = function() {
	var c1 = document.getElementById("cell x" + h1 + ", y" + v1);//cell #1
	var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	var c4 = document.getElementById("cell x" + h4 + ", y" + v4);

	var c1r = document.getElementById("cell x" + (h1+1) + ", y" + v1);//the cell to the immediate right of cell #1
	var c2r = document.getElementById("cell x" + (h2+1) + ", y" + v2);
	var c3r = document.getElementById("cell x" + (h3+1) + ", y" + v3);
	var c4r = document.getElementById("cell x" + (h4+1) + ", y" + v4);

	if (
		livePieceOnBoard === 1
		&& c1r
	 	&& c2r
	 	&& c3r
	 	&& c4r
		&& c1r.className !== "deadCell" 
	 	&& c2r.className !== "deadCell"
	 	&& c3r.className !== "deadCell"
	 	&& c4r.className !== "deadCell"//checks nothing to the right of the piece
	 	&& horiz <= 8) {//checks not at the right edge of the board
	
	getRotation();
	horiz += 1;

	if (livePieceShape === "L") {
			shapeL();
		} else if (livePieceShape === "i") {
			shapeI();
		} else if (livePieceShape === "Z") {
			shapeZ();
		} else if (livePieceShape === "sq") {
			shapeSq();
		} else if (livePieceShape === "T") {
			shapeT();
		}
	}
};

var CCW = function() {//rotate counter clockwise
	console.log(livePieceRotation + ", " + horiz);
	if (
		(livePieceRotation === 1 || livePieceRotation === 3) && (horiz <= 0 || horiz >= 9) 
		|| (livePieceShape == "T" && (livePieceRotation == 4 && horiz == 0) || (livePieceRotation == 2 && horiz == 9))
		|| (livePieceShape == "i" && ((livePieceRotation == 2 || livePieceRotation == 4) && horiz <= 1) || ((livePieceRotation == 2 || livePieceRotation == 4) && horiz >= 9))
	) { //guards against game-breaking moves
	} else {
		if (livePieceRotation === 1){
			livePieceRotation = 4;
		} else {
			livePieceRotation-=1;
		}
		getRotation();

		if (livePieceShape === "L") {
			shapeL();
		} else if (livePieceShape === "i") {
			shapeI();
		} else if (livePieceShape === "Z") {
			shapeZ();
		} else if (livePieceShape === "sq") {
			shapeSq();
		} else if (livePieceShape === "T") {
			shapeT();
		}
	}
};

var clockwise = function() {//rotate clockwise
	if ((livePieceRotation === 1 || livePieceRotation === 3) && (horiz <= 0 || horiz >= 9) 
		|| (livePieceShape == "T" && (livePieceRotation == 4 && horiz == 0) || (livePieceRotation == 2 && horiz == 9))
		|| (livePieceShape == "i" && ((livePieceRotation == 2 || livePieceRotation == 4) && horiz <= 1) || ((livePieceRotation == 2 || livePieceRotation == 4) && horiz >= 9))
	) {//guards against game-breaking moves
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
		} else if (livePieceShape === "sq") {
			shapeSq();
		} else if (livePieceShape === "T") {
			shapeT();
		}
	}
	//fillOutGrid
};

var down = function() {
	downval = 1;//stops interval repeating
	// clearInterval(interval);
	downInterval = setInterval(function(){theBeat(); console.log("downInterval")}, 50);
};

var getRotation = function() {//rotation
	// console.log("Getting Rotation...");

	if (livePieceShape === "L") {
		if (livePieceRotation === 1) {
			// console.log("___Rotation1___");
			h1 = horiz;
			v1 = vert-1;
			h2 = horiz;
			v2 = vert;
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
			v1 = vert-1;
			h2 = horiz-1;
			v2 = vert-1;
			h3 = horiz;
			v3 = vert-1;
			h4 = horiz+1;
			v4 = vert-1;
		} else if (livePieceRotation === 2 || livePieceRotation === 4) {
			// console.log("___Rotation2___");
			h1 = horiz;
			v1 = vert-2;
			h2 = horiz;
			v2 = vert-1;
			h3 = horiz;
			v3 = vert;
			h4 = horiz;
			v4 = vert+1;
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
			v1 = vert-1;
			h2 = horiz;
			v2 = vert-1;
			h3 = horiz+1;
			v3 = vert-1;
			h4 = horiz;
			v4 = vert;
		} else if (livePieceRotation === 2) {
			// console.log("___Rotation2___");
			h1 = horiz;
			v1 = vert-2;
			h2 = horiz;
			v2 = vert-1;
			h3 = horiz;
			v3 = vert;
			h4 = horiz-1;
			v4 = vert-1;
		} else if (livePieceRotation === 3) {
			// console.log("___Rotation3___");
			h1 = horiz-1;
			v1 = vert-1;
			h2 = horiz;
			v2 = vert-1;
			h3 = horiz+1;
			v3 = vert-1;
			h4 = horiz;
			v4 = vert-2;
		} else if (livePieceRotation === 4) {
			// console.log("___Rotation4___");
			h1 = horiz;
			v1 = vert-2;
			h2 = horiz;
			v2 = vert-1;
			h3 = horiz;
			v3 = vert;
			h4 = horiz+1;
			v4 = vert-1;
		}
	}
};

var killPiece = function() {
		livePieceOnBoard = 0;

		var c1 = document.getElementById("cell x" + h1 + ", y" + v1);//cell #1
		var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
		var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
		var c4 = document.getElementById("cell x" + h4 + ", y" + v4);

		c1.className = "deadCell";
		c2.className = "deadCell";
		c3.className = "deadCell";
		c4.className = "deadCell";

		downval = 0;
		clearInterval(downInterval);
		
		beat = 0;
		livePieceTime = 0;
		horiz = 4;
		
		topCheck();
		lineCheck();
};

var lineCheck = function() {//checks for a continuous horizontal line of blocks on any part of the board, removed any, moves higher cells down and adds to scoreboard. Also speeds up beat
	console.log("lineCheck"); //why on Earth does this comment stop the whiteline issue?
	for (yAxis = 0; yAxis < 22; yAxis+=1) {
		var deadCellCount = 0;

		for (xAxis = 0; xAxis < 10; xAxis+=1) {
			// console.log("cellCheck_loop");

			var c1 = document.getElementById("cell x" + xAxis + ", y" + yAxis);
			if (c1.className === "deadCell") {
				deadCellCount++
				//Task: should be marked
				// console.log("DCC= " + deadCellCount);

				if (deadCellCount >= 10) {//checks that ten cells in a row are 'dead'
					var y1 = yAxis;
					console.log("wipeLine1");
					// console.log("pause");
					pause();

						for (x = 0; x < 10; x+=1) {//hides the line in question - white background
								var c2 = document.getElementById("cell x" + x + ", y" + y1);
								c2.className = "white";
								console.log("white");
						}
						setTimeout(function(){						
							for (x = 0; x < 10; x+=1) {//wipes the line in question
									var c2 = document.getElementById("cell x" + x + ", y" + y1);
									c2.className = "empty";
									console.log("empty");
							}
						}, 175) //end of setTimeout


						setTimeout(function(){
							for (x = 0; x < 10; x+=1) {//wipes the line in question
								var c2 = document.getElementById("cell x" + x + ", y" + y1);
								c2.className = "empty";//yellow - will be changed to "empty"
							}

							jsScore++;
							console.log(jsScore);
							document.getElementById("score").innerHTML = jsScore;

							clearInterval(interval); // pauses and resets "interval" on theBeat()
							console.log("beatTime1 = " + beatTime);
							beatTime -= (beatTime / 6);//makes the beat n% faster
							console.log("beatTime2 = " + beatTime);
							interval = setInterval(function(){theBeat();}, beatTime);

							level++;
							document.getElementById("level").innerHTML = level;
							
								for (x = 9; x >= 0; x-=1) {// sets up placeholder classes (redundant?)
									for (y = y1; y > 0; y-=1) {
										var c3 = document.getElementById("cell x" + x + ", y" + y);//the cell in question
										var c3m = document.getElementById("cell x" + x + ", y" + (y-1));//the cell directly underneath c3
										var c3u = document.getElementById("cell x" + x + ", y" + (y+1));//the cell directly underneath c3
										
										if (c3m) {
											if (c3.className === "deadCell" && c3m.className === "deadCell") {
												c3.className = "deadCell";
											}
											else if (c3.className === "deadCell" && c3m.className === "empty") {
												c3.className = "empty";
											}
											else if (c3.className === "empty" && c3m.className === "deadCell") {
												c3.className = "deadCell";
											}
											else if (c3.className === "empty" && c3m.className === "empty") {
												c3.className = "empty";
											}
										}
									}
								}
						}, 300) //end of Timeout

					// console.log("pause");
					pause();
					// }, 5000);
				}// end of wipeLine func
			}
		}
	}
};

var lineCheckOld = function() {//can probably be deleted. Just here as a kind of backup really
	for (yAxis = 0; yAxis < 22; yAxis+=1) {
		var deadCellCount = 0;

		for (xAxis = 0; xAxis < 10; xAxis+=1) {
			// console.log("cellCheck_loop");

			var c1 = document.getElementById("cell x" + xAxis + ", y" + yAxis);
			if (c1.className === "deadCell") {
				deadCellCount++;
				// console.log("DCC= " + deadCellCount);

				if (deadCellCount >= 10) {//checks that ten cells in a row are 'dead'
					var y1 = yAxis;
					// setTimeout(function(){

						console.log("wipeLine1");
						console.log("pause");
						pause();

						for (x = 0; x < 10; x+=1) {//wipes the line in question
							var c2 = document.getElementById("cell x" + x + ", y" + y1);
							// console.log(x);
							// console.log(y1);
							c2.className = "empty";//yellow - will be changed to "empty"
							// c2.className = "empty";
							// console.log("wipeloop");
						}
					// }, 2000);
					// setTimeout(function(){
						
						for (x = 0; x < 10; x+=1) { 
							for (y = 0; y < y1; y+=1) {
								var c3 = document.getElementById("cell x" + x + ", y" + y);//the cell in question
								var c3u = document.getElementById("cell x" + x + ", y" + (y+1));//the cell directly underneath c3
								if (c3.className === "deadCell") {
									c3.className = "trial4";//goldenrod
									c3u.className = "trial3";

									//ISSUE: what if there is a gap/air-hole?
								}
								if (c3.className === "empty") {//shifts air holes down
									c3u.className = "empty";
									//ISSUE: what if there is a gap/air-hole?
								}
							}
						}


						for (x = 0; x < 10; x+=1) { 
							for (y = 0; y < y1; y+=1) {
								c3 = document.getElementById("cell x" + x + ", y" + y);//the cell in question
								c3u = document.getElementById("cell x" + x + ", y" + (y+1));//the cell directly underneath c3
							}
						}//end of 10x loop


						
					console.log("pause");
					pause();
					// }, 5000);
				}// end of wipeLine func
			} 
		}
	}
};

var topCheck = function() {// does gameover if any dead cells are in the top line 
	setTimeout(function(){ 
		for (ppp=0; ppp<10; ppp+=1) {
			var c1 = document.getElementById("cell x" + ppp + ", y" + 0);//cell #1
			if (c1.className === "deadCell") {
				gameover();
			}
		}
	}, 200);
};

var bottomChecker = function() {//checks for dead cells or end of board below piece. Kills Live Piece if finds.
	var c1u = document.getElementById("cell x" + h1 + ", y" + (v1+1));// the cell directly underneath cell #1
	var c2u = document.getElementById("cell x" + h2 + ", y" + (v2+1));
	var c3u = document.getElementById("cell x" + h3 + ", y" + (v3+1));
	var c4u = document.getElementById("cell x" + h4 + ", y" + (v4+1));

	if (c1u === null || c2u === null || c3u === null || c4u === null//end of board 
	|| c1u.className === "deadCell" || c2u.className === "deadCell" || c3u.className === "deadCell" || c4u.className === "deadCell" ) {//if any dead pieces below:
		// console.log("bottomChecker triggered");
		killPiece();
	} else {
		// console.log("bottomChecker _ NOT _ triggered");		
	}
};

var pause = function() { //pauses gameplay
	if (pauseState === true) {
		pauseState = false;
		console.log("unpause");
	} else if (pauseState === false) {
		pauseState = true;
		console.log("pause");
	}
};

var wipeCells = function() {// probably not needed any more
	// var c1 = document.getElementById("cell x" + h1 + ", y" + v1);
	// var c2 = document.getElementById("cell x" + h2 + ", y" + v2);
	// var c3 = document.getElementById("cell x" + h3 + ", y" + v3);
	// var c4 = document.getElementById("cell x" + h4 + ", y" + v4);

	// c1.className = "empty";
	// c2.className = "empty";
	// c3.className = "empty";
	// c4.className = "empty";
};

var savePrevCells = function() {//protects cells in case of rotation or sideways movement during downwards movement 
	pc1 = document.getElementById("cell x" + h1 + ", y" + v1);
	pc2 = document.getElementById("cell x" + h2 + ", y" + v2);
	pc3 = document.getElementById("cell x" + h3 + ", y" + v3);
	pc4 = document.getElementById("cell x" + h4 + ", y" + v4);
};

var wipePrevCells = function() {//protects cells in case of rotation or sideways movement during downwards movement
	pc1.className = "empty";
	pc2.className = "empty";
	pc3.className = "empty";
	pc4.className = "empty";
};

var gameover = function() { //shows gameover overlay
	
	document.getElementById("startBtn").style.display = "none";
	document.getElementById("instructions").style.display = "none";

	var GO_Bgr = document.getElementById("gameOverOverlay");
	var GO = document.getElementById("gameOver");
	GO_Bgr.style.opacity = "1";
	GO.style.display = "block";
	GO.style.opacity = "1";

	var n = 0;
	var gameOverInt = setInterval(function(){
		n++;
		// console.log(GO.style.marginTop);
		GO.style.marginTop = n * 10 + "px";

		if (n === 20) {
			document.getElementById("retryBtn").style.display = "block";
			clearInterval(gameOverInt);
		}
	}, 200);
	pauseState = true;
	console.log("endGame_pause");
};

var retry = function() {//reloads page for new game
	location.reload();
};
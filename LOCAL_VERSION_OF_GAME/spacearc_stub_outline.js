//==================================================
//Reading of data from a file.	http://www.html5rocks.com/en/tutorials/file/dndfiles/
function readUploadedFile(){
	var uploadedFile = document.getElementById("uploadFile");
}

//====================
//Mockup of reading of data from a file.
planetNames = ["Pluto", "Mercury", "Mars", "Venus", "Earth", "Uranus", "Neptune", "Saturn", "Jupiter"];
planetMasses = [];
planetMassesByName = [];
planetMoons = [5, 0, 2, 0, 1, 5, 13, 62, 4];
planetImages = {
	"Pluto":"",
	"Mercury":"",
	"Mars":"",
	"Venus":"",
	"Earth":"",
	"Uranus":"",
	"Neptune":"",
	"Saturn":"",
	"Jupiter":""
}//Create the planetMasses - Reusable.
for (var i = 0; i < planetNames.length; i++) {
	theName = planetNames[i];
	planetMasses[i] = i;
	planetMassesByName[theName] = i;
}

//==================================================
//Putting the data into Planet objects.
planetData = [];
for (var i = 0; i < planetNames.length; i++) {
	theName = planetNames[i]; theMass = planetMasses[i];
	numMoons = planetMoons[i]; theImgUrl = planetImages[i];
	planetData[i] = createPlanetData(theName, theMass, numMoons, theImgUrl);
    alert(planetData[i]);
}

function createPlanetData(name, mass, numMoons, imgUrl){
	var planetData = {
		"name": name,
		"mass": mass,
		"moons":numMoons,
		"img": imgUrl
	}
	return planetData;
}

//==================================================
//START THE GAME


//=========================
//Generate Canvas
var THE_CANVAS;
var randomID;

//CHOOSE ONE of two: First method to cycle through the array.
endGame = false;
while (!endGame){
	randomID = getRandomInt(0, planetNames.length);
	THE_CANVAS = generateField(planetData[randomID]);
}
//CHOOSE ONE of two: Second method to cycle through the array.
for (var i = 0; i < planetNames.length; i++) {
	randomID = i;
	THE_CANVAS = generateField(planetData[randomID]);
}

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateField(onePlanetData){
	var theGameFieldCanvas;
	/**
	#CALL#API: drawPlanet
	#CALL#API: drawMoons
	#CALL#API: provide distances and add drawings to canvas, in relation to distances set
	*/
	return theGameFieldCanvas
}
//====================
function checkGravity(event_planetDropped){

	if (event_planetDropped.mass == planetData[randomID].mass){
		//#CALL#API: rotation_moons-rotate
	}
	else if (event_planetDropped.mass > planetData[randomID].mass){
		//#CALL#API: move, moons CRASH
	}
	else if (event_planetDropped.mass < planetData[randomID].mass){
		//#CALL#API: move, moons FLY OFF
	}
}






// Globals
var PLANETS = [];
var PLANET_Y_OFFSET = 680;
var PLANET_PADDING = 0;
var INSTRUCTIONS = "";
var MAXIMUM_MOONS_DISPLAYED = 30;
var MOON_ROTATION_SPEED = 20000;
var MOONSTATE = {
	Falling:0,
	Orbiting:1,
	Drifiting:2,
	Gone:3
};

// State
var ANSWER_INDEX = 0;
var CANVAS_OBJECT = {};
var DROPZONE_OBJECT = {};

var INSTRUCTIONS_OBJECT = {}; //the DropInstructions
var moonCountDisplay = {};
var MESSAGE_OBJECT = {};
var storyCorrect = {};
var reasonCorrect = {};
var reasonCollision = {};
var reasonFlyOff = {};
var joke = 0;

var PLANET_OBJECTS = [];
var MOON_OBJECTS = [];

function animatePlanetToInitialState (planet) {
	var left = PLANET_PADDING*(planet.index+1);
	var top = PLANET_Y_OFFSET;
	planet.disabled = true;
	planet.animate('left', left, {
		duration: 500,
		onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
		onComplete: function() {
			planet.disabled = false;
		}
	});
	planet.animate('top', top, {
		duration: 500,
		onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
		onComplete: function() {
			planet.disabled = false;
		}
	});
	planet.animate('opacity', 1, {
		duration: 500,
		onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
		onComplete: function() {
			planet.disabled = false;
		}
	});
}

function setupCanvas() {
	// initialize canvas
	CANVAS_OBJECT = new fabric.Canvas('c', {
		hoverCursor: 'pointer',
		selection: false
	});

	// add sun
	fabric.Image.fromURL('img/sun.png', function(obj) {
		CANVAS_OBJECT.add(obj);
		obj.set({left:0,top:100});
		obj.selectable = false;
	});

	// add dropzone
	fabric.Image.fromURL('img/dropcircle.png', function(obj) {
		CANVAS_OBJECT.add(obj);
		obj.center();
		obj.selectable = false;
		DROPZONE_OBJECT = obj;
	});

	INSTRUCTIONS_OBJECT = new fabric.Text(INSTRUCTIONS, { //= new fabric.Text("Drag and drop the correct planet into the dotted circle.", {
		left:1024/2.0,
		top:768/4.0*0.8-40,
		fontSize: 60,
		lineHeight: 1,
		originX: 'center',
		originY: 'center',
		fontFamily: 'Helvetica',
		fontWeight: 'bold',
		fontSize: 28,
	});
	INSTRUCTIONS_OBJECT.setColor("white");
	INSTRUCTIONS_OBJECT.opacity = 0;
	CANVAS_OBJECT.add(INSTRUCTIONS_OBJECT);

	moonCountDisplay = new fabric.Text(" ", {
		left:1024/2.0,
		top:768/4.0*0.5-40,
		fontSize: 60,
		lineHeight: 1,
		originX: 'center',
		originY: 'center',
		fontFamily: 'Helvetica',
		fontWeight: 'bold'
	});
	moonCountDisplay.setColor("white");
	moonCountDisplay.opacity = 0;
	CANVAS_OBJECT.add(moonCountDisplay);


	MESSAGE_OBJECT = new fabric.Text("Congratulations!", {
		left:1024/2.0,
		top:768/4.0*3-40,
		fontSize: 50,
		lineHeight: 1,
		originX: 'center',
		originY: 'center',
		fontFamily: 'Helvetica',
		fontWeight: 'bold'
	});
	MESSAGE_OBJECT.setColor("white");
	MESSAGE_OBJECT.opacity = 0;
	CANVAS_OBJECT.add(MESSAGE_OBJECT);

	storyCorrect = new fabric.Text(" ", {
		left:1024/2.0,
		top:768/4.0*3-40,
		fontSize: 60,
		lineHeight: 1.25,
		originX: 'center',
		originY: 'center',
		fontFamily: 'Helvetica',
		fontWeight: 'bold',
		fontSize: 25,
	});
	storyCorrect.setColor("white");
	storyCorrect.opacity = 0;
	CANVAS_OBJECT.add(storyCorrect);
	//canvasAnswer.add(storyCorrect);

	reasonCorrect = new fabric.Text(" ", {
		left:1024/2.0*1.55,
		top:768/4.0*2.15-40,
		fontSize: 60,
		lineHeight: 1.25,
		originX: 'center',
		originY: 'center',
		fontFamily: 'Helvetica',
		fontWeight: 'bold',
		fontSize: 25,
	});
	reasonCorrect.setColor("white");
	reasonCorrect.opacity = 0;
	CANVAS_OBJECT.add(reasonCorrect);
	//canvasAnswer.add(reasonCorrect);

	reasonCollision = new fabric.Text(" ", {
		left:1024/2.0*1.55,
		top:768/4.0*2.15-40,
		fontSize: 60,
		lineHeight: 1.25,
		originX: 'center',
		originY: 'center',
		fontFamily: 'Helvetica',
		fontWeight: 'bold',
		fontSize: 25,
	});
	reasonCollision.setColor("white");
	reasonCollision.opacity = 0;
	CANVAS_OBJECT.add(reasonCollision);
	//canvasAnswer.add(reasonCollision);

	reasonFlyOff = new fabric.Text(" ", {
		left:1024/2.0*1.55,
		top:768/4.0*2.15-40,
		fontSize: 60,
		lineHeight: 1.25,
		originX: 'center',
		originY: 'center',
		fontFamily: 'Helvetica',
		fontWeight: 'bold',
		fontSize: 25,
	});
	reasonFlyOff.setColor("white");
	reasonFlyOff.opacity = 0;
	CANVAS_OBJECT.add(reasonFlyOff);
	//canvasAnswer.add(reasonFlyOff);

	//canvasAnswer.renderAll();


	// add planets
	PLANET_PADDING = 1024/(PLANETS.length+1);
	var loaded = 0;
	var addPlanet = function (i) {
		fabric.Image.fromURL(PLANETS[i].image, function(obj) {
			PLANET_OBJECTS.push(obj);
			obj.index = i;
			obj.perPixelTargetFind = true;
			obj.targetFindTolerance = 5;
			obj.hasControls = obj.hasBorders = false;
			CANVAS_OBJECT.add(obj);

			obj.opacity = 0;
			obj.set({left:1024/2,top:768/2});
			animatePlanetToInitialState(obj);

			if (++loaded === PLANETS.length - 1)
				CANVAS_OBJECT.renderAll();
		});
	};

	for (var i=0; i<PLANETS.length; i++) {
		addPlanet(i);
	}

	CANVAS_OBJECT.on({
		'object:moving': function(e) {
			e.target.opacity = 0.5;
		},
		'object:modified': function(e) {
			e.target.opacity = 1;
			var distance = Math.pow(e.target.left - 1024/2.0,2) + Math.pow(e.target.top - 768/2.0,2);
			var left, top;

			if (distance > Math.pow(106, 2)) {
				// animate back to original position
				animatePlanetToInitialState(e.target);
			}
			else {
				// hide Instructions and the Drop circle #####
				moonCountDisplay.animate('opacity', 0, {
					duration: 500,
					onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
					onComplete: function() {
					}
				});
				DROPZONE_OBJECT.animate('opacity', 0, {
					duration: 500,
					onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
					onComplete: function() {
					}
				});

				var cx = CANVAS_OBJECT.getWidth() / 2;
				var cy = CANVAS_OBJECT.getHeight() / 2;
				left = cx;
				top = cy;
				e.target.animate('left', left, {
					duration: 500,
					onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
					onComplete: function() {
						e.target.disabled = false;
					}
				});
				e.target.animate('top', top, {
					duration: 500,
					onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
					onComplete: function() {
						e.target.disabled = false;
					}
				});
				INSTRUCTIONS_OBJECT.animate('opacity', 0);

				// check answer
				if (PLANETS[e.target.index].moons == PLANETS[ANSWER_INDEX].moons) {
					MESSAGE_OBJECT.setText("Congratulations!");
					MESSAGE_OBJECT.animate('opacity', 1, {
						duration: 500,
						onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
						onComplete: function() {
						}
					});
					// show the Reasoning #####
					var thePlanetMass = PLANETS[e.target.index].mass + ".";	if(joke==1){thePlanetMass = "OVER 9000!";}
					reasonCorrect.setText(PLANETS[e.target.index].name+" has just the \nRIGHT mass of "+thePlanetMass+" \n\nHence it is able to create \njust the RIGHT amount of \ngravitational pull to keep \nthe moons in its orbit.");
					reasonCorrect.animate('opacity', 1, {
						duration: 500,
						onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
						onComplete: function() {
						}
					});
					setTimeout(function () {
						var myVideo=$("#sunVideo");
						myVideo.show();
						myVideo.get(0).width = 320;
						sunVideo.currentTime = 0;
						sunVideo.play();
						explosionSound.currentTime = 0;
						explosionSound.play();

						// show the Storyline about the Balance of the Solar System #####
						//Need to hide the reasoning first...
						MESSAGE_OBJECT.animate('opacity', 0, {
							duration: 500,
							onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
							onComplete: function() {
							}
						});
						reasonCorrect.animate('opacity', 0, {
							duration: 500,
							onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
							onComplete: function() {
							}
						});
						//Then make the storyline appear...
						storyCorrect.setText(PLANETS[ANSWER_INDEX].name+" is now in its correct place and the \nsolar system is back in balance. Hurray!!");
						storyCorrect.animate('opacity', 1, {
							duration: 500,
							onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
							onComplete: function() {
							}
						});
						setTimeout(setupGame, 5000);
					},3000); //CHANGED DURATION from 2,000 to 3,000 because need more time to read reasoning. ###
				}
				else {
				// check larger or smaller
				if (ANSWER_INDEX < e.target.index) {
					for (var i=0;i < MOON_OBJECTS.length; i++) {
						var moon = MOON_OBJECTS[i];
						moon.state = MOONSTATE.Falling;
					}
					// show the Reasoning #####
					reasonCollision.setText("The moons crash into "+PLANETS[e.target.index].name+" \nas "+PLANETS[e.target.index].name+" has a GREATER \ngravitational pull than "+PLANETS[ANSWER_INDEX].name+".");
					reasonCollision.animate('opacity', 1, {
						duration: 500,
						onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
						onComplete: function() {
						}
					});

					setTimeout(function () {
						var myVideo=$("#explosionVideo");
						myVideo.show();
						myVideo.get(0).width = 1024;
						explosionVideo.currentTime = 0;
						explosionVideo.play();
						explosionSound.currentTime = 0;
						explosionSound.play();
						setTimeout(setupGame, 5000);
					},2000);

				}
				else {
					for (var i=0;i < MOON_OBJECTS.length; i++) {
						var moon = MOON_OBJECTS[i];
						moon.state = MOONSTATE.Drifting;
					}
					// show the Reasoning #####
					reasonFlyOff.setText("The moons drift off into outer space \nas "+PLANETS[e.target.index].name+" has a SMALLER \ngravitational pull than "+PLANETS[ANSWER_INDEX].name+". \n\nHence it does not have enough pull \nto keep the moons in its orbit.");
					reasonFlyOff.animate('opacity', 1, {
						duration: 500,
						onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
						onComplete: function() {
						}
					});
					setTimeout(setupGame, 8000); //CHANGED DURATION from 5,000 to 8,000 because the correct answer text is longer. ###
				}
				MESSAGE_OBJECT.setText("It should be "+PLANETS[ANSWER_INDEX].name+"!");
				MESSAGE_OBJECT.animate('opacity', 1, {
					duration: 500,
					onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
					onComplete: function() {
					}
				});

			}

		}
	}
});
}

// new game
function setupGame () {
	// hide video
	$("#explosionVideo").hide();
	$("#sunVideo").hide();
	explosionVideo.pause();
	sunVideo.pause();

	// reset planets
	for (var i = PLANET_OBJECTS.length - 1; i >= 0; i--) {
		var planet = PLANET_OBJECTS[i];
		animatePlanetToInitialState(planet);
	};

	// reset moons
	for (var i = MOON_OBJECTS.length - 1; i >= 0; i--) {
		var moon = MOON_OBJECTS[i];
		moon.state = MOONSTATE.Gone;
		// CANVAS_OBJECT.remove(moon);
		moon.animate('opacity', 0, {
			duration: 500,
			onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT),
			onComplete: function() {
				CANVAS_OBJECT.remove(moon);
			}
		});
	}
	MOON_OBJECTS = [];

	//The Correct Answer is generated here.
	ANSWER_INDEX = fabric.util.getRandomInt(0, PLANETS.length-1);
	DROPZONE_OBJECT.animate('opacity', 1);
	//INSTRUCTIONS_OBJECT is set up to show below.
	//moonCountDisplay is set up to show below.
	//NEED TO HIDE ALL THE MESSAGSE HERE. Because the reset function at the end of the game calls this function.
	MESSAGE_OBJECT.animate('opacity', 0);
	storyCorrect.animate('opacity', 0);
	reasonCorrect.animate('opacity', 0);
	reasonCollision.animate('opacity', 0);
	reasonFlyOff.animate('opacity', 0);
	joke = 0;

	// add moons
	addMoon = function (i) {
		fabric.Image.fromURL('img/moon.png', function(obj) {
			CANVAS_OBJECT.add(obj);
			obj.selectable = false;
			obj.opacity = 0;
			animateMoon(obj);
			MOON_OBJECTS.push(obj);
			if (i == 1)
				CANVAS_OBJECT.renderAll();

			obj.animate('opacity', 1, {
				duration: 500,
				onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT)
			});
		});
	};
	var m = PLANETS[ANSWER_INDEX].moons;
	if (m > MAXIMUM_MOONS_DISPLAYED)
		m = MAXIMUM_MOONS_DISPLAYED;

	var delay = 0;
	for (var i = m; i > 0; i--) {
		setTimeout(function () {
			addMoon(i);
		}, delay);
		delay += fabric.util.getRandomInt(100, 300);
	}
	setTimeout(function () {
		moonCountDisplay.setText("This planet has "+PLANETS[ANSWER_INDEX].moons+" moons.");
		moonCountDisplay.animate('opacity', 1,{
			duration: 500,
			onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT)
		});
		INSTRUCTIONS_OBJECT.animate('opacity', 1, {
			duration: 500,
			onChange: CANVAS_OBJECT.renderAll.bind(CANVAS_OBJECT)
		});
	}, delay);
}

var animateMoon = function (obj, radius) {
	if (typeof(radius)==='undefined')
		obj.radius = 180;
	else
		obj.radius = radius;

	obj.state = MOONSTATE.Orbiting;
	obj.radius = 180 + fabric.util.getRandomInt(-20, 20);
	obj.scale(fabric.util.getRandomInt(70, 100) / 100);

	// rotate around canvas center
	cx = CANVAS_OBJECT.getWidth() / 2,
	cy = CANVAS_OBJECT.getHeight() / 2,

	// speed of rotation slows down for further planets
	duration = 0.2 * MOON_ROTATION_SPEED;

	// randomize starting angle to avoid planets starting on one line
	obj.startAngle = fabric.util.getRandomInt(-360, 0);
	obj.endAngle = obj.startAngle + 359;

	(function animate() {
		fabric.util.animate({
			startValue: obj.startAngle,
			endValue: obj.endAngle,
			duration: duration,
			// linear movement
			easing: function(t, b, c, d) { return c*t/d + b; },
			onChange: function(angle) {
				angle = fabric.util.degreesToRadians(angle);
				var x = cx + obj.radius * Math.cos(angle);
				var y = cy + obj.radius * Math.sin(angle);

				if (obj.state == MOONSTATE.Falling) {
					obj.radius -= 3;
					obj.radius = obj.radius < 0 ? 0 : obj.radius;
				}
				else if (obj.state == MOONSTATE.Drifting) {
					obj.radius += 3;
				}

				obj.set({ left: x, top: y }).setCoords();

				CANVAS_OBJECT.renderAll();
			},
			onComplete: function () {
				if (obj.state != MOONSTATE.Gone)
					return animate();
				else
					return null;
			}
		});
	})();
};

var urlParams;


function loadDefaultGame() {
	$.getJSON('default.json?callback=?', function (data) {
		INSTRUCTIONS = data.instructions;
		PLANETS = data.planets;
		setupCanvas();
		setTimeout(setupGame, 1000);
	});
}

function loadGame(data) {
	// validate data object here
	valid = true;

	if (valid) {
		console.log(data);
		INSTRUCTIONS = data.instructions;
		PLANETS = data.planets;
		setupCanvas();
		setTimeout(setupGame, 1000);
	}
	else {
		loadDefaultGame();
	}
}

$(document).ready(function() {
	$("#explosionVideo").hide();
	$("#sunVideo").hide();

	var valid = false;
	console.log('load: ' + urlParams['load']);
	if (urlParams['load']) {
		$.getJSON(urlParams['load'].slice(0, urlParams['load'].length-1)+'?callback=?', function (data) {
		});
	}
	else {
		loadDefaultGame();
	}
});

(window.onpopstate = function () {
	var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
        	urlParams[decode(match[1])] = decode(match[2]);
    })();

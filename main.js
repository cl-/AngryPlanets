planetNames = ["Mercury", "Mars", "Venus", "Earth", "Uranus", "Neptune", "Saturn", "Jupiter"];
planetImages = [
"img/p_mercury.png",
"img/p_mars.png",
"img/p_venus.png",
"img/earth.png",
"img/p_uranus.png",
"img/p_neptune.png",
"img/p_saturn.png",
"img/p_jupiter.png"
];
planetMoons = [0, 2, 0, 1, 5, 13, 62, 4];


planetOffset = 680;
answer = 0;

var canvas = new fabric.Canvas('c', {
	hoverCursor: 'pointer',
	selection: false
});

var sunObj = fabric.Image.fromURL('img/sun.png', function(obj) {
	canvas.add(obj);
	obj.set({left:0,top:100});
	obj.selectable = false;
});

circleObject = {};
var centerObj = fabric.Image.fromURL('img/dropcircle.png', function(obj) {
	canvas.add(obj);
	obj.center();
	obj.selectable = false;
	circleObject = obj;
});

padding = 1024/(planetImages.length+1);

loaded = 0;
var addPlanet = function (i) {
	var object = fabric.Image.fromURL(planetImages[i], function(obj) {
		obj.set({left:padding*(i+1),top:planetOffset});
		obj.index = i;
		obj.perPixelTargetFind = true;
		obj.targetFindTolerance = 5;
		obj.hasControls = obj.hasBorders = false;
		canvas.add(obj);

		if (++loaded === planetImages.length - 1)
			canvas.renderAll();
	});
	return object;
};

for (var i=0; i<planetImages.length; i++) {
	addPlanet(i);
}

rotationSpeed = 20000;
MoonState = {
	Falling:0,
	Orbiting:1,
	Drifiting:2,
	Gone:3
};

var animateMoon = function (obj, radius) {
	if (typeof(radius)==='undefined')
		obj.radius = 180;
	else
		obj.radius = radius;

	obj.state = MoonState.Orbiting;
	obj.radius = 180 + fabric.util.getRandomInt(-20, 20);
	obj.scale(fabric.util.getRandomInt(70, 100) / 100);

	// rotate around canvas center
	cx = canvas.getWidth() / 2,
	cy = canvas.getHeight() / 2,

	// speed of rotation slows down for further planets
	duration = 0.2 * rotationSpeed;

	// randomize starting angle to avoid planets starting on one line
	obj.startAngle = fabric.util.getRandomInt(-180, 0);
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

				if (obj.state == MoonState.Falling) {
					obj.radius -= 3;
					obj.radius = obj.radius < 0 ? 0 : obj.radius;
				}
				else if (obj.state == MoonState.Drifting) {
					obj.radius += 3;
				}

				obj.set({ left: x, top: y }).setCoords();

				canvas.renderAll();
			},
			onComplete: function () {
				if (obj.state != MoonState.Gone)
					return animate();
				else
					return null;
			}
		});
	})();
};

moons = [];
planet = fabric.util.getRandomInt(0, planetImages.length-1);
numMoons = planetMoons[planet];
addMoon = function (i) {
	fabric.Image.fromURL('img/moon.png', function(obj) {
		canvas.add(obj);
		obj.selectable = false;
		animateMoon(obj);
		moons.push(obj);
		if (i == 1)
			canvas.renderAll();
	});
};
for (var i = numMoons; i > 0; i--) {
	addMoon(i);
}

var text = new fabric.Text("Congratulations!", {
	left:1024/2.0,
	top:768/4.0*3-40,
	fontSize: 60,
	lineHeight: 1,
	originX: 'center',
	originY: 'center',
	fontFamily: 'Helvetica',
	fontWeight: 'bold'
});
text.setColor("white");
text.opacity = 0;
canvas.add(text);

canvas.on({
	'object:moving': function(e) {
		e.target.opacity = 0.5;
	},
	'object:modified': function(e) {
		e.target.opacity = 1;
		console.log(e.target.left);
		console.log(e.target.top);

		var distance = Math.pow(e.target.left - 1024/2.0,2) + Math.pow(e.target.top - 768/2.0,2);
		var left, top;

		if (distance > Math.pow(106, 2)) {
			console.log("outside");
			// animate back to original position
			left = padding*(e.target.index+1);
			top = planetOffset;
			e.target.disabled = true;
			e.target.animate('left', left, {
				duration: 500,
				onChange: canvas.renderAll.bind(canvas),
				onComplete: function() {
					e.target.disabled = false;
				}
			});
			e.target.animate('top', top, {
				duration: 500,
				onChange: canvas.renderAll.bind(canvas),
				onComplete: function() {
					e.target.disabled = false;
				}
			});

		}
		else {
			console.log("inside");
			// hide circle
			circleObject.animate('opacity', 0, {
				duration: 500,
				onChange: canvas.renderAll.bind(canvas),
				onComplete: function() {
				}
			});

			var cx = canvas.getWidth() / 2;
			var cy = canvas.getHeight() / 2;
			left = cx;
			top = cy;
			e.target.animate('left', left, {
				duration: 500,
				onChange: canvas.renderAll.bind(canvas),
				onComplete: function() {
					e.target.disabled = false;
				}
			});
			e.target.animate('top', top, {
				duration: 500,
				onChange: canvas.renderAll.bind(canvas),
				onComplete: function() {
					e.target.disabled = false;
				}
			});

			// check answer
			var i, moon;
			var answer = planetMoons[e.target.index];
			if (answer == numMoons) {
				text.setText("Congratulations!");
				text.animate('opacity', 1, {
					duration: 500,
					onChange: canvas.renderAll.bind(canvas),
					onComplete: function() {
					}
				});
					setTimeout(function () {
						var myVideo=document.getElementById("video2");
						myVideo.style.visibility="visible";
						myVideo.width = 1024;
						myVideo.play();
						snd_explode.play();
						setTimeout(function () {
							document.location.reload(true);
						},3000);
					},2000);
			}
			else {
				// check larger or smaller
				if (planet < e.target.index) {
					for (i=0;i < moons.length; i++) {
						moon = moons[i];
						moon.state = MoonState.Falling;
					}

					setTimeout(function () {
						var myVideo=document.getElementById("video1");
						myVideo.style.visibility="visible";
						myVideo.width = 1024;
						myVideo.play();
						snd_explode.play();
						setTimeout(function () {
							document.location.reload(true);
						},3000);
					},2000);

				}
				else {
					for (i=0;i < moons.length; i++) {
						moon = moons[i];
						moon.state = MoonState.Drifting;
					}
					setTimeout(function () {
						document.location.reload(true);
					},3000);
				}
				text.setText("It should be "+planetNames[planet]+"!");
				text.animate('opacity', 1, {
					duration: 500,
					onChange: canvas.renderAll.bind(canvas),
					onComplete: function() {
					}
				});

			}

		}
	}
});

var myVideo=document.getElementById("video1");
myVideo.style.visibility="hidden";
var myVideo2=document.getElementById("video2");
myVideo2.style.visibility="hidden";
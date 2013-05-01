Angry Planets
===============
This app was created during the NASA International Space Apps Challenge Hackathon.

Description:
---------------
What is Gravity?

Unlike an expert scientist, a lay person often only knows that it's related to Newton's falling apple. It's really hard for them to imagine what gravity looks like, and understand what it truly is.

So we made a visual game to help children "see" and understand gravity, and learn about planets and their moons at the same time! By showing the gravitational phenomena and the explanations.

We also make it possible for scientists to easily create new stages to teach new content.


What is Gravity?

Gravity is something that we can't see or touch, but we feel its effects every day.

To an expert scientist, Gravity is a force that is represented in figures in huge data sets of graphs and charts.

Unlike an expert scientist, a lay person would often only know that it's related to Newton's falling apple. It's really hard for them to imagine what gravity looks like, and understand what it truly is.

So we decided to make a visual game to change everything. To help people "see" and understand gravity. And out of that vision, came our 2 key goals.

Our first goal is to help children learn about the effects of gravity through a visual game.

What better way to top off gravity than with the awesome solar system and its revolving planets and moons?

Now, on top of learning about gravity, they'll get to learn about the planets and their corresponding moons at the same time too!

The game allows children to see what exactly happens and how planets and bodies interact with each other when gravity is put into the equation:
- when a planet of the correct gravity is inserted into the space, the moons orbit normally and the solar system is back in balance. As a congratulatory message, the sun glows bright.
- when a planet with too much gravity is inserted, the moons crash into the planet.
- when a planet with too little gravity is inserted, the moons fly off into space because there's not enough pull.

On top of showing the gravitational phenomenon that happens as a result of the planet chosen, the game also provides the explanation behind the phenomenon.

Our second goal is to allow scientists to easily teach new content, by making it easy for them to create new stages for new planets and revolving bodies through simply submitting a json file.

To submit your customized json file to create new stages, it is easily done via a URL-extension to our original URL (the method is mentioned below). In that json file, you simply need to provide the list of planet names, planet images, moon counts, and planet masses in the specified json format detailed below.


URLs you can visit:
---------------
NASA International Space Apps Challenge page: http://spaceappschallenge.org/project/angryplanets/

Source Code: https://github.com/cl-/AngryPlanets	
(Has the Offline Local version of the game - for the best gameplay experience, use the Offline Local version's "index.html" file. There are some unresolved issues in the online version. Sorry about that, we're having our exams now so we don't have enough time to fix those issues.)

The Game Intro Scene: https://www.dropbox.com/s/c5xtayse9lvelhb/PRESENTATION_VIDEO%20-%20universe%20-%20Broadband.m4v	
(It's somewhat big and will take a while to download, so we didn't really bundle it into the online version of the game.)

Online Game: http://angry-planets.appspot.com	
(Please note: If a lot of people play the game, we may run out of free server time and the url may not load. Please let us know if it happens, and we'll try to get it up and running again as soon as we can.)


NOTE #1: It may take some time to load on the first time you play the game because the videos will take some time to download.	
So please try to have a good Internet connection for the best possible experience :)

NOTE #2: If you experience any lag issues on the Online Version after a few playthroughs, simply refresh the page.	
We're having our exams now so we don't have enough time to thoroughly test the game for stability. Sorry about that.


What we used:
---------------
- HTML5
- Javascript with Fabric
- Safari browser
- AppEngine

NOTE #3: If you are running the code locally, please run it on Safari browser.	
When you run the code offline, it doesn't work well with some versions of Chrome.

Further technical details can be found on the code page: https://github.com/cl-/AngryPlanets


URL Extension Method (to load your custom Json file)
---------------
1. Create the json file as per the Json Format detailed below.
2. Upload your json file onto your own server or host.
3. Use the following URL format:	
FORMAT: http://angry-planets.appspot.com/?load=your-json-file-FULL-path-and-filename	
Example1: http://angry-planets.appspot.com/?load=http://mydomainname.com/birthdayPresent.json	
Example2: http://angry-planets.appspot.com/?load=http://dropbox.com/someDropboxString/anotherGalaxy.json


JSON Format
---------------
The JSON Format can be found in the default.json file.	
It is pasted below for your convenience but the one below has no indentation. So please use the proper one in the default.json file.	
NOTE: Please note that the "image" in your custom Json file should be the FULL URL PATH of the image.

loadGame({//An array of planets, in ascending order of mass; planet with the smallest mass first.	
	"planets": [	
	{ "name": "Mercury", "image": "img/p_mercury.png", "moons": 0, "mass":"3.3022 x 10^23 kg"},		
	{ "name": "Mars", "image": "img/p_mars.png", "moons": 2, "mass":"6.4185 x 10^23 kg" },	
	{ "name": "Venus", "image": "img/p_venus.png", "moons": 0, "mass":"4.8685 x 10^24 kg" },	
	{ "name": "Earth", "image": "img/earth.png", "moons": 1, "mass":"5.9736 x 10^24 kg" },	
	{ "name": "Uranus", "image": "img/p_uranus.png", "moons": 5, "mass":"8.6810 x 10^25 kg" },	
	{ "name": "Neptune", "image": "img/p_neptune.png", "moons": 13, "mass":"10.243 x 10^25 kg" },	
	{ "name": "Saturn", "image": "img/p_saturn.png", "moons": 62, "mass":"5.6846 x 10^26 kg" },		
	{ "name": "Jupiter", "image": "img/p_jupiter.png", "moons": 4, "mass":"1.8986 x 10^27 kg" }		
	],	
	"instructions": "Drag and drop the correct planet into the center."	
})


Short Overview for Global Judging Nomination	
for the NASA International Space Apps Challenge
---------------
What is Gravity?

Unlike an expert scientist, a lay person often only knows that it's related to Newton's falling apple. It's really hard for them to imagine what gravity looks like, and understand what it truly is.

So we made a visual game to help children "see" and understand gravity, and learn about planets and their moons at the same time! By showing the gravitational phenomena and the explanations.

We also make it possible for scientists to easily create new stages to teach new content.

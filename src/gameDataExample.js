// Create the canvas
let canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 480;
// canvas.width = 640
// canvas.height = 640
let ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
let heroReady = false;
let heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/test_image.png";
// heroImage.src = "images/Untitled-2.gif";

// Collectible image
let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
let hero = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0
};
let monster = {
	x: 0,
	y: 0
};
let monstersCaught = 0;

// Handle keyboard controls
let keysDown = {}; // object were we add up to 4 properties when keys go down
                // and then delete them when the key goes up

addEventListener("keydown", function (e) {
	console.log(e.keyCode + " down")
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	console.log(e.keyCode + " up")
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
let reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	//Place the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 96));
	monster.y = 32 + (Math.random() * (canvas.height - 96));
};


// Update game objects
let update = function (modifier) {
	// Arrow key codes
	let right = 39, left = 37, up = 38, down = 40, fire = 32

	if (up in keysDown && hero.y > 32+4) { //  holding up key
    	hero.y -= hero.speed * modifier;
	}
	if (down in keysDown && hero.y < canvas.height - (64 + 6)) { //  holding down key
    	hero.y += hero.speed * modifier;	
	}
	if (left in keysDown && hero.x > (32+4)) { // holding left key
    	hero.x -= hero.speed * modifier;
	}
	if (right in keysDown && hero.x < canvas.width - (64 + 6)) { // holding right key
    	hero.x += hero.speed * modifier;
	}


	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
}

// Draw everything
let render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
let main = function () {
	let now = Date.now();
	let delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	//  Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
//let w = window;
//requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
let then = Date.now();
reset();
main();
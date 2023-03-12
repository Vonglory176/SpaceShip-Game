//Background/Window Code
const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
canvas.width = 900
canvas.height = 900

// Background image
let bgImage = new Image()
bgImage.src = "images/placeHolderBackground.jpg";

//Asteroid Code //////////////////////////////////////////////////////////////////////////////////////
const numberOfAsteroids = 5
let asteroidArray = []
let asteroidImageArray = []
// asteroidImage.src = asteroidImageArray[Math.floor(Math.random() * 2)]
let asteroidImage = new Image()
asteroidImage.src = "images/asteroids/asteroid1.png"
let asteroidImage2 = new Image()
asteroidImage2.src = "images/asteroids/asteroid2.png"
asteroidImageArray.push(asteroidImage)
asteroidImageArray.push(asteroidImage2)

class Asteroid {
    constructor(){
        this.x = Math.random() * canvas.width
        this.y = 0
        this.size = Math.random() * 100 + 50 //CHANGE LATER
        this.speed = Math.random() * 10 + 1
        this.angle = Math.random() * 360
        this.spin = Math.random() < 0.5 ? -1 : 1
        this.image = Math.floor(Math.random() * 2)
    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle * Math.PI/360 * this.spin)
        // ctx.drawImage(asteroidImage, 0 - this.size/2, 0- this.size/2, this.size, this.size)
        ctx.drawImage(asteroidImageArray[this.image], 0 - this.size/2, 0- this.size/2, this.size, this.size)
        ctx.restore()
    }
    update(){
        this.angle += 10
        if(this.y > canvas.height){
            this.y = 0 - this.size
            this.x = Math.random() * canvas.width
            this.size = Math.random() * 100 + 50
            this.speed = Math.random() * 10 + 1
        }
        this.y += this.speed
    }
}

function init(){
    for (let i=0;i<numberOfAsteroids;i++) asteroidArray.push(new Asteroid())
}
init()

// Player Code //////////////////////////////////////////////////////////////////////////////////////
let playerImage = new Image()
playerImage.src = "images/test_image.png"
let playerImage1 = new Image()
playerImage1.src = "images/spaceship/spaceshipIdle.png"
let playerImage2 = new Image()
playerImage2.src = "images/spaceship/spaceshipEngineStart.png"
let playerImage3 = new Image()
playerImage3.src = "images/spaceship/spaceshipEngineStart.png"

let playerImageArray = []
// playerImageArray.push(playerImage1,playerImage2,playerImage3)

// let playerNum = 0

// Handle keyboard controls
let keysDown = {}; // object were we add up to 4 properties when keys go down
                // and then delete them when the key goes up

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

class Player {
    constructor(){
        this.x = canvas.width / 2
	    this.y = canvas.height / 2
        this.size = 100 //CHANGE LATER
        this.speed = 6
        // this.ready = false
        this.angle = 0 //720 //0 90 180 270 360 450 540 630
        this.spin = 1 //Math.random() < 0.5 ? -1 : 1
        this.image = 0
    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle * Math.PI/360) //* this.spin
        ctx.drawImage(playerImage1, 0 - this.size/2, 0- this.size/2, this.size, this.size)
        // ctx.drawImage(playerImage, this.x, this.y, this.size, this.size)
        ctx.restore()
    }
    update(){
        // this.angle += 10
    	// Arrow key codes
        let right = 39, left = 37, up = 38, down = 40, fire = 32
        
        // if (this.angle > 720) this.angle = 0
        // console.log(keysDown.length)
        // if (keysDown.length === 0) {
        //     // this.image = this.image === 0 ? 1 : 2
        //     // playerImage.src="images/spaceship/spaceshipEngineStart/png"
        //     // while (keysDown) playerImage.src="images/spaceship/spaceshipEngineOn/png"
        // }
        // else this.image = 0

        //KEYPRESS CHECKS
        {
            //Top Left
            if(up in keysDown && left in keysDown && this.y > (32+4) && this.x > (32+4)){
                this.y -= this.speed
                this.x -= this.speed
                this.angle = 630
            }
            //Top Right
            else if(up in keysDown && right in keysDown && this.y > (32+4) && this.x < canvas.width - (64 + 6)){
                this.y -= this.speed
                this.x += this.speed
                this.angle = 90
            }
            //Bottom Left
            else if(down in keysDown && left in keysDown && this.y < (canvas.height - (64 + 6)) && this.x > (32+4)){
                this.y += this.speed
                this.x -= this.speed
                this.angle = 450
            }
            //Bottom Right
            else if(down in keysDown && right in keysDown && this.y < canvas.height - (64 + 6) && this.x < canvas.width - (64 + 6)){
                this.y += this.speed
                this.x += this.speed
                this.angle = 270
            }
            //Top
            else if (up in keysDown && this.y > (32+4)) { //  holding up key
                this.y -= this.speed //* modifier;
                this.angle = 0
            }
            //Bottom
            else if (down in keysDown && this.y < canvas.height - (64 + 6)) { //  holding down key
                this.y += this.speed //* modifier;
                this.angle = 360	
            }
            //Left
            else if (left in keysDown && this.x > (32+4)) { // holding left key
                this.x -= this.speed //* modifier;
                this.angle = 540
            }
            //Right
            else if (right in keysDown && this.x < canvas.width - (64 + 6)) { // holding right key
                this.x += this.speed //* modifier;
                this.angle = 180
            }
        }

        // console.log(this.angle)

        if(this.y > canvas.height){
            this.y = 0 - this.size
            this.x = Math.random() * canvas.width
            // this.size = Math.random() * 100 + 50
            // this.speed = Math.random() * 10 + 1
        }
        // this.y += this.speed
    }
}
let player = new Player()

// playerImage.onload = () => {player.ready = true}
// let player = {speed: 256, x: 0, y: 0}

//Collectible Code
// let collectible = {
// 	x: 0,
// 	y: 0
// };
// let collectiblesFound = 0;

function main() {
    ctx.clearRect(0,0,canvas.width,canvas.height)

    ctx.drawImage(bgImage, 0, 0, 1000, 1000)
    
    for (let i = 0; i < asteroidArray.length; i++) {
        asteroidArray[i].draw()
        asteroidArray[i].update()
    }
    
    player.draw()
    player.update()
    

    requestAnimationFrame(main)
}
main()
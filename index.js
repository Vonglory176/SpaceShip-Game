// Background/Window Code //////////////////////////////////////////////////////////////////////////////////////
let canvas = document.getElementById("canvas1")
let ctx = canvas.getContext("2d")
canvas.width = 900
canvas.height = 900
// Background/Window Code //////////////////////////////////////////////////////////////////////////////////////

// AsteroidField Code /////////////////////////////////////////////////////////////////////////////////////
class AsteroidField {
    constructor(imageIndex, y, speed) {
        this.y = y
        this.height = 1800
        this.speed = speed
        this.imageIndex = imageIndex
    }
        draw(){
        ctx.save()
        ctx.translate(0,this.y)

        //function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {}
        //Image Properties
        ctx.drawImage(asteroidFieldImageArray[this.imageIndex],0, 0)

        ctx.restore()
    }
    update(modifier){
        if(this.y > canvas.height*2) this.y = this.height-canvas.height*2
        this.y += this.speed*modifier 
    }
}
// AsteroidField Code /////////////////////////////////////////////////////////////////////////////////////

// Asteroid Code //////////////////////////////////////////////////////////////////////////////////////
class Asteroid {
    constructor(){
        this.width = "72"
        this.height = "72"
        this.frameX = Math.floor(Math.random() * 2)
        this.frameY = 0
        
        this.size = Math.random() * 100 + 50
        this.speed = Math.random() * 500 + 100 // * 10 + 1
        this.angle = Math.random() * 360
        this.spin = Math.random() < 0.5 ? -1 : 1

        this.x = Math.random() * canvas.width
        this.y = this.size/2-canvas.height
    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle * Math.PI/360 * this.spin)

        //function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {}
        //Image Properties
        ctx.drawImage(asteroidImage, this.width*this.frameX, this.height*this.frameY, this.width, this.height,
            //Object Proportions
            0 - this.size/2, 0 - this.size/2, this.size, this.size)

        ctx.restore()
    }
    update(modifier){
        this.angle += 10
        if(this.y - this.size > canvas.height){
            this.y = this.size-canvas.height
            this.x = Math.random() * canvas.width
            this.size = Math.random() * 100 + 50
            this.speed = Math.random() * 500 + 100 // * 10 + 1
        }
        this.y += this.speed*modifier

        if ( asteroidCollision(this.x, this.y, this.size*0.5, 
            player.x, player.y, player.width, player.height)) console.log("HIT!!!!!!!!!!!"), player.explode = true//gameState = false 
    }
}
function addAsteroid () {asteroidArray.push(new Asteroid())}

// CIRCLE/RECTANGLE
function asteroidCollision(cx, cy, radius, rx, ry, rw, rh) {
    // function collisionDetection() {
        // temporary variables to set edges for testing
        let testX = cx;
        let testY = cy;
      
        // which edge is closest?
        if (cx < rx)         testX = rx;      // test left edge
        else if (cx > rx+rw) testX = rx+rw;   // right edge
        if (cy < ry)         testY = ry;      // top edge
        else if (cy > ry+rh) testY = ry+rh;   // bottom edge
      
        // get distance from closest edges
        let distX = cx-testX;
        let distY = cy-testY;
        let distance = Math.sqrt( (distX*distX) + (distY*distY) );
      
        // if the distance is less than the radius, collision!
        if (distance <= radius) return true;
      }
// Asteroid Code //////////////////////////////////////////////////////////////////////////////////////

// Collectible Code /////////////////////////////////////////////////////////////////////////////////
class Collectible {
    constructor() {
        this.size = 50
        this.speed = 100 // * 10 + 1
        this.angle = Math.random() * 360
        this.spin = Math.random() < 0.5 ? -1 : 1

        this.x = Math.random() * canvas.width
        this.y = -this.size
    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle * Math.PI/360 * this.spin)
        ctx.drawImage(collectibleImage, 0 - this.size/2, 0- this.size/2, this.size, this.size)
        ctx.restore()
    }
    update(modifier){
        this.angle += 10
        if(this.y - this.size > canvas.height || collectibleCollision()){
            this.y = 0 - this.size
            this.x = Math.random() * canvas.width
            this.speed = Math.random() * 500 + 100 // * 10 + 1
        }
        this.y += this.speed*modifier
    }
}
//COLLECTIBLE PICKUP
function collectibleCollision(){ //Include negation for player?
    if(
        player.x + player.width/2 >= collectible.x &&
        player.x <= collectible.x + (collectible.size) && // - collectible.size/5
        player.y + player.height/2 >= collectible.y &&
        player.y <= collectible.y + (collectible.size) // - collectible.size/5
    ) {
        addAsteroid()
        collected++
        if (collected >= 5) gameState = false 
        return true
    }
}
// Collectible Code /////////////////////////////////////////////////////////////////////////////////

// Player Code //////////////////////////////////////////////////////////////////////////////////////
class Player {
    constructor(){
        // this.width = "72"
        // this.height = "100"
        this.width = "36"
        this.height = "78"
        this.frameX = 0
        this.frameY = 0

        this.x = canvas.width / 2 + .01450000000006 // Works?????
	    this.y = canvas.height / 2 + .01450000000006
        this.topSpeed = 200
        this.speedIncrease = 10
        this.speedLoss = 1
        this.speedX = 0
        this.speedY = 0

        this.action = 'idle'
        this.angle = 0 //720 //0 90 180 270 360 450 540 630
        this.spin = 1 //Math.random() < 0.5 ? -1 : 1

        this.tally = 0
        this.explode = false
        // this.size = 100 //CHANGE LATER
    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle * Math.PI/360)

        //function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {}
        ctx.drawImage(playerImage, this.width*this.frameX, this.height*this.frameY, 
            this.width, this.height, 0 - this.width/2, 0 - this.height/2, this.width, this.height)

        ctx.restore()
    }
    update(modifier){
        //Exploding Check
        if(this.explode === true && collected != 5) {
            if (this.frameY < 2) {
                gameState = false //DEBUGGING
                this.width = "100"
                this.height = "100"
                this.frameX = 0
                this.frameY = 2
            }
            else if (this.frameY === 2 && this.tally < 1) this.tally += modifier
            else if (this.tally < 1.1) {
                this.frameY = 3
                this.tally += modifier
            }
            else if (this.tally > 1.1) gameState = false
        }
        else {
            //PLAYER KEYPRESS CHECKS
            let right = 39, left = 37, up = 38, down = 40, shoot = 32
            if (up in keysDown || down in keysDown || left in keysDown || right in keysDown) {
                
                //Top Left
                if(up in keysDown && left in keysDown && this.y > (this.height/2) && this.x > (this.width/2)){
                    this.speedY += this.speedY > -this.topSpeed ? -this.speedIncrease : 0
                    this.speedX += this.speedX > -this.topSpeed ? -this.speedIncrease : 0
                    
                    // this.y -= this.speedY*modifier
                    // this.x -= this.speedX*modifier
                    this.angle = 630
                }
                //Top Right
                else if(up in keysDown && right in keysDown && this.y > (this.height/2) && this.x < canvas.width - (this.width/2)){
                    this.speedY += this.speedY > -this.topSpeed ? -this.speedIncrease : 0
                    this.speedX += this.speedX < this.topSpeed ? this.speedIncrease : 0

                    // this.y -= this.speedY*modifier
                    // this.x += this.speedX*modifier
                    this.angle = 90
                }
                //Bottom Left
                else if(down in keysDown && left in keysDown && this.y < (canvas.height - (this.height/2)) && this.x > (this.width/2)){
                    this.speedY += this.speedY < this.topSpeed ? this.speedIncrease : 0
                    this.speedX += this.speedX > -this.topSpeed ? -this.speedIncrease : 0

                    // this.y += this.speedY*modifier
                    // this.x -= this.speedX*modifier
                    this.angle = 450
                }
                //Bottom Right
                else if(down in keysDown && right in keysDown && this.y < canvas.height - (this.height/2) && this.x < canvas.width - (this.width/2)){
                    this.speedY += this.speedY < this.topSpeed ? this.speedIncrease : 0
                    this.speedX += this.speedX < this.topSpeed ? this.speedIncrease : 0

                    // this.y += this.speedY*modifier
                    // this.x += this.speedX*modifier
                    this.angle = 270
                }
                //Top
                else if (up in keysDown && this.y > (this.height/2)) { //  holding up key
                    this.speedY += this.speedY > -this.topSpeed ? -this.speedIncrease : 0
                    // this.y -= this.speedY*modifier
                    this.angle = 0
                }
                //Bottom
                else if (down in keysDown && this.y < canvas.height - (this.height/2)) { //  holding down key
                    this.speedY += this.speedY < this.topSpeed ? this.speedIncrease : 0
                    // this.y += this.speedY*modifier
                    this.angle = 360	
                }
                //Left
                else if (left in keysDown && this.x > (this.width/2)) { // holding left key
                    this.speedX += this.speedX > -this.topSpeed ? -this.speedIncrease : 0
                    // this.x -= this.speedX*modifier
                    this.angle = 540
                }
                //Right
                else if (right in keysDown && this.x < canvas.width - (this.width/2)) { // holding right key
                    this.speedX += this.speedX < this.topSpeed ? this.speedIncrease : 0
                    // this.x += this.speedX*modifier
                    this.angle = 180
                }
    
                //Moving while shooting?
                this.action = (shoot in keysDown ? 'move shoot' : 'move')
            }
            //Shooting while idle?
            else {
                this.action = (shoot in keysDown ?  'idle shoot' : 'idle')
                
                if (this.speedY < 0) this.speedY += this.speedLoss
                if (this.speedY > 0) this.speedY -= this.speedLoss
                if (this.speedX < 0) this.speedX += this.speedLoss
                if (this.speedX > 0) this.speedX -= this.speedLoss
                
            }
            if (this.speedY < 0 && this.y > (this.height/2)) this.y += this.speedY*modifier
            if (this.speedY > 0 && this.y < canvas.height - (this.height/2)) this.y += this.speedY*modifier
            if (this.speedX < 0 && this.x > (this.width/2)) this.x += this.speedX*modifier
            if (this.speedX > 0 && this.x < canvas.width - (this.width/2)) this.x += this.speedX*modifier


                    //SPRITE UPDATE ON ACTION
            //Idle
            // console.log(this.action)
            if (this.action === 'idle') { this.frameX = this.frameY = 0 }
        
            //Shooting
            else if (this.action === 'idle shoot') {
                this.frameY = 0
                // if (!(0 < this.frameX < 4)) this.frameX = 1
                // else ()
                this.frameX = 1
            }
        
            //Moving
            else if (this.action === 'move') {
                //Engine Start
                if(this.frameY != 1) {
                    this.frameY = 1
                    this.frameX = 0
                }
                //Engine On
                else if (this.frameX >= 8) this.frameX = 3
                else this.frameX++
            }
            //Moving and Shooting
            else if (this.action === 'move shoot') {
                this.frameY = 0
                this.frameX = 4
            }
        }
    }
}

// Handle keyboard controls
let keysDown = {}; // object were we add up to 5 properties when keys go down and then delete them when the key goes up
addEventListener("keydown", function (e) { keysDown[e.keyCode] = true; }, false);
addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);
// Player Code //////////////////////////////////////////////////////////////////////////////////////

// General Code //////////////////////////////////////////////////////////////////////////////////////

// Background image
let bgImage = new Image()
bgImage.src = "images/background.png";

let gameState, time, collected //Game Specific
let asteroidFieldImageArray, asteroidFieldBackgroundImage1, asteroidFieldBackgroundImage2//Animated Background
let asteroidImage, collectibleImage, playerImage//Images
let asteroidArray, collectible, player, asteroidFieldBackground1, asteroidFieldBackground2//Objects

// GAME START / RESET
$("#playButton").click(() => {
    $("#playButton").css("display", "none")
    time = null

    asteroidFieldImageArray = new Array

    asteroidFieldImageArray.push(asteroidFieldBackgroundImage1 = new Image())
    asteroidFieldBackgroundImage1.src = "images/asteroidFieldBackgroundImage1.png"
    asteroidFieldBackground1 = new AsteroidField (0, 0-canvas.height,10)

    asteroidFieldImageArray.push(asteroidFieldBackgroundImage2 = new Image())
    asteroidFieldBackgroundImage2.src = "images/asteroidFieldBackgroundImage2.png"
    asteroidFieldBackground2 = new AsteroidField (1, 0-canvas.height,40)

    

    asteroidImage = new Image()
    asteroidImage.src = "images/asteroids/asteroidSpriteSheet.png"
    asteroidArray = new Array
    for (let i=0;i<5;i++) addAsteroid() //Creating Asteroids

    collected = 0
    collectibleImage = new Image()
    collectibleImage.src = "images/placeholderCollectible.jpg" //CHANGE TO PNG !!!
    collectible = new Collectible ()

    playerImage = new Image()
    playerImage.src = "images/spaceship/spaceShipSpriteSheet5.png"
    player = new Player()

    gameState = true
    requestAnimationFrame(main)
})

function render (delta) {
    //General Reset & Background Drawing
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(bgImage, 0, 0, 900, 900)

    //AsteroidField Drawing
    console.log(player.tally)
    asteroidFieldBackground1.update(delta / 1000)
    asteroidFieldBackground1.draw()
    asteroidFieldBackground2.update(delta / 1000)
    asteroidFieldBackground2.draw()
    
    //Asteroid Drawing
    for (let i = 0; i < asteroidArray.length; i++) {
        asteroidArray[i].update(delta / 1000) 
        asteroidArray[i].draw()
    }
    
    //Collectible Drawing
    collectible.update(delta / 1000)
    collectible.draw()
    
    //Player Drawing
    player.update(delta / 1000)
    player.draw()

    //Score Counter Drawing
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("PLACEHOLDER Collected: " + collected, 32, 32);
}

//Game Loop
function main(now) {
    if (time == null) {
        time = now
        ctx.reset()
        requestAnimationFrame(main)
        return
    }
    const delta = now - time
    time = now

    if (delta >= 1*1000) {//16.6 Is 60fps
    
    } 
    render(delta)
    if (gameState === true) requestAnimationFrame(main)
    else {
        console.log(gameState,collected)
        // if (collected < 5) alert("Too Bad!")
        // else alert ("Congrats!")
        $("#playButton").css("display", "block")}
}

// requestAnimationFrame(main)
// window.onload = setInterval(main, 1000/60)
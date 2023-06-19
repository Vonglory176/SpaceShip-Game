// AsteroidField Code /////////////////////////////////////////////////////////////////////////////////////
class AsteroidField {
    constructor(frameX, frameY, y, speed) {
        this.width = 900
        this.height = 900
        this.frameX = frameX
        this.frameY = frameY
        this.y = y

        this.speed = speed

    }
        draw(){
        ctx.save()
        ctx.translate(0,this.y)

        //function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {}
        //Image Properties
        ctx.drawImage(asteroidFieldImage, this.width*this.frameX, this.height*this.frameY, this.width, this.height,
            //Object Proportions
            0, 0, this.width, this.height)
        // ctx.drawImage(asteroidFieldImageArray[this.imageIndex],0, 0)

        ctx.restore()
    }
    update(modifier){
        if (!player.explode){
            if(this.y > canvas.height) this.y = this.height-canvas.height*2 //Maybe issue?
            this.y += this.speed*modifier 
        }
    }
}
// AsteroidField Code /////////////////////////////////////////////////////////////////////////////////////

// Asteroid Code //////////////////////////////////////////////////////////////////////////////////////
class Asteroid {
    constructor(){
        this.width = "72"
        this.height = "72"
        this.frameX = Math.floor(Math.random() * 4)
        this.frameY = 0
        
        this.size = Math.random() * 100 + 50
        this.speed = Math.random() * maxAsteroidSpeed + 100 // * 10 + 1
        this.angle = Math.random() * 360
        this.spin = Math.random() < 0.5 ? -1 : 1

        this.x = Math.random() * canvas.width
        this.y = this.size-canvas.height

        this.explode = false
        this.explodeFrameDuration = 0.5
        this.tally
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
        if (!player.explode){
            //If Asteroid Not Shot
            if (!this.explode) {
                this.angle += 3
                if(this.y - this.size/2 > canvas.height) this.resetPosition()
                this.y += this.speed*modifier
    
                // if (this.asteroidCollision(player.x, player.y, player.width, player.height, "player")) player.explode = true//gameState = false 
            }
            //If Asteroid Shot
            else {
                this.tally += modifier
                if (this.frameX < 3) {
                    if (this.tally > this.explodeFrameDuration) {
                        this.frameX++
                        this.tally = 0
                    }
                }
                else {
                    this.explode = false
                    this.frameY = 0
                    this.resetPosition()
                }
            }
        }
    }
    resetPosition () {
        this.y = this.size-canvas.height
        this.x = Math.random() * canvas.width
        this.frameX = Math.floor(Math.random() * 4)
        this.size = Math.random() * 100 + 50
        this.speed = Math.random() * maxAsteroidSpeed + 100 // * 10 + 1
    }
    asteroidCollision(rx, ry, rw, rh, objectType) { //cx, cy, radius, 
        // function collisionDetection() {
        // temporary variables to set edges for testing
        // let cx = this.x
        // let cy = this.y
        // let radius = this.size/2

        // let testX = cx;
        // let testY = cy;
        
        // // which edge is closest?
        // if (cx < rx)         testX = rx  // test left edge
        // else if (cx > rx+rw) testX = rx/2;//2??   // right edge
        // if (cy < ry)         testY = ry  // top edge
        // else if (cy > ry+rh) testY = ry/2;//2??   // bottom edge
        
        // // get distance from closest edges
        // let distX = cx-testX;
        // let distY = cy-testY;
        // let distance = Math.sqrt( (distX*distX) + (distY*distY) );
        
        // // if the distance is less than the radius, collision!
        // if (distance <= radius && !this.explode) {
        //     if (objectType === "bullet" && rw > 0) {
        //         $(asteroidExplosionSound).prop('currentTime',0)
        //         $(asteroidExplosionSound).trigger('play')
        //         //ADD EXPLOSION SPRITE
        //         this.explode = true
        //         this.tally = 0
        //         this.frameX = 0
        //         this.frameY = 1
        //         //this.resetPosition()
        //     }
        //     return true
        // }

        if(
            objectType !== "bullet" &&
            player.x + player.width >= this.x &&
            player.x <= this.x + (this.size*0.6) &&
            player.y + player.height >= this.y &&
            player.y <= this.y + (this.size*0.6) &&
            !this.explode
        ) {
            return true
        } 
        else if (
            objectType === "bullet" &&
            rx + rw >= this.x &&
            rx <= this.x + (this.size*0.6) &&
            ry + rh >= this.y &&
            ry <= this.y + (this.size*0.6) &&
            !this.explode
        ) {
            $(asteroidExplosionSound).prop('currentTime',0)
            $(asteroidExplosionSound).trigger('play')
            //ADD EXPLOSION SPRITE
            this.explode = true
            this.tally = 0
            this.frameX = 0
            this.frameY = 1
            //this.resetPosition()
            return true
        }
    }
}
function addAsteroid () {asteroidArray.push(new Asteroid(maxAsteroidSpeed))}
// Asteroid Code //////////////////////////////////////////////////////////////////////////////////////

// Collectible Code /////////////////////////////////////////////////////////////////////////////////
class Collectible {
    constructor() {
        this.frameX = 0
        this.frameY = 0
        this.frameDuration = 1
        this.explodeFrameDuration = 0.5
        this.tally = 0
        this.explode = false

        this.height = 55
        this.width = 36

        this.size = 50
        this.speed = 150 // * 10 + 1
        this.angle = Math.random() * 360
        this.spin = Math.random() < 0.5 ? -1 : 1

        this.x = Math.random() * canvas.width
        this.y = -this.size
    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle * Math.PI/360 * this.spin)
        ctx.drawImage(collectibleImage, this.width*this.frameX, this.height*this.frameY, 
            this.width, this.height, 0 - this.width/2, 0 - this.height/2, this.width, this.height)
        // ctx.drawImage(collectibleImage, 0 - this.size/2, 0- this.size/2, this.size, this.size)
        ctx.restore()
    }
    update(modifier){
        if (!player.explode){
            this.tally += modifier
            if (!this.explode) collectibleShot()
            if (!this.explode) {
                this.angle += 5
                if(this.y - this.size > canvas.height || collectibleCollision()) this.resetPosition()
                this.y += this.speed*modifier
    
                if (this.tally > this.frameDuration) {
                    if (this.frameX === 0) this.frameX++
                    else this.frameX = 0
                    this.tally = 0
                }
            }
            else {
                if (this.frameX < 3) {
                    if (this.tally > this.explodeFrameDuration) {
                        this.frameX++
                        this.tally = 0
                    }
                }
                else {
                    this.explode = false
                    this.frameX = 0
                    this.frameY = 0
                    this.height = 55
                    this.width = 36
                    this.resetPosition()
                }
            }
        }
    }
    resetPosition(){
        this.y = 0 - this.size
        this.x = Math.random() * canvas.width
    }
}
//COLLECTIBLE PICKUP
function collectibleCollision(){ //Include negation for player?
    if(
        player.x + player.width/2 >= collectible.x &&
        player.x <= collectible.x + (collectible.size) &&
        player.y + player.height/2 >= collectible.y &&
        player.y <= collectible.y + (collectible.size)&&
        !player.explode
    ) {
        $(collectedPodSound).prop('currentTime',0)
        $(collectedPodSound).trigger('play')
        addAsteroid()
        collected++
        return true
    }    
}
function collectibleShot(){
    for (let i=0;i<bulletArray.length;i++){
        if(
            bulletArray[i].x + bulletArray[i].width/2 >= collectible.x &&
            bulletArray[i].x <= collectible.x + (collectible.size) &&
            bulletArray[i].y + bulletArray[i].height/2 >= collectible.y &&
            bulletArray[i].y <= collectible.y + (collectible.size) && 
            bulletArray[i].width > 0
        ) {
            $(asteroidExplosionSound).prop('currentTime',0)
            $(asteroidExplosionSound).trigger('play')
            bulletArray[i].width = 0
            collectible.explode = true
            collectible.frameY = 1
            collectible.frameX = 0
            collectible.width = collectible.height = 72
            collectible.tally = 0
            collected--
        }
    }
}
// Collectible Code /////////////////////////////////////////////////////////////////////////////////

// Player Code //////////////////////////////////////////////////////////////////////////////////////
class Player {
    constructor(){
        // this.width = "72"
        // this.height = "100"
        this.width = 36
        this.height = 78
        this.frameX = 0
        this.frameY = 0

        this.x = canvas.width / 2 + .01450000000006 // Works?????
	    this.y = canvas.height / 2 + .01450000000006
        this.topSpeed = 275
        this.speedIncrease = 10
        this.speedLoss = 1
        this.speedX = 0
        this.speedY = 0

        this.move = false
        this.angle = 0 //720 //0 90 180 270 360 450 540 630
        this.spin = 1 //Math.random() < 0.5 ? -1 : 1

        this.tally = 0
        this.shoot = false
        this.shootAnimationTimer = 0.5
        this.shootDelay = 1
        this.explode = false
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
        this.tally += modifier
        for (let i=0;i<asteroidArray.length;i++){
            // if (this.angle === 180 || this.angle === 630) { //Maybe uneccesary?
            //     if (asteroidArray[i].asteroidCollision(this.x, this.y, this.height, this.width, "player")) this.explode = true
            // }
            // else {
                if (asteroidArray[i].asteroidCollision(this.x, this.y, this.width, this.height, "player")) this.explode = true
            //}
            
        }

        //Exploding Check
        if(this.explode === true) {
            if (this.frameY < 3) {
                this.tally = 0

                $(thrusterSound).trigger('pause')
                $(collisionSound).trigger('play')
                this.width = "100"
                this.height = "100"
                this.frameX = 0
                this.frameY = 3
            }
            else if (this.frameY === 3 && this.tally < 1) {
                $(electricitySound).trigger('play')
                
            }
            else if (this.tally < 1.8) {
                $(explosionSound).trigger('play')
                this.frameY = 4
            }
            else if (this.tally > 1.8) {
                $(gameOverSound).trigger('play')
                gameState = false
            }
        }
        else {
            //PLAYER KEYPRESS CHECKS
            let right = 39, left = 37, up = 38, down = 40, shoot = 32
            if (up in keysDown || down in keysDown || left in keysDown || right in keysDown) {
                $(thrusterSound).trigger('play')
                if (this.move === false) this.frameX = 0 
                this.move = true

                //Top Left
                if(up in keysDown && left in keysDown && this.y > (this.height/2) && this.x > (this.width/2)){
                    this.speedY += this.speedY > -this.topSpeed ? -this.speedIncrease : 0
                    this.speedX += this.speedX > -this.topSpeed ? -this.speedIncrease : 0
                    this.angle = 630
                }
                //Top Right
                else if(up in keysDown && right in keysDown && this.y > (this.height/2) && this.x < canvas.width - (this.width/2)){
                    this.speedY += this.speedY > -this.topSpeed ? -this.speedIncrease : 0
                    this.speedX += this.speedX < this.topSpeed ? this.speedIncrease : 0
                    this.angle = 90
                }
                //Bottom Left
                else if(down in keysDown && left in keysDown && this.y < (canvas.height - (this.height/2)) && this.x > (this.width/2)){
                    this.speedY += this.speedY < this.topSpeed ? this.speedIncrease : 0
                    this.speedX += this.speedX > -this.topSpeed ? -this.speedIncrease : 0
                    this.angle = 450
                }
                //Bottom Right
                else if(down in keysDown && right in keysDown && this.y < canvas.height - (this.height/2) && this.x < canvas.width - (this.width/2)){
                    this.speedY += this.speedY < this.topSpeed ? this.speedIncrease : 0
                    this.speedX += this.speedX < this.topSpeed ? this.speedIncrease : 0
                    this.angle = 270
                }
                //Top
                else if (up in keysDown && this.y > (this.height/2)) { //  holding up key
                    this.speedY += this.speedY > -this.topSpeed ? -this.speedIncrease : 0
                    this.angle = 0
                }
                //Bottom
                else if (down in keysDown && this.y < canvas.height - (this.height/2)) { //  holding down key
                    this.speedY += this.speedY < this.topSpeed ? this.speedIncrease : 0
                    this.angle = 360	
                }
                //Left
                else if (left in keysDown && this.x > (this.width/2)) { // holding left key
                    this.speedX += this.speedX > -this.topSpeed ? -this.speedIncrease : 0
                    this.angle = 540
                }
                //Right
                else if (right in keysDown && this.x < canvas.width - (this.width/2)) { // holding right key
                    this.speedX += this.speedX < this.topSpeed ? this.speedIncrease : 0
                    this.angle = 180
                }
            }
            //Shooting while idle?
            else {
                this.move = false
                
                //Inertia + Movement Translation
                $(thrusterSound).trigger('pause')
                if (this.speedY < 0) this.speedY += this.speedLoss
                if (this.speedY > 0) this.speedY -= this.speedLoss
                if (this.speedX < 0) this.speedX += this.speedLoss
                if (this.speedX > 0) this.speedX -= this.speedLoss
                
            }
            if (this.speedY < 0 && this.y > (this.height/2)) this.y += this.speedY*modifier
            if (this.speedY > 0 && this.y < canvas.height - (this.height/2)) this.y += this.speedY*modifier
            if (this.speedX < 0 && this.x > (this.width/2)) this.x += this.speedX*modifier
            if (this.speedX > 0 && this.x < canvas.width - (this.width/2)) this.x += this.speedX*modifier

            //SPRITE UPDATE (And shooting trigger)
            //Shooting?
            if (shoot in keysDown && this.shootDelay < this.tally) {
                $(shootSound).prop('currentTime',0)
                $(shootSound).trigger('play')
                bulletArray.push(new Bullet(this.x,this.y,this.angle))
                this.shoot = true
                this.tally = 0
            }
            if(this.shoot && this.shootDelay < this.tally) this.shoot = false    

            if (this.move) {
                this.frameY = this.shoot && this.tally < 0.5 ? 1 : 2 

                //Engine Start
                if (this.frameX < 3) this.frameX++

                //Engine On
                else if (this.frameX >= 8) this.frameX = 3
                else this.frameX++
            }

            //Idle
            else if (this.move === false) {
                if (this.shoot === false || this.tally > 0.5) this.frameX = this.frameY = 0 //Idle Shooting
                else {
                    this.frameX = 1
                    this.frameY = 0 
                }
            }
        }
    }
}

class Bullet {
    constructor(x,y,angle) {
        this.width = 30
        this.height = 17.4
        this.speed = 400
        this.angle = angle //0 90 180 270 360 450 540 630

        if (angle === 0) { //Top 
            this.x = x
            this.y = y - 30
            this.speedX = 0
            this.speedY = -this.speed
        }
        if (angle === 90) { //Top Right
            this.x = x + 15
            this.y = y - 15
            this.speedX = this.speed
            this.speedY = -this.speed
        }
        if (angle === 180) { //Right
            this.x = x + 30
            this.y = y
            this.speedX = this.speed
            this.speedY = 0
        }
        if (angle === 270) { //Bottom Right
            this.x = x + 15
            this.y = y + 15
            this.speedX = this.speed
            this.speedY = this.speed
        }
        if (angle === 360) { //Bottom
            this.x = x
            this.y = y + 30
            this.speedX = 0
            this.speedY = this.speed
        }
        if (angle === 450) { //Bottom Left
            this.x = x - 15
            this.y = y + 15
            this.speedX = -this.speed
            this.speedY = this.speed
        }
        if (angle === 540) { //Left
            this.x = x - 15
            this.y = y
            this.speedX = -this.speed
            this.speedY = 0
        }
        if (angle === 630) { //Top Left
            this.x = x - 15
            this.y = y - 15
            this.speedX = -this.speed
            this.speedY = -this.speed
        }
    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle * Math.PI/360)
        ctx.drawImage(bulletImage, -this.width/2, -this.height/2, this.width, this.height)
        ctx.restore()
    }
    update(modifier){
        if (!player.explode){
            if (this.y < -this.height || this.y - this.height > canvas.height ||
                this.x < -this.width || this.x - this.width > canvas.width) return true //Remove if out of bounds
            
                console.log(this.x,this.y,this.width-8,this.height)
            if (this.width > 0) {
                for (let i=0;i<asteroidArray.length;i++) { //Hit once and disappear
                    if (asteroidArray[i].asteroidCollision(this.x, this.y, this.width-8, this.height, "bullet")) this.width = 0 
                }
            }
    
            this.y += this.speedY*modifier
            this.x += this.speedX*modifier
        }
    }

}

// Handle keyboard controls
let keysDown = {}; // object were we add up to 5 properties when keys go down and then delete them when the key goes up
addEventListener("keydown", function (e) { keysDown[e.keyCode] = true; }, false);
addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);
// Player Code //////////////////////////////////////////////////////////////////////////////////////

// Asset Code //////////////////////////////////////////////////////////////////////////////////////
let loadProgress = 0
function loading () {

}

// Audio ////
let gameStartSound = new Audio('sounds/GameStart.wav'); gameStartSound.volume=0.5;// gameStartSound.onload = () => {loadProgress += 1}
let gameMusic = new Audio('sounds/GameMusic.wav'); gameMusic.volume=0.3;// gameMusic.onload = () => {loadProgress += 1}
let gameOverSound = new Audio('sounds/GameOver.wav'); gameOverSound.volume=0.5;// gameOverSound.onload = () => {loadProgress += 1}

let buttonClickSound = new Audio('sounds/ButtonClick.wav'); buttonClickSound.volume=0.5;// buttonClickSound.onload = () => {loadProgress += 1}
let buttonHoverSound = new Audio('sounds/ButtonHover.wav'); buttonHoverSound.volume=0.5;// buttonHoverSound.onload = () => {loadProgress += 1}

let thrusterSound = new Audio('sounds/Thruster.mp3'); thrusterSound.volume=0.9;// thrusterSound.onload = () => {loadProgress += 1}
let collectedPodSound = new Audio('sounds/CollectedPod.wav'); collectedPodSound.volume=0.5;// collectedPodSound.onload = () => {loadProgress += 1}
let shootSound = new Audio('sounds/Shoot.wav'); shootSound.volume=0.5;// shootSound.onload = () => {loadProgress += 1}
let asteroidExplosionSound = new Audio('sounds/AsteroidExplosion.wav'); asteroidExplosionSound.volume=0.5;// asteroidExplosionSound.onload = () => {loadProgress += 1}

let collisionSound = new Audio('sounds/AsteroidCollision.wav'); collisionSound.volume=0.5;// collisionSound.onload = () => {loadProgress += 1}
let electricitySound = new Audio('sounds/Electricity.wav'); electricitySound.volume=0.5;// electricitySound.onload = () => {loadProgress += 1}
let explosionSound = new Audio('sounds/Explosion.wav'); explosionSound.volume=0.5;// explosionSound.onload = () => {loadProgress += 1}

$("button").mouseenter(()=>{
    $(buttonHoverSound).prop('currentTime',0)
    $(buttonHoverSound).trigger('play')
})
$("#submitButton").click(()=>{$(buttonClickSound).trigger('play')})
$(".difficultyButton").click(()=>{$(gameStartSound).trigger('play')})

// Images ////
let bgImage = new Image(); bgImage.onload = () => {loadProgress += 1}
bgImage.src = "images/background/background.png"

let asteroidFieldImage = new Image(); asteroidFieldImage.onload = () => {loadProgress += 1}
asteroidFieldImage.src = "images/background/asteroidFieldBackgroundImage3.png"

let asteroidImage = new Image(); asteroidImage.onload = () => {loadProgress += 1}
asteroidImage.src = "images/asteroids/asteroidSpriteSheet2.png"

let collectibleImage = new Image(); collectibleImage.onload = () => {loadProgress += 1}
collectibleImage.src = "images/lifepod/lifepodSpriteSheet.png"

let bulletImage = new Image(); bulletImage.onload = () => {loadProgress += 1}
bulletImage.src = "images/bullet.png"

let playerImage = new Image(); playerImage.onload = () => {loadProgress += 1}
playerImage.src = "images/spaceship/spaceShipSpriteSheet5.png"
// Asset Code //////////////////////////////////////////////////////////////////////////////////////

// General Code //////////////////////////////////////////////////////////////////////////////////////
// Cross-browser support for requestAnimationFrame
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//Background
let canvas = document.getElementById("gameCanvas"); canvas.width = 900; canvas.height = 900
let ctx = canvas.getContext("2d")

//Game Specific
let gameState, time, collected, difficulty, maxAsteroidSpeed

//Objects
let asteroidArray, collectible, player, bulletArray, asteroidField1, asteroidField2, asteroidField3, asteroidField4

//Score Keeping
let scoreArray = []
function score (initials) {
    this.initials = initials
    this.collected = collected
    this.difficulty = difficulty
}

// GAME START / RESET
$("#playButtonEasy").click(() => {startGame(1, 200)})
$("#playButtonNormal").click(() => {startGame(2, 500)}) //Second Value is AsteroidMaxSpeed
$("#playButtonHard").click(() => {startGame(3, 600)})

function startGame (gameDifficulty, asteroidSpeed) {
    if (loadProgress === 6) {
        $("#startScreen").css("display", "none")
        $("#gameCanvas").css("display", "block")
    
        //Game
        difficulty = gameDifficulty
        maxAsteroidSpeed = asteroidSpeed
        time = null
        
        //Asteroid Background    
        asteroidField1 = new AsteroidField (0, 0, 0-canvas.height, 10)
        asteroidField2 = new AsteroidField (0, 1, 0, 10)
        asteroidField3 = new AsteroidField (1, 0, 0 -canvas.height, 40)
        asteroidField4 = new AsteroidField (1, 1, 0, 40)
    
        //Asteroids
        asteroidArray = new Array
        for (let i=0;i<5;i++) addAsteroid(maxAsteroidSpeed) //Creating Asteroids
    
        //LifePods
        collected = 0
        collectible = new Collectible ()
    
        //Bullet Control
        bulletArray = new Array
    
        //Player
        player = new Player()
    
        //Start Game
        gameState = true
        requestAnimationFrame(main)
    }
    else alert(`Game is still loading, please try again in a moment! Progress: ${(loadProgress/6)*100}%`)
}


function render (delta) {
    //General Reset & Background Drawing
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(bgImage, 0, 0, 900, 900)
    $(gameMusic).trigger('play')

    //AsteroidField Drawing
    asteroidField1.update(delta / 1000)
    asteroidField1.draw()
    asteroidField2.update(delta / 1000)
    asteroidField2.draw()
    asteroidField3.update(delta / 1000)
    asteroidField3.draw()
    asteroidField4.update(delta / 1000)
    asteroidField4.draw()
    
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

    //Bullet Control
    let remove = -1
    for (let i=0;i<bulletArray.length;i++) {
        // bulletArray[i].update(delta / 1000)
        if (bulletArray[i].update(delta / 1000)) remove = i
        bulletArray[i].draw()
    }
    if (remove > -1) bulletArray.splice(remove,1)
    
    //Score Counter Drawing
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("LifePods Collected: " + collected, 32, 32);
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
        $(gameMusic).trigger('pause')

        $("#endScore").text(`${collected? collected : 0}`)
        $("#endDifficulty").text(`${difficultyTranslator(difficulty)}`)

        $("#gameCanvas").css("display","none")
        $("#endScreen").css("display", "block")
    }
}

//Game End
$("#submitButton").click(() => {
    let initials = ($("#initialsInput").val()).trim()
    if (initials) {
        scoreArray.push(new score(initials))
   

        $("#scoreContainer").html("")
        for (let i=0;i<scoreArray.length;i++) $("#scoreContainer").append(`<p>${(scoreArray[i].initials).toUpperCase()}: ${scoreArray[i].collected} ${difficultyTranslator(scoreArray[i].difficulty)}</p>`)

    }

    $("#endScreen").css("display", "none")
    $("#startScreen").css("display", "block")
})

function difficultyTranslator (difficulty) {
    if (difficulty === 1) return "Easy"
    else if (difficulty === 2) return "Normal"
    else if (difficulty === 3) return "Hard"
}

function scoreArraySort () {
    scoreArray = scoreArray.sort((p1, p2) => (p1.difficulty > p2.difficulty) ? -1 : (p1.difficulty < p2.difficulty) ? 1 : 0) //Sorting by Difficulty
    scoreArray = scoreArray.sort((p1, p2) => (p1.collected > p2.collected) ? -1 : (p1.collected > p2.collected) ? 1 : 0) //Sorting by Score
}

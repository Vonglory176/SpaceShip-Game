import { assets } from "../hooks/loadAssets"
// const { asteroidFieldImage, asteroidImage, collectibleImage, playerImage } = assets

// Images ////
// let bgImage = new Image(); // bgImage.onload = () => {loadProgress += 1}
// bgImage.src = "images/background/background.png"

let asteroidFieldImage = new Image(); // asteroidFieldImage.onload = () => {loadProgress += 1}
asteroidFieldImage.src = "images/background/asteroidFieldBackgroundImage3.png"

let asteroidImage = new Image(); // asteroidImage.onload = () => {loadProgress += 1}
asteroidImage.src = "images/asteroids/asteroidSpriteSheet2.png"

let collectibleImage = new Image(); // collectibleImage.onload = () => {loadProgress += 1}
collectibleImage.src = "images/lifepod/lifepodSpriteSheet.png"

let bulletImage = new Image(); // bulletImage.onload = () => {loadProgress += 1}
bulletImage.src = "images/bullet.png"

let playerImage = new Image(); // playerImage.onload = () => {loadProgress += 1}
playerImage.src = "images/spaceship/spaceShipSpriteSheet5.png"

let keysDown = {} // Initialize keysDown as an empty object

// Add event listeners to update keysDown
window.addEventListener('keydown', (e) => {
    keysDown[e.keyCode] = true
})

window.addEventListener('keyup', (e) => {
    delete keysDown[e.keyCode]
})

// AsteroidField Code /////////////////////////////////////////////////////////////////////////////////////
class AsteroidField {
    constructor(frameX, frameY, y, speed, ctx, canvas, gameStateRef) {
        this.width = 900
        this.height = 900
        this.frameX = frameX
        this.frameY = frameY
        this.y = y
        this.ctx = ctx
        this.canvas = canvas

        this.speed = speed
        this.gameStateRef = gameStateRef
    }
        draw(){
        this.this.ctx.save()
        this.this.ctx.translate(0,this.y)

        //function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {}
        //Image Properties
        this.ctx.drawImage(asteroidFieldImage, this.width*this.frameX, this.height*this.frameY, this.width, this.height,
            //Object Proportions
            0, 0, this.width, this.height)
        // this.ctx.drawImage(asteroidFieldImageArray[this.imageIndex],0, 0)

        this.ctx.restore()
    }
    update(modifier){
        if (!this.gameStateRef.current.player.explode){
            if(this.y > this.canvas.height) this.y = this.height-this.canvas.height*2 //Maybe issue?
            this.y += this.speed*modifier 
        }
    }
}
// AsteroidField Code /////////////////////////////////////////////////////////////////////////////////////

// Asteroid Code //////////////////////////////////////////////////////////////////////////////////////
class Asteroid {
    constructor(ctx, canvas, maxAsteroidSpeed, gameStateRef){
        this.width = "72"
        this.height = "72"
        this.frameX = Math.floor(Math.random() * 4)
        this.frameY = 0
        
        this.size = Math.random() * 100 + 50
        this.speed = Math.random() * maxAsteroidSpeed + 100 // * 10 + 1
        this.maxAsteroidSpeed = maxAsteroidSpeed
        this.angle = Math.random() * 360
        this.spin = Math.random() < 0.5 ? -1 : 1

        this.x = Math.random() * canvas.width
        this.y = this.size-canvas.height

        this.explode = false
        this.explodeFrameDuration = 0.5
        this.tally = 0
        this.ctx = ctx
        this.canvas = canvas
        this.gameStateRef = gameStateRef
    }
    draw(){
        this.ctx.save()
        this.ctx.translate(this.x,this.y)
        this.ctx.rotate(this.angle * Math.PI/360 * this.spin)

        //function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {}
        //Image Properties
        this.ctx.drawImage(asteroidImage, this.width*this.frameX, this.height*this.frameY, this.width, this.height,
            //Object Proportions
            0 - this.size/2, 0 - this.size/2, this.size, this.size)

        this.ctx.restore()
    }
    update(modifier){
        if (!this.gameStateRef.current.player.explode){
            //If Asteroid Not Shot
            if (!this.explode) {
                this.angle += 3
                if(this.y - this.size/2 > this.canvas.height) this.resetPosition()
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
        this.y = this.size-this.canvas.height
        this.x = Math.random() * this.canvas.width
        this.frameX = Math.floor(Math.random() * 4)
        this.size = Math.random() * 100 + 50
        this.speed = Math.random() * this.maxAsteroidSpeed + 100 // * 10 + 1
    }
    // asteroidCollision(rx, ry, rw, rh, objectType) { //cx, cy, radius, 
    //     // function collisionDetection() {
    //     // temporary variables to set edges for testing
    //     // let cx = this.x
    //     // let cy = this.y
    //     // let radius = this.size/2

    //     // let testX = cx;
    //     // let testY = cy;
        
    //     // // which edge is closest?
    //     // if (cx < rx)         testX = rx  // test left edge
    //     // else if (cx > rx+rw) testX = rx/2;//2??   // right edge
    //     // if (cy < ry)         testY = ry  // top edge
    //     // else if (cy > ry+rh) testY = ry/2;//2??   // bottom edge
        
    //     // // get distance from closest edges
    //     // let distX = cx-testX;
    //     // let distY = cy-testY;
    //     // let distance = Math.sqrt( (distX*distX) + (distY*distY) );
        
    //     // // if the distance is less than the radius, collision!
    //     // if (distance <= radius && !this.explode) {
    //     //     if (objectType === "bullet" && rw > 0) {
    //     //         $(asteroidExplosionSound).prop('currentTime',0)
    //     //         $(asteroidExplosionSound).trigger('play')
    //     //         //ADD EXPLOSION SPRITE
    //     //         this.explode = true
    //     //         this.tally = 0
    //     //         this.frameX = 0
    //     //         this.frameY = 1
    //     //         //this.resetPosition()
    //     //     }
    //     //     return true
    //     // }

    //     if(
    //         objectType !== "bullet" &&
    //         player.x + player.width >= this.x &&
    //         player.x <= this.x + (this.size*0.6) &&
    //         player.y + player.height >= this.y &&
    //         player.y <= this.y + (this.size*0.6) &&
    //         !this.explode
    //     ) {
    //         return true
    //     } 
    //     else if (
    //         objectType === "bullet" &&
    //         rx + rw >= this.x &&
    //         rx <= this.x + (this.size*0.6) &&
    //         ry + rh >= this.y &&
    //         ry <= this.y + (this.size*0.6) &&
    //         !this.explode
    //     ) {
    //         $(asteroidExplosionSound).prop('currentTime',0)
    //         $(asteroidExplosionSound).trigger('play')
    //         //ADD EXPLOSION SPRITE
    //         this.explode = true
    //         this.tally = 0
    //         this.frameX = 0
    //         this.frameY = 1
    //         //this.resetPosition()
    //         return true
    //     }
    // }
}
// function addAsteroid () {asteroidArray.push(new Asteroid(maxAsteroidSpeed))}
// Asteroid Code //////////////////////////////////////////////////////////////////////////////////////

// Collectible Code /////////////////////////////////////////////////////////////////////////////////
class Collectible {
    constructor(ctx, canvas, gameStateRef, addAsteroid) {
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
        this.ctx = ctx
        this.canvas = canvas
        this.gameStateRef = gameStateRef
        this.addAsteroid = () => addAsteroid(this.ctx, this.canvas)
    }
    draw(){
        this.ctx.save()
        this.ctx.translate(this.x,this.y)
        this.ctx.rotate(this.angle * Math.PI/360 * this.spin)
        this.ctx.drawImage(collectibleImage, this.width*this.frameX, this.height*this.frameY, 
            this.width, this.height, 0 - this.width/2, 0 - this.height/2, this.width, this.height)
        // this.ctx.drawImage(collectibleImage, 0 - this.size/2, 0- this.size/2, this.size, this.size)
        this.ctx.restore()
    }
    update(modifier){
        if (!this.gameStateRef.current.player.explode){
            this.tally += modifier
            if (!this.explode) collectibleShot()
            if (!this.explode) {
                this.angle += 5
                if(this.y - this.size > this.canvas.height || collectibleCollision()) this.resetPosition()
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
        this.x = Math.random() * this.canvas.width
    }
}
//COLLECTIBLE PICKUP
function collectibleCollision(player, collectible, collected, addAsteroid){ //Include negation for player?
    // let { player, collectible, collected } = this.gameStateRef.current
    if(
        player.x + player.width/2 >= collectible.x &&
        player.x <= collectible.x + (collectible.size) &&
        player.y + player.height/2 >= collectible.y &&
        player.y <= collectible.y + (collectible.size)&&
        !player.explode
    ) {
        // $(collectedPodSound).prop('currentTime',0)
        // $(collectedPodSound).trigger('play')
        addAsteroid() // this.ctx, this.canvas
        collected++
        return true
    }    
}
function collectibleShot(collectible, bulletArray, collected){
    // let { collectible, bulletArray, collected } = this.gameStateRef.current
    for (let i=0;i<bulletArray.length;i++){
        if(
            bulletArray[i].x + bulletArray[i].width/2 >= collectible.x &&
            bulletArray[i].x <= collectible.x + (collectible.size) &&
            bulletArray[i].y + bulletArray[i].height/2 >= collectible.y &&
            bulletArray[i].y <= collectible.y + (collectible.size) && 
            bulletArray[i].width > 0
        ) {
            // $(asteroidExplosionSound).prop('currentTime',0)
            // $(asteroidExplosionSound).trigger('play')
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
    constructor(ctx, canvas, gameStateRef) {
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
        this.ctx = ctx
        this.canvas = canvas
        this.gameStateRef = gameStateRef
    }
    draw(){
        this.ctx.save()
        this.ctx.translate(this.x,this.y)
        this.ctx.rotate(this.angle * Math.PI/360)

        //function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {}
        this.ctx.drawImage(playerImage, this.width*this.frameX, this.height*this.frameY, 
            this.width, this.height, 0 - this.width/2, 0 - this.height/2, this.width, this.height)

        this.ctx.restore()
    }
    update(modifier){
        let { asteroidArray } = this.gameStateRef.current

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

                // $(thrusterSound).trigger('pause')
                // $(collisionSound).trigger('play')
                this.width = "100"
                this.height = "100"
                this.frameX = 0
                this.frameY = 3
            }
            else if (this.frameY === 3 && this.tally < 1) {
                // $(electricitySound).trigger('play')
                
            }
            else if (this.tally < 1.8) {
                // $(explosionSound).trigger('play')
                this.frameY = 4
            }
            else if (this.tally > 1.8) {
                // $(gameOverSound).trigger('play')
                this.gameStateRef.current.gameState = false
            }
        }
        else {
            //PLAYER KEYPRESS CHECKS
            let right = 39, left = 37, up = 38, down = 40, shoot = 32
            if (up in keysDown || down in keysDown || left in keysDown || right in keysDown) {
                // $(thrusterSound).trigger('play')
                if (this.move === false) this.frameX = 0 
                this.move = true

                //Top Left
                if(up in keysDown && left in keysDown && this.y > (this.height/2) && this.x > (this.width/2)){
                    this.speedY += this.speedY > -this.topSpeed ? -this.speedIncrease : 0
                    this.speedX += this.speedX > -this.topSpeed ? -this.speedIncrease : 0
                    this.angle = 630
                }
                //Top Right
                else if(up in keysDown && right in keysDown && this.y > (this.height/2) && this.x < this.canvas.width - (this.width/2)){
                    this.speedY += this.speedY > -this.topSpeed ? -this.speedIncrease : 0
                    this.speedX += this.speedX < this.topSpeed ? this.speedIncrease : 0
                    this.angle = 90
                }
                //Bottom Left
                else if(down in keysDown && left in keysDown && this.y < (this.canvas.height - (this.height/2)) && this.x > (this.width/2)){
                    this.speedY += this.speedY < this.topSpeed ? this.speedIncrease : 0
                    this.speedX += this.speedX > -this.topSpeed ? -this.speedIncrease : 0
                    this.angle = 450
                }
                //Bottom Right
                else if(down in keysDown && right in keysDown && this.y < this.canvas.height - (this.height/2) && this.x < this.canvas.width - (this.width/2)){
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
                else if (down in keysDown && this.y < this.canvas.height - (this.height/2)) { //  holding down key
                    this.speedY += this.speedY < this.topSpeed ? this.speedIncrease : 0
                    this.angle = 360	
                }
                //Left
                else if (left in keysDown && this.x > (this.width/2)) { // holding left key
                    this.speedX += this.speedX > -this.topSpeed ? -this.speedIncrease : 0
                    this.angle = 540
                }
                //Right
                else if (right in keysDown && this.x < this.canvas.width - (this.width/2)) { // holding right key
                    this.speedX += this.speedX < this.topSpeed ? this.speedIncrease : 0
                    this.angle = 180
                }
            }
            //Shooting while idle?
            else {
                this.move = false
                
                //Inertia + Movement Translation
                // $(thrusterSound).trigger('pause')
                if (this.speedY < 0) this.speedY += this.speedLoss
                if (this.speedY > 0) this.speedY -= this.speedLoss
                if (this.speedX < 0) this.speedX += this.speedLoss
                if (this.speedX > 0) this.speedX -= this.speedLoss
                
            }
            if (this.speedY < 0 && this.y > (this.height/2)) this.y += this.speedY*modifier
            if (this.speedY > 0 && this.y < this.canvas.height - (this.height/2)) this.y += this.speedY*modifier
            if (this.speedX < 0 && this.x > (this.width/2)) this.x += this.speedX*modifier
            if (this.speedX > 0 && this.x < this.canvas.width - (this.width/2)) this.x += this.speedX*modifier

            //SPRITE UPDATE (And shooting trigger)
            //Shooting?
            if (shoot in keysDown && this.shootDelay < this.tally) {
                // $(shootSound).prop('currentTime',0)
                // $(shootSound).trigger('play')
                this.gameStateRef.current.bulletArray.push(new Bullet(this.x,this.y,this.angle))
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
    constructor(x,y,angle,ctx, canvas, gameStateRef) {
        this.width = 30
        this.height = 17.4
        this.speed = 400
        this.angle = angle //0 90 180 270 360 450 540 630
        this.ctx = ctx
        this.canvas = canvas
        this.gameStateRef = gameStateRef

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
        this.ctx.save()
        this.ctx.translate(this.x,this.y)
        this.ctx.rotate(this.angle * Math.PI/360)
        this.ctx.drawImage(bulletImage, -this.width/2, -this.height/2, this.width, this.height)
        this.ctx.restore()
    }
    update(modifier){
        let { player, asteroidArray } = this.gameStateRef.current
        if (!player.explode){
            if (this.y < -this.height || this.y - this.height > this.canvas.height ||
                this.x < -this.width || this.x - this.width > this.canvas.width) return true //Remove if out of bounds
            
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

export {
    Player,
    Bullet,
    AsteroidField,
    Asteroid,
    Collectible
}
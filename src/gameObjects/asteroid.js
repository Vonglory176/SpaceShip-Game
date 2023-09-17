class Asteroid {
    constructor(canvas, maxAsteroidSpeed){

        this.width = "72"
        this.height = "72"
        this.frameX = Math.floor(Math.random() * 4)
        this.frameY = 0
        
        this.size = Math.random() * 100 + 50

        this.maxAsteroidSpeed = maxAsteroidSpeed
        this.speed = Math.random() * this.maxAsteroidSpeed + 100 // * 10 + 1

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
    update(modifier, canvas, player){
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
    resetPosition (canvas) {
        this.y = this.size-canvas.height
        this.x = Math.random() * canvas.width
        this.frameX = Math.floor(Math.random() * 4)

        this.size = Math.random() * 100 + 50

        this.speed = Math.random() * this.maxAsteroidSpeed + 100 // * 10 + 1
    }
    asteroidCollision(rx, ry, rw, rh, objectType, player) { //cx, cy, radius, 
        {/* function collisionDetection() {
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
        // }*/}
        
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
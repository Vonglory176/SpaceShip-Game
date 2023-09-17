class Player {
    constructor(canvas){
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
    update(modifier, asteroidArray){
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
                gameState = false //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
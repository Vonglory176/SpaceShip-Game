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
    update(modifier, canvas, player, asteroidArray){
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
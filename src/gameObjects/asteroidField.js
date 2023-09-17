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
    update(modifier, canvas, playerExplode){
        if (!playerExplode){
            if(this.y > canvas.height) this.y = this.height-canvas.height*2 //Maybe issue?
            this.y += this.speed*modifier 
        }
    }
}
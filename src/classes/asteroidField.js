// AsteroidField Code /////////////////////////////////////////////////////////////////////////////////////
export default class AsteroidField {
    constructor(frameX, frameY, y, speed, ctx, canvas, gameStateRef, asteroidFieldImage) {
        this.width = 900
        this.height = 900
        this.frameX = frameX
        this.frameY = frameY
        this.y = y
        this.ctx = ctx
        this.canvas = canvas

        this.speed = speed
        this.gameStateRef = gameStateRef
        this.asteroidFieldImage = asteroidFieldImage
    }
        draw(){
        this.ctx.save()
        this.ctx.translate(0,this.y)

        //function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {}
        //Image Properties
        this.ctx.drawImage(this.asteroidFieldImage, this.width*this.frameX, this.height*this.frameY, this.width, this.height,
            //Object Proportions
            0, 0, this.width, this.height)
        // this.ctx.drawImage(asteroidFieldImageArray[this.imageIndex],0, 0)

        this.ctx.restore()
    }
    update(modifier){
        // console.log(this.gameStateRef)
        if (!this.gameStateRef.player.explode){
            if(this.y > this.canvas.height) this.y = this.height-this.canvas.height*2 //Maybe issue?
            this.y += this.speed*modifier 
        }
    }
}
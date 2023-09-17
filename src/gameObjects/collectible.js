class Collectible {
    constructor(canvas) {
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
    update(modifier, canvas, player){
        if (!player.explode){
            this.tally += modifier
            if (!this.explode) collectibleShot()
            if (!this.explode) {
                this.angle += 5
                if(this.y - this.size > canvas.height || collectibleCollision()) this.resetPosition(canvas)
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
                    this.resetPosition(canvas)
                }
            }
        }
    }
    resetPosition(canvas){
        this.y = 0 - this.size
        this.x = Math.random() * canvas.width
    }
}
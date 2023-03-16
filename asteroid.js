const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")

export class Asteroid {
    constructor(){
        this.width = "72"
        this.height = "72"
        this.frameX = Math.floor(Math.random() * 2)
        this.frameY = 0

        this.x = Math.random() * 450
        this.y = 0

        this.size = Math.random() * 100 + 50
        this.speed = Math.random() * 500 + 100 // * 10 + 1
        this.angle = Math.random() * 360
        this.spin = Math.random() < 0.5 ? -1 : 1
    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle * Math.PI/360 * this.spin)

                      //Image Properties
        //function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {}
        ctx.drawImage(asteroidImage, this.width*this.frameX, this.height*this.frameY, this.width, this.height,
            //Object Proportions
            0 - this.size/2, 0 - this.size/2, this.size, this.size)

        // ctx.drawImage(asteroidImageArray[this.image], 0 - this.size/2, 0- this.size/2, this.size, this.size)
        ctx.restore()
    }
    update(modifier){
        this.angle += 10
        if(this.y - this.size > 450){
            this.y = 0 - this.size
            this.x = Math.random() * 450
            this.size = Math.random() * 100 + 50
            this.speed = Math.random() * 500 + 100 // * 10 + 1
        }
        this.y += this.speed*modifier
    }
}
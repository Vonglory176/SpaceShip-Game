export default class Collectible {
    constructor(ctx, canvas, gameStateRef, addAsteroid, collectibleImage, collectibleCollision, collectibleShot) {
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
        this.collectibleImage = collectibleImage
        this.collectibleCollision = collectibleCollision
        this.collectibleShot = collectibleShot
    }
    draw(){
        this.ctx.save()
        this.ctx.translate(this.x,this.y)
        this.ctx.rotate(this.angle * Math.PI/360 * this.spin)
        this.ctx.drawImage(this.collectibleImage, this.width*this.frameX, this.height*this.frameY, 
            this.width, this.height, 0 - this.width/2, 0 - this.height/2, this.width, this.height)
        // this.ctx.drawImage(collectibleImage, 0 - this.size/2, 0- this.size/2, this.size, this.size)
        this.ctx.restore()
    }
    update(modifier){
        if (!this.gameStateRef.player.explode){
            this.tally += modifier
            if (!this.explode) this.collectibleShot()
            if (!this.explode) {
                this.angle += 5
                if(this.y - this.size > this.canvas.height || this.collectibleCollision()) this.resetPosition()
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
// //COLLECTIBLE PICKUP
// function collectibleCollision(player, collectible, collected, addAsteroid){ //Include negation for player?
//     // let { player, collectible, collected } = this.gameStateRef
//     if(
//         player.x + player.width/2 >= collectible.x &&
//         player.x <= collectible.x + (collectible.size) &&
//         player.y + player.height/2 >= collectible.y &&
//         player.y <= collectible.y + (collectible.size)&&
//         !player.explode
//     ) {
//         // $(collectedPodSound).prop('currentTime',0)
//         // $(collectedPodSound).trigger('play')
//         addAsteroid() // this.ctx, this.canvas
//         collected++
//         return true
//     }    
// }
// function collectibleShot(collectible, bulletArray, collected){
//     // let { collectible, bulletArray, collected } = this.gameStateRef
//     for (let i=0;i<bulletArray.length;i++){
//         if(
//             bulletArray[i].x + bulletArray[i].width/2 >= collectible.x &&
//             bulletArray[i].x <= collectible.x + (collectible.size) &&
//             bulletArray[i].y + bulletArray[i].height/2 >= collectible.y &&
//             bulletArray[i].y <= collectible.y + (collectible.size) && 
//             bulletArray[i].width > 0
//         ) {
//             // $(asteroidExplosionSound).prop('currentTime',0)
//             // $(asteroidExplosionSound).trigger('play')
//             bulletArray[i].width = 0
//             collectible.explode = true
//             collectible.frameY = 1
//             collectible.frameX = 0
//             collectible.width = collectible.height = 72
//             collectible.tally = 0
//             collected--
//         }
//     }
// }
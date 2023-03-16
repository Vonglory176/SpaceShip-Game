// export function updateBird(delta) {}
// Player Code //////////////////////////////////////////////////////////////////////////////////////
export class Player {
    constructor(){
        this.width = "36"
        this.height = "72"
        this.frameX = 0
        this.frameY = 0

        this.x = 450.01450000000006 // Works?????
        this.y = 450.01450000000006
        this.speed = 300

        this.action = 'idle'
        this.angle = 0 //720 //0 90 180 270 360 450 540 630
        this.spin = 1 //Math.random() < 0.5 ? -1 : 1
        
        // this.size = 100 //CHANGE LATER
    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle * Math.PI/360) //* this.spin

        //function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {}
        ctx.drawImage(playerImage, this.width*this.frameX, this.height*this.frameY, 
            this.width, this.height, 0 - this.width/2, 0 - this.height/2, this.width, this.height)

        ctx.restore()
    }
    update(modifier){
        //PLAYER KEYPRESS CHECKS
        let right = 39, left = 37, up = 38, down = 40, shoot = 32
        if (up in keysDown || down in keysDown || left in keysDown || right in keysDown) {
            
            //Top Left
            if(up in keysDown && left in keysDown && this.y > (this.height/2) && this.x > (this.width/2)){
                this.y -= this.speed*modifier
                this.x -= this.speed*modifier
                this.angle = 630
            }
            //Top Right
            else if(up in keysDown && right in keysDown && this.y > (this.height/2) && this.x < canvas.width - (this.width/2)){
                this.y -= this.speed*modifier
                this.x += this.speed*modifier
                this.angle = 90
            }
            //Bottom Left
            else if(down in keysDown && left in keysDown && this.y < (canvas.height - (this.height/2)) && this.x > (this.width/2)){
                this.y += this.speed*modifier
                this.x -= this.speed*modifier
                this.angle = 450
            }
            //Bottom Right
            else if(down in keysDown && right in keysDown && this.y < canvas.height - (this.height/2) && this.x < canvas.width - (this.width/2)){
                this.y += this.speed*modifier
                this.x += this.speed*modifier
                this.angle = 270
            }
            //Top
            else if (up in keysDown && this.y > (this.height/2)) { //  holding up key
                this.y -= this.speed*modifier
                this.angle = 0
            }
            //Bottom
            else if (down in keysDown && this.y < canvas.height - (this.height/2)) { //  holding down key
                this.y += this.speed*modifier
                this.angle = 360	
            }
            //Left
            else if (left in keysDown && this.x > (this.width/2)) { // holding left key
                this.x -= this.speed*modifier
                this.angle = 540
            }
            //Right
            else if (right in keysDown && this.x < canvas.width - (this.width/2)) { // holding right key
                this.x += this.speed*modifier
                this.angle = 180
            }

            //Moving while shooting?
            this.action = (shoot in keysDown ? 'move shoot' : 'move')
        }
        //Shooting while idle?
        else this.action = (shoot in keysDown ?  'idle shoot' : 'idle')

        //SPRITE UPDATE ON ACTION
        //Idle
        // console.log(this.action)
        if (this.action === 'idle') this.frameX = 0
    
        //Shooting
        else if (this.action === 'idle shoot') this.frameX = 5
    
        //Moving
        else if (this.action === 'move') {
            //Engine Turn On
            if (this.frameX === 0) this.frameX = 1
            else {
                //Engine On
                if (this.frameX < 3) this.frameX++
                else this.frameX = 2
            }
        }
        //Moving and Shooting
        else if (this.action === 'move shoot') this.frameX = 4
    }
}
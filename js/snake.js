var blocksize = 20
class snake {
    backupDirection;
    direction;
    x;
    y;
    color;
    constructor(direction,x,y,backupDirection,color) {
        this.direction = direction;
        this.x = x;
        this.y = y;
        this.backupDirection = backupDirection;
        this.color = color;
    };
    move(){
        if(this.direction == "left"){
            this.x -= blocksize
        }
        else if(this.direction == "right"){
            this.x += blocksize
        }
        else if(this.direction == "up"){
            this.y -= blocksize
        }
        else if(this.direction == "down"){
            this.y += blocksize
        }
    };
}
class snakeHead {
    direction;
    x;
    y;
    constructor(direction,x,y) {
        this.direction = direction;
        this.x = x;
        this.y = y;
    };
    move(){
        if(this.direction == "left"){
            this.x -= blocksize
        }
        else if(this.direction == "right"){
            this.x += blocksize
        }
        else if(this.direction == "up"){
            this.y -= blocksize
        }
        else if(this.direction == "down"){
            this.y += blocksize
        }
    };
}
class Food {
    x;
    y;

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}
var time;
document.getElementById('start').addEventListener('click',function() {
    time = 200;
    gameStart();
})
document.getElementById('start1').addEventListener('click',function() {
    time = 150;
    gameStart();
})
document.getElementById('start2').addEventListener('click',function() {
    time = 100;
    gameStart();
})
document.getElementById('reset').addEventListener('click',reset)
var up = false
var down = false
var left = false
var right = false
var press = false
window.addEventListener("keydown",function(e){
    if ((e.keyCode == 87 || e.keyCode == 38) && !press) {up = true;press=true}
    if ((e.keyCode == 83 || e.keyCode == 40) && !press) {down = true;press=true}
    if ((e.keyCode == 65 || e.keyCode == 37) && !press) {left=true;press=true}
    if ((e.keyCode == 68 || e.keyCode == 39) && !press) {right=true;press=true}
})
var blocksize = 20
function gameStart() {
    document.getElementById('game').style.display = "block"
    document.getElementById('start').style.display = "none"
    document.getElementById('start1').style.display = "none"
    document.getElementById('start2').style.display = "none"
    document.getElementById('snake').style.display = "none"
    document.getElementById('git').style.display = "none"
    document.getElementById('score').style.display = "block"
    document.getElementById('scoreNum').style.display = "block"
    var canvas = document.getElementById('game')
    var ctx = canvas.getContext('2d')
    var alive = true
    var death = false
    var score = -1
    var snakeParts = []
    canvas.width = 1000
    canvas.height = 600
    var food = new Food(0,0)
    var head = new snakeHead("up",500,300)
    function draw_grid() {
        ctx.beginPath();
        ctx.fillStyle = "#dddddd";
        for (i=19;i<600;i+=20) {
            ctx.fillRect(0,i,canvas.width,2);
        }
        for (i=19;i<1000;i+=20) {
            ctx.fillRect(i,0,2,canvas.height);
        }
        ctx.closePath();
    }
    function spawnFood() {
        score++
        document.getElementById('scoreNum').innerHTML = score
        var x = Math.floor(Math.random()*canvas.width)
        var y = Math.floor(Math.random()*canvas.height)
        while ((x % blocksize != 0)) {
            x = Math.floor(Math.random()*canvas.width)
        }
        while ((y % blocksize != 0)) {
            y = Math.floor(Math.random()*canvas.height)
        }
        for (i=0;i<snakeParts.length;i++) {
            if ((y == snakeParts[i].y) && (x == snakeParts[i].x)) {
                var x = Math.floor(Math.random()*canvas.width)
                var y = Math.floor(Math.random()*canvas.height)
                while ((x % blocksize != 0)) {
                    x = Math.floor(Math.random()*canvas.width)
                }
                while ((y % blocksize != 0)) {
                    y = Math.floor(Math.random()*canvas.height)
                }
            }
        }
        food.x = x
        food.y = y
        console.log("x = " + food.x)
        console.log("y = " + food.y)
    }
    spawnFood()
    function snakeMove() {
        if (!death) {
            if (up && head.direction != "down") {
                head.direction = "up"
            }
            if (down && head.direction != "up") {
                head.direction = "down"
            }
            if (left && head.direction != "right") {
                head.direction = "left"
            }
            if (right && head.direction != "left") {
                head.direction = "right"
            }
            up = false
            down = false
            left = false
            right = false
            head.move()
            for (i=0;i<snakeParts.length;i++) {
                snakeParts[i].move()
                if (head.direction != snakeParts[0].direction) {
                    snakeParts[0].direction = head.direction
                }
                var a = i-1
                if (i != 0){
                    if (snakeParts[a].backupDirection != snakeParts[i].direction) {
                        snakeParts[i].direction = snakeParts[a].backupDirection
                    }
                }
            }
            for (i=0;i<snakeParts.length;i++) {
                snakeParts[i].backupDirection = snakeParts[i].direction
            }
        }
    }
    var colorNumber = 0
    var color
    function newSnakePart() {
        if (colorNumber == 0) {
            color = "#a75af8"
            colorNumber++
        } else if (colorNumber == 1) {
            color = "#c663e8"
            colorNumber = 0
        }
        if (snakeParts.length == 0){
            if (head.direction == "up") {
                snakeParts.push(new snake("up",head.x,head.y+blocksize,"up",color))
            }
            if (head.direction == "down") {
                snakeParts.push(new snake("down",head.x,head.y-blocksize,"down",color))
            }
            if (head.direction == "left") {
                snakeParts.push(new snake("left",head.x+blocksize,head.y,"left",color))
            }
            if (head.direction == "right") {
                snakeParts.push(new snake("right",head.x-blocksize,head.y,"right",color))
            }
            console.log(head.x + " " + head.y + " " + snakeParts[0].x + " " + snakeParts[0].y)
        }else{
            var a = snakeParts.length-1
            if (snakeParts[a].direction == "up") {
                snakeParts.push(new snake("up",snakeParts[a].x,snakeParts[a].y+blocksize,"up",color))
            }
            if (snakeParts[a].direction == "down") {
                snakeParts.push(new snake("down",snakeParts[a].x,snakeParts[a].y-blocksize,"down",color))
            }
            if (snakeParts[a].direction == "left") {
                snakeParts.push(new snake("left",snakeParts[a].x+blocksize,snakeParts[a].y,"left",color))
            }
            if (snakeParts[a].direction == "right") {
                snakeParts.push(new snake("right",snakeParts[a].x-blocksize,snakeParts[a].y,"right",color))
            }
        }
    }
    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.closePath();
        draw_grid();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(food.x,food.y,blocksize,blocksize);
        ctx.strokeStyle = "#990000";
        ctx.strokeRect(food.x,food.y,blocksize,blocksize);
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "#ff5555";
        ctx.fillRect(head.x,head.y,blocksize,blocksize);
        ctx.closePath();
        for(i=0;i<snakeParts.length;i++) {
            ctx.beginPath();
            ctx.fillStyle = snakeParts[i].color;
            ctx.fillRect(snakeParts[i].x,snakeParts[i].y,blocksize,blocksize);
            ctx.closePath();
        }
    }
    function dead() {
        ctx.beginPath()
        ctx.fillStyle = "#ff000033"
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.closePath()
        document.getElementById('dead').style.display = "grid"
    }
    function deathCheck() {
        for (i=0;i<snakeParts.length;i++) {
            if (head.x == snakeParts[i].x && head.y == snakeParts[i].y) {
                alive = false
                death = true
                console.log("dead")
                dead()
            }
        }
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            alive = false
            death = true
            console.log("dead")
            dead()
        }
    }
    newSnakePart()
    newSnakePart()
    newSnakePart()
    function aliveCheck() {
        if (alive) {
            if (head.x == food.x && head.y == food.y) {
                spawnFood()
                newSnakePart()
                console.log(snakeParts.length)
            }
            deathCheck()
            if (!death)draw()
            press = false
        }
    }
    aliveCheck()
    setTimeout(x,1)
    setInterval(snakeMove,time)
    function x() {
        setInterval(aliveCheck,time)
    }
}
function reset() {
    document.getElementById('start').style.display = "block"
    document.getElementById('start1').style.display = "block"
    document.getElementById('start2').style.display = "block"
    document.getElementById('snake').style.display = "block"
    document.getElementById('git').style.display = "block"
    document.getElementById('score').style.display = "none"
    document.getElementById('scoreNum').style.display = "none"
    document.getElementById('game').style.display = "none"
    document.getElementById('dead').style.display = "none"
}
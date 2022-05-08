document.getElementById('start').addEventListener('click',gameStart)
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
    document.getElementById('start').style.display = "none"
    var canvas = document.getElementById('game')
    var ctx = canvas.getContext('2d')
    var alive = true
    var death = false
    var snakeParts = []
    canvas.width = 1000
    canvas.height = 600
    var food = new Food(0,0)
    var head = new snakeHead("up",500,300)
    function spawnFood() {
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
    var color = "#00cc00"
    function newSnakePart() {
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
        if (color == "#00ee00") {
            color = "#00cc00"
        } else if (color == "#00cc00") {
            color = "#00ee00"
        }
    }
    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "#dddddd";
        ctx.fillRect(0,19,canvas.width,2);
        ctx.fillRect(0,39,canvas.width,2);
        ctx.fillRect(0,59,canvas.width,2);
        ctx.fillRect(0,79,canvas.width,2);
        ctx.fillRect(0,99,canvas.width,2);
        ctx.fillRect(0,119,canvas.width,2);
        ctx.fillRect(0,139,canvas.width,2);
        ctx.fillRect(0,159,canvas.width,2);
        ctx.fillRect(0,179,canvas.width,2);
        ctx.fillRect(0,199,canvas.width,2);
        ctx.fillRect(0,219,canvas.width,2);
        ctx.fillRect(0,239,canvas.width,2);
        ctx.fillRect(0,259,canvas.width,2);
        ctx.fillRect(0,279,canvas.width,2);
        ctx.fillRect(0,299,canvas.width,2);
        ctx.fillRect(0,319,canvas.width,2);
        ctx.fillRect(0,339,canvas.width,2);
        ctx.fillRect(0,359,canvas.width,2);
        ctx.fillRect(0,379,canvas.width,2);
        ctx.fillRect(0,399,canvas.width,2);
        ctx.fillRect(0,419,canvas.width,2);
        ctx.fillRect(0,439,canvas.width,2);
        ctx.fillRect(0,459,canvas.width,2);
        ctx.fillRect(0,479,canvas.width,2);
        ctx.fillRect(0,499,canvas.width,2);
        ctx.fillRect(0,519,canvas.width,2);
        ctx.fillRect(0,539,canvas.width,2);
        ctx.fillRect(0,559,canvas.width,2);
        ctx.fillRect(0,579,canvas.width,2);
        ctx.fillRect(0,599,canvas.width,2);
        ctx.fillRect(19,0,2,canvas.height);
        ctx.fillRect(39,0,2,canvas.height);
        ctx.fillRect(59,0,2,canvas.height);
        ctx.fillRect(79,0,2,canvas.height);
        ctx.fillRect(99,0,2,canvas.height);
        ctx.fillRect(119,0,2,canvas.height);
        ctx.fillRect(139,0,2,canvas.height);
        ctx.fillRect(159,0,2,canvas.height);
        ctx.fillRect(179,0,2,canvas.height);
        ctx.fillRect(199,0,2,canvas.height);
        ctx.fillRect(219,0,2,canvas.height);
        ctx.fillRect(239,0,2,canvas.height);
        ctx.fillRect(259,0,2,canvas.height);
        ctx.fillRect(279,0,2,canvas.height);
        ctx.fillRect(299,0,2,canvas.height);
        ctx.fillRect(319,0,2,canvas.height);
        ctx.fillRect(339,0,2,canvas.height);
        ctx.fillRect(359,0,2,canvas.height);
        ctx.fillRect(379,0,2,canvas.height);
        ctx.fillRect(399,0,2,canvas.height);
        ctx.fillRect(419,0,2,canvas.height);
        ctx.fillRect(439,0,2,canvas.height);
        ctx.fillRect(459,0,2,canvas.height);
        ctx.fillRect(479,0,2,canvas.height);
        ctx.fillRect(499,0,2,canvas.height);
        ctx.fillRect(519,0,2,canvas.height);
        ctx.fillRect(539,0,2,canvas.height);
        ctx.fillRect(559,0,2,canvas.height);
        ctx.fillRect(579,0,2,canvas.height);
        ctx.fillRect(599,0,2,canvas.height);
        ctx.fillRect(619,0,2,canvas.height);
        ctx.fillRect(639,0,2,canvas.height);
        ctx.fillRect(659,0,2,canvas.height);
        ctx.fillRect(679,0,2,canvas.height);
        ctx.fillRect(699,0,2,canvas.height);
        ctx.fillRect(719,0,2,canvas.height);
        ctx.fillRect(739,0,2,canvas.height);
        ctx.fillRect(759,0,2,canvas.height);
        ctx.fillRect(779,0,2,canvas.height);
        ctx.fillRect(799,0,2,canvas.height);
        ctx.fillRect(819,0,2,canvas.height);
        ctx.fillRect(839,0,2,canvas.height);
        ctx.fillRect(859,0,2,canvas.height);
        ctx.fillRect(879,0,2,canvas.height);
        ctx.fillRect(899,0,2,canvas.height);
        ctx.fillRect(919,0,2,canvas.height);
        ctx.fillRect(939,0,2,canvas.height);
        ctx.fillRect(959,0,2,canvas.height);
        ctx.fillRect(979,0,2,canvas.height);
        ctx.closePath();
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
    var time = 500
    aliveCheck()
    setTimeout(x,1)
    setInterval(snakeMove,time)
    function x() {
        setInterval(aliveCheck,time)
    }
}
let back = new Image();
back.src = "img/back.png";

let bird = new Image();
bird.src = "img/bird.png";

let pipeBottom = new Image();
pipeBottom.src = "img/pipeBottom.png";

let pipeUp = new Image();
pipeUp.src = "img/pipeUp.png";

let road = new Image();
road.src = "img/road.png";

let fly = new Audio();
fly.src = "audio/fly.mp3";

let score_audio = new Audio();
score_audio.src = "audio/score.mp3";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 256;
canvas.height = 512;

let score_text = document.getElementById("score");
let bst = document.getElementById("best");

let xPos = 10;
let yPos = 180;
let gravity = 0.2;
let velY = 0;
let pipe = [];
let gap = 100;
let score = 0;
let best_score = 0;
let pause = true;

pipe[0] = {
    x: canvas.width,
    y: 0
}

function draw() {
    if (!pause) {
        ctx.drawImage(back, 0, 0);
        ctx.drawImage(bird, xPos, yPos);

        velY += gravity;
        yPos += velY;

        if (yPos >= 470 || yPos <= 0) {
            reload();
        }
        for (let i = 0; i < pipe.length; i++) {
            if (pipe[i].x < -pipeUp.width) {
                pipe.shift()
            } else {
                ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
                ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
                pipe[i].x -= 2;
                if (pipe[i].x == 40) {
                    pipe.push({
                        x: canvas.width,
                        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                    })
                }
            }



            if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width &&
                (yPos <= pipe[i].y + pipeUp.height ||
                    yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
                reload();
            }

            if (pipe[i].x == 0) {
                score_audio.play();
                score++;

            }
        }
        score_text.innerHTML = "Score: " + score;
        bst.innerHTML = "Best score: " + best_score

        ctx.drawImage(road, 0, 440);

    } else {
        ctx.drawImage(back, 0, 0);
        ctx.drawImage(bird, xPos, yPos);
        for (let i = 0; i < pipe.length; i++) {
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        }
        ctx.drawImage(road, 0, 440);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
    setInterval(draw, 18);

    document.addEventListener("keydown", function (event) {
        if (event.code == "Space") {
            moveUp()
        }
    })

    document.addEventListener("click", function (event) {
        
         moveUp()
        
    })

    function moveUp() {
        velY -= 5;
        fly.play();
    }

    function reload() {
        if (score > best_score) {
            best_score = score
        }
        xPos = 10;
        yPos = 150;
        velY = 0;
        pipe = [];
        score = 0;
        pipe[0] = {
            x: canvas.width,
            y: 0
        };
    }

    function game_pause() {
        pause = !pause
    }

    document.addEventListener('keydown', function (event) {
        if (event.code == "KeyP") {
            game_pause();
        }
    })
const canvas = document.querySelector("#matrix");
const ctx = canvas.getContext("2d");

const cw = window.innerWidth;
const ch = window.innerHeight;

const charArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0   ];

const maxCharCount = 100;
const fontSize = 12;
const fontColor = "rgb(0, 255, 0)";
const fillStyle = "rgba(0, 0, 0, 0.05)";
const fallingChars = [];
const maxColumns = cw / fontSize; 

canvas.width = cw;
canvas.height = ch;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, cw, ch);

let frames = 0;

class FallingChar {
    _speed = getRandomSpeed(fontSize);
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        this._value = getRandomElement(charArr); 
        
        ctx.fillStyle = fontColor;
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillText(this._value, this.x, this.y);

        this.y += this._speed;
        if (this.y > ch) {
            this.y = getRandomYPosition();
            this.x = getRandomXPosition();
            this._speed = getRandomSpeed(fontSize);
        }
    }
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
function getRandomYPosition() {
    return Math.random() * ch / 2 - 50
}
function getRandomXPosition() {
    return Math.floor(Math.random() * maxColumns) * fontSize
}
function getRandomSpeed(fontSize) {
    return Math.random() * fontSize * 0.75 + fontSize * 0.75
}

function update() {
    if (fallingChars.length < maxCharCount) {
        let fallingChar = new FallingChar( 
            getRandomXPosition(), 
            getRandomYPosition() 
        );
        fallingChars.push(fallingChar);
    }

    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, cw, ch);

    fallingChars.forEach( char => {
        if (frames % 2 === 0) {
            char.draw(ctx);
        }
    });

    requestAnimationFrame(update);
    frames++;
}

update();


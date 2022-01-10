const canvas = document.querySelector("#matrix");
const ctx = canvas.getContext("2d");

const cw = window.innerWidth;
const ch = window.innerHeight;

const charArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const maxCharCount = 1000;
const fallingChars = [];
const fontSize = 15;
const maxColumns = cw / fontSize; 
const fontColor = "rgb(0, 255, 0)";

canvas.width = cw;
canvas.height = ch;

class FallingChar {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        this.value = getRandomElement(charArr);
        this.speed = Math.random() * fontSize * 0.75 + fontSize * 0.75;
        
        ctx.fillStyle = fontColor;
        ctx.font = `${fontSize} px san-serif`;
        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed;
    }
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function update() {
    if (fallingChars.length < maxCharCount) {
        let fallingChar = new FallingChar(
            Math.floor(Math.random() * maxColumns * fontSize),
            Math.random() * ch / 2 - 50
        );
        fallingChars.push(fallingChar);
    }

    ctx.fillStyle = "rgba(0,0,0, 0.05)";
    ctx.fillRect(0, 0, cw, ch);

    for (let i = 0; i < fallingChars.length; i++) {
        fallingChars[i].draw(ctx);
    }

    requestAnimationFrame(update);
    frames++;
}

update();
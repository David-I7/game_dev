var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var CANVAS_WIDTH = (canvas.width = canvas.offsetWidth);
var CANVAS_HEIGHT = (canvas.height = canvas.offsetHeight);
var playerImage = new Image();
playerImage.src = "shadow_dog.png";
var spriteWidth = 575;
var spriteHeight = 523;
var stagger = 5;
var gameFrame = 0;
var playerState = "run";
var select = document.getElementById("animations");
select.addEventListener("change", function (e) { return (playerState = e.currentTarget.value); });
var spriteAnimations = {};
var animationStates = [
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    },
    {
        name: "run",
        frames: 9,
    },
    {
        name: "dizzy",
        frames: 11,
    },
    {
        name: "sit",
        frames: 5,
    },
    {
        name: "roll",
        frames: 7,
    },
    {
        name: "bite",
        frames: 7,
    },
    {
        name: "ko",
        frames: 12,
    },
    {
        name: "getHit",
        frames: 4,
    },
];
animationStates.forEach(function (state, y) {
    var frames = {
        loc: [],
    };
    for (var i = 0; i < state.frames; ++i) {
        frames.loc.push({ x: i * spriteWidth, y: y * spriteHeight });
    }
    spriteAnimations[state.name] = frames;
});
function animate() {
    var position = Math.floor(gameFrame / stagger) % spriteAnimations[playerState].loc.length;
    if (gameFrame % stagger == 0) {
        var framex = spriteWidth * position;
        var framey = spriteAnimations[playerState].loc[position].y;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(playerImage, framex, framey, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    ++gameFrame;
    requestAnimationFrame(animate);
}
animate();

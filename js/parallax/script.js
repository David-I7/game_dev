var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var CANVAS_WIDTH = (canvas.width = canvas.offsetWidth);
var CANVAS_HEIGHT = (canvas.height = canvas.offsetHeight);
var gameSpeed = 5;
var gameFrame = 0;
var backgroundLayer1 = new Image();
backgroundLayer1.src = "./public/images/layer-1.png";
var backgroundLayer2 = new Image();
backgroundLayer2.src = "./public/images/layer-2.png";
var backgroundLayer3 = new Image();
backgroundLayer3.src = "./public/images/layer-3.png";
var backgroundLayer4 = new Image();
backgroundLayer4.src = "./public/images/layer-4.png";
var backgroundLayer5 = new Image();
backgroundLayer5.src = "./public/images/layer-5.png";
var Layer = /** @class */ (function () {
    function Layer(image, speedModifier) {
        this.image = image;
        this.speedModifier = speedModifier;
        this.x = 0;
        this.y = 0;
        this.width = image.width;
        this.height = image.height;
        this.speed = gameSpeed * this.speedModifier;
    }
    Layer.prototype.update = function () {
        this.speed = gameSpeed * this.speedModifier;
        // if (this.x <= -this.width) {
        //   this.x = 0;
        // }
        // this.x = Math.floor(this.x - this.speed);
        this.x = (gameFrame * this.speed) % this.width;
    };
    Layer.prototype.draw = function () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    };
    return Layer;
}());
var layer1 = new Layer(backgroundLayer1, 0.2);
var layer2 = new Layer(backgroundLayer2, 0.4);
var layer3 = new Layer(backgroundLayer3, 0.6);
var layer4 = new Layer(backgroundLayer4, 0.8);
var layer5 = new Layer(backgroundLayer5, 1);
var gameObjects = [layer1, layer2, layer3, layer4, layer5];
var slider = document.getElementById("slider");
slider.value = gameSpeed.toString();
var showGameSpeed = document.getElementById("showGameSpeed");
showGameSpeed.innerHTML = gameSpeed.toString();
slider.addEventListener("change", function (e) {
    gameSpeed = Number(e.currentTarget.value);
    showGameSpeed.innerHTML = gameSpeed.toString();
});
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(function (obj) {
        obj.draw();
        obj.update();
    });
    --gameFrame;
    requestAnimationFrame(animate);
}
animate();

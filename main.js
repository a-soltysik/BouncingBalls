import Game from "./game.js"

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas)
}
var canvas = document.getElementById('canvas')
var game = new Game(canvas, 60)


window.addEventListener('resize', resizeCanvas, false)
window.addEventListener('load', resizeCanvas, false)
window.addEventListener('mousemove', (e) => {
    var x = e.offsetX
    var y = e.offsetY
    game.x = x;
    game.y = y
}, false);

game.start()








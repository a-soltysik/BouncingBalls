import Ball from "./ball.js"
import Vector from "./vector.js"

export default class Game {
    maxFrameRate
    deltaTime
    fps
    fpsInterval
    now
    then
    elapsed
    balls
    context
    canvas
    ball
    x = -1000
    y = -1000


    constructor(canvas, maxFrameRate) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.maxFrameRate = maxFrameRate
        this.balls = []
        this.generateBalls()
        this.deltaTime = 1 / maxFrameRate;
        this.animate = this.animate.bind(this)
    }
    start = function () {
        this.startAnimation()
    }

    generateBalls = function () {
        var r = 50
        for (let i = r; i < 900; i += 2 * r) {
            for (let j = r; j < 1900; j += 2 * r) {
                console.log(i + " " + j)
                this.balls.push(new Ball(r, j, i, '#ff0000'))
            }
        }
    }

    startAnimation() {
        this.fpsInterval = 1000 / this.maxFrameRate;
        this.then = performance.now();
        this.animate(performance.now);
    }

    animate(timestamp) {

        requestAnimationFrame(this.animate);
        this.now = timestamp;
        this.elapsed = this.now - this.then;

        this.fps = Math.round(1000 / this.elapsed)
        if (this.elapsed > this.fpsInterval) {
            this.then = this.now;
            this.context.fillStyle = "#555555"
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
            this.update()
            this.draw()
        }

    }

    update() {
        const G = 1000000
        const pointerBallMass = 20
        const maxDistance = 1000
 
        this.balls.forEach(ball => {
            var distanceVec = new Vector(this.x - ball.curr_position.x, this.y - ball.curr_position.y)
            if (distanceVec.length() > maxDistance) {
                ball.gravityForce = new Vector(0, 0)
                return
            }
            var maxGravity = distanceVec
                .multiply(
                    -G * pointerBallMass * ball.mass / (Math.pow(ball.r, 2) + Math.pow(ball.r, 2))
                )
            distanceVec = distanceVec.normalized();
            ball.gravityForce = distanceVec
                .multiply(
                    -G * pointerBallMass * ball.mass / (Math.pow(this.x - ball.curr_position.x, 2) + Math.pow(this.y - ball.curr_position.y, 2))
                )
            if (ball.gravityForce.length() > maxGravity.length()) {
                ball.gravityForce = maxGravity
            }
        })

        
        this.balls.forEach(ball => {
            ball.move(this.elapsed / 1000);
        });
    }

    draw() {
        this.balls.forEach(ball => {
            ball.draw(this.context);
        });
    }
}
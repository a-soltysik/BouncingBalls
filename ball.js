import Vector from "./vector.js"

export default class Ball {
    position
    curr_position
    velocity
    force
    mass = 10
    r
    color
    suppress = true;
    suppresion = 100
    touched = false
    gravityForce
    elasticForce
    dampingForce
    k = 100
    dampingCoeff = -10

    constructor(r, x, y, mass = 10, color = '#000000') {
        this.r = r;
        this.position = new Vector(x, y);
        this.curr_position = new Vector(x, y);
        this.color = color;
        this.force = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.gravityForce = new Vector(0, 0);
        this.elasticForce = new Vector(0, 0);
        this.dampingForce = new Vector(0, 0);
    }

    draw(context) {
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.curr_position.x, this.curr_position.y, this.r, 0, 2 * Math.PI);
        context.fill();
    }

    move(deltaTime) {
        this.elasticForce = new Vector(
            this.curr_position.x - this.position.x,
            this.curr_position.y - this.position.y
        ).multiply(-this.k)

        this.dampingForce = this.velocity.multiply(this.dampingCoeff)
        this.force = this.elasticForce.add(this.gravityForce).add(this.dampingForce);
        this.velocity = this.velocity.add(this.force.divide(this.mass).multiply(deltaTime));
        this.curr_position = this.curr_position.add(this.velocity.multiply(deltaTime));
    }

}
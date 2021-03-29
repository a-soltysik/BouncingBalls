export default class Vector {
    x
    y
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add = (v) => new Vector(this.x + v.x, this.y + v.y)
    multiply = (n) => new Vector(this.x * n, this.y * n)
    divide = (n) => {
        if (n === 0) throw new Error('Invalid dividend: ' + n)
        return new Vector(this.x / n, this.y / n)
    }
    length = () => Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    normalized = () => {
        if (this.length() === 0)
            return new Vector(this.x, this.y)
        return new Vector(this.x / this.length(), this.y / this.length())
    }
    static distance = (v1, v2) => {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    }
}
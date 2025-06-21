import { Mouse } from '../mouse.js'
import { Entity } from './world/entity.js'
import { Tiles } from './world/tiles.js'

export class World {
    constructor(engine) {
        this.mouse = new Mouse()
        this.engine = engine
        this.tiles = new Tiles()
        this.entities = [
            new Entity(0, 0, 20), // entity 0 is player
            new Entity(100, 0, 10),
        ]
    }

    draw() {
        this.tiles.generateAndDraw(this)
        for (let entity of this.entities) {
            entity.draw(this)
        }
        for (let entity of this.entities) {
            entity.think()
        }
    }
}

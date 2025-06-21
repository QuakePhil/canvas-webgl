import { TwoDimensionalDict } from './tiles/dict2d.js'
import { Tile } from './tiles/tile.js'

export class Tiles extends TwoDimensionalDict {
    constructor() {
        super()
        this.width = 200
        this.height = 200
    }

    toNearest(mouse, num, nearest) {
        return (Math.floor(num / nearest) * nearest / mouse.delta_z) || 0
        // return num >= 0 ? Math.floor(num / nearest) * nearest : Math.floor(num / nearest) * nearest;
    }

    generateAndDraw(world) {
        const canvas = world.engine.render.canvas
        const mouse = world.mouse
        let x_bound = canvas.width - mouse.delta_x + this.width * mouse.delta_z
        let y_bound = canvas.height - mouse.delta_y + this.height * mouse.delta_z
        for (let x = -mouse.delta_x;
            x < x_bound;
            x += this.width * mouse.delta_z
        ) {
            for (let y = -mouse.delta_y;
                y < y_bound;
                y += this.height * mouse.delta_z
            ) {
                let tile_x = this.toNearest(mouse, x, this.width * mouse.delta_z)
                let tile_y = this.toNearest(mouse, y, this.height * mouse.delta_z)

                let tile = Tile.getOrGenerate(this, tile_x, tile_y)
                Tile.draw(world, tile, tile_x, tile_y, this.width, this.height)
            }
        }
    }
}
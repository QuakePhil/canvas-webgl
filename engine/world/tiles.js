import { TwoDimensionalDict } from './tiles/dict2d.js'
import { Tile } from './tiles/tile.js'

export class Tiles extends TwoDimensionalDict {
    constructor() {
        super()
        this.width = 100
        this.height = 100
    }

    toNearest(render, num, nearest) {
        return (Math.floor(num / nearest) * nearest / render.mouse.delta_z) || 0
        // return num >= 0 ? Math.floor(num / nearest) * nearest : Math.floor(num / nearest) * nearest;
    }

    generateAndDraw(render) {
        let x_bound = render.canvas.width - render.mouse.delta_x + this.width * render.mouse.delta_z
        let y_bound = render.canvas.height - render.mouse.delta_y + this.height * render.mouse.delta_z
        for (let x = -render.mouse.delta_x;
            x < x_bound;
            x += this.width * render.mouse.delta_z
        ) {
            for (let y = -render.mouse.delta_y;
                y < y_bound;
                y += this.height * render.mouse.delta_z
            ) {
                let tile_x = this.toNearest(render, x, this.width * render.mouse.delta_z)
                let tile_y = this.toNearest(render, y, this.height * render.mouse.delta_z)

                let tile = Tile.getOrGenerate(this, tile_x, tile_y)
                Tile.draw(render, tile, tile_x, tile_y, this.width, this.height)
            }
        }
    }
}
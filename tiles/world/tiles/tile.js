// re: https://www.pcg-random.org/
class PCG {
    constructor(seed) {
        this.state = BigInt(Math.trunc(seed))
        this.inc = 0x632BE5A6n // BigInt(1)
    }

    next() {
        this.state = (this.state * 6364136223846793005n + this.inc) & 0xFFFFFFFFFFFFFFFFn
        let xorShift = Number((this.state >> 18n) ^ this.state) & 0x7FFFFFFF // Ensure positive values
        return xorShift / 2147483647 // Normalize to [0, 1)
    }
}

export class Tile {
    static colorToRGBA(name) {
        const ctx = document.createElement("canvas").getContext("2d")
        ctx.fillStyle = name
        const computed = ctx.fillStyle // in form "rgb(r,g,b)"
        const [r, g, b] = computed
            .replace(/[^\d,]/g, '')
            .split(',')
            .map(v => +v / 255)
        return [r, g, b, 1]
    }

    static getRandomColor(pcg) {
        let colors = [
            'green', 'red', 'yellow', 'blue', 'cyan',
            'orange', 'purple', 'pink',
            'brown', 'lime', 'teal', 'magenta', 'indigo',
            'violet', 'gold', 'silver', 'maroon', 'navy',
            'olive', 'aqua', 'azure', 'beige', 'coral',
            'crimson', 'khaki', 'lavender', 'salmon', 'turquoise'
        ]
        //return colors[Math.floor(r * colors.length)]
        //return '#' + Math.floor(r * 16777215).toString(16).padStart(6, '0')
        return [pcg.next(), pcg.next(), pcg.next(), 1]
    }

    static getOrGenerate(tiles, tile_x, tile_y) {
        let tile = tiles.get(tile_x, tile_y)
        //let blurb = 'fillRect'
        if (tile == null) {
            let pcg = new PCG(tile_x + tile_y * tiles.width)
            if (tile_x == 0 && tile_y == 0) {
                tile = { 'color': [0, 0, 0, 1] }
            } else {
                tile = { 'color': this.getRandomColor(pcg) }
            }
            tile.margin = pcg.next() * 0.1 + 0.05
            tile.buildings = pcg.next() < 0.5 ? 1 : 4
            // tile.trees = pcg.next() < 0.5 ? 1 : 4
            tiles.set(tile_x, tile_y, tile)
            //blurb = 'fillRect-new'
        }
        //console.debug(blurb, tile, [x, y], [tile_x, tile_y, tiles.width, tiles.height])        
        return tile
    }

    static drawTree() {
        let trunkWidth = 20;
        let trunkHeight = 60;
        let trunkX = 150;
        let trunkY = 200;

        render.fillRect(
            trunkX - trunkWidth / 2,
            trunkY,
            trunkX + trunkWidth / 2,
            trunkY + trunkHeight
        );

        // Draw leafy top using overlapping circles
        let leafRadius = 40;
        let centerX = trunkX;
        let centerY = trunkY;

        render.circle(centerX, centerY - 40, leafRadius);
        render.circle(centerX - 30, centerY - 20, leafRadius * 0.8);
        render.circle(centerX + 30, centerY - 20, leafRadius * 0.8);
        render.circle(centerX, centerY - 70, leafRadius * 0.6);
    }

    static draw(world, tile, x, y, w, h) {
        const webgl = world.render.webgl
        const mouse = world.mouse
        webgl.setFillColor([0.6, 0.6, 0.6, 1])
        mouse.zoomAndPan((...args) => {
            webgl.fillRect(...args)
        }, x, y, x + w, y + h)


        webgl.setColor([0, 0, 0, 1])
        const dashes = 5 * mouse.delta_z
        mouse.zoomAndPan((...args) => {
            webgl.dashLine(...args)
        }, x, y, x, y + h, dashes, dashes)
        mouse.zoomAndPan((...args) => {
            webgl.dashLine(...args)
        }, x, y, x + w, y, dashes, dashes)

        if (tile.buildings == 1) {
            const m = w * 0.1 // tile.margin // 0.15
            webgl.setFillColor(tile.color)
            mouse.zoomAndPan((...args) => {
                webgl.fillRect(...args)
            }, x + m, y + m, x + w - m, y + h - m)
            mouse.zoomAndPan((...args) => {
                webgl.rect(...args)
            }, x + m, y + m, x + w - m, y + h - m)
        } else if (tile.buildings == 4) {
            const cols = 2
            const rows = 2
            const padding = w * 0.1
            const bw = (w - 3 * padding) / cols
            const bh = (h - 3 * padding) / rows

            webgl.setFillColor(tile.color)

            //window.engine.ctx.fillStyle = tile.color
            //window.engine.ctx.strokeStyle = 'black'

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const bx = x + padding + i * (bw + padding)
                    const by = y + padding + j * (bh + padding)
                    mouse.zoomAndPan((...args) => {
                        webgl.fillRect(...args)
                    }, bx, by, bx + bw, by + bw)
                    mouse.zoomAndPan((...args) => {
                        webgl.rect(...args)
                    }, bx, by, bx + bw, by + bw)
                }
            }
        }
        return
    }
}
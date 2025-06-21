export class TwoDimensionalDict {
    constructor() {
        this.data = {}
    }

    set(x, y, value) {
        if (!this.data[x]) {
            this.data[x] = {} // Create row if not existing
        }
        this.data[x][y] = value // Assign value
    }

    get(x, y) {
        return this.data[x]?.[y] ?? null // Retrieve value or null if no value
    }

    has(x, y) {
        return this.data[x]?.[y] !== undefined // Check existence
    }

    remove(x, y) {
        if (this.data[x]) {
            delete this.data[x][y] // Remove entry
            if (Object.keys(this.data[x]).length === 0) {
                delete this.data[x] // Cleanup empty row
            }
        }
    }
}
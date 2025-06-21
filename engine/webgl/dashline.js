export const DashLine = Base => class extends Base {
    dashLine(x1, y1, x2, y2, dashLength = 5, gapLength = 3) {
        const gl = this.gl
        gl.useProgram(this.program)

        const dx = x2 - x1
        const dy = y2 - y1
        const distance = Math.hypot(dx, dy)
        const unitX = dx / distance
        const unitY = dy / distance

        const patternLength = dashLength + gapLength
        const dashCount = Math.floor(distance / patternLength)

        const vertices = []

        let currentX = x1
        let currentY = y1

        for (let i = 0; i < dashCount; i++) {
            const dashEndX = currentX + unitX * dashLength
            const dashEndY = currentY + unitY * dashLength

            vertices.push(currentX, currentY, dashEndX, dashEndY)

            currentX += unitX * patternLength
            currentY += unitY * patternLength
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

        gl.enableVertexAttribArray(this.a_position)
        gl.vertexAttribPointer(this.a_position, 2, gl.FLOAT, false, 0, 0)

        gl.uniform2f(this.u_resolution, ...this.resolution)
        gl.uniform4f(this.u_color, ...this.color)

        gl.drawArrays(gl.LINES, 0, vertices.length / 2)
    }
}
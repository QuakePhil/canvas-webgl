export const FillRect = Base => class extends Base {
    fillRect(x1, y1, x2, y2) {
        [x1, y1, x2, y2] = this.zoomAndPan4(x1, y1, x2, y2)

        const gl = this.gl
        gl.useProgram(this.program)

        const vertices = new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x2, y2
        ])

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

        gl.enableVertexAttribArray(this.a_position)
        gl.vertexAttribPointer(this.a_position, 2, gl.FLOAT, false, 0, 0)

        gl.uniform2f(this.u_resolution, ...this.resolution)
        gl.uniform4f(this.u_color, ...this.fillColor)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
}
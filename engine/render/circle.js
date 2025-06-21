export const Circle = Base => class extends Base {
    circle(x, y, radius, segments = 32) {
        const vertices = [x, y]
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * 2 * Math.PI
            vertices.push(x + radius * Math.cos(angle))
            vertices.push(y + radius * Math.sin(angle))
        }

        const gl = this.gl
        gl.useProgram(this.program)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

        gl.enableVertexAttribArray(this.a_position)
        gl.vertexAttribPointer(this.a_position, 2, gl.FLOAT, false, 0, 0)

        gl.uniform2f(this.u_resolution, ...this.resolution)
        gl.uniform4f(this.u_color, ...this.color)

        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2)
    }
}
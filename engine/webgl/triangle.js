export const Triangle = Base => class extends Base {
    triangle(x1, y1, x2, y2, x3, y3) {
        const vertices = [x1, y1, x2, y2, x3, y3];

        const gl = this.gl;
        gl.useProgram(this.program);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(this.a_position);
        gl.vertexAttribPointer(this.a_position, 2, gl.FLOAT, false, 0, 0);

        gl.uniform2f(this.u_resolution, ...this.resolution);
        gl.uniform4f(this.u_color, ...this.color);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
}
import { Engine } from './engine.js'

const canvas = document.getElementById("webgl-canvas")
const engine = new Engine(canvas)

window.addEventListener("load", () => engine.load())
window.addEventListener("resize", () => engine.resize())

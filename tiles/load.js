import { Engine } from '../engine.js'
import { World } from './world.js'

const canvas = document.getElementById("webgl-canvas")
const engine = new Engine(canvas)

engine.game = new World(engine)

window.addEventListener("load", () => engine.load())
window.addEventListener("resize", () => engine.resize())

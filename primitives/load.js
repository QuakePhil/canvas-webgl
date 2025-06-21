import { Engine } from '../engine.js'
import { Primitives } from './primitives.js'

const canvas = document.getElementById("webgl-canvas")
const engine = new Engine(canvas)

engine.game = new Primitives(engine)

window.addEventListener("load", () => engine.load())
window.addEventListener("resize", () => engine.resize())

export class Sound {
    constructor() {
        this.audio = new (window.AudioContext || window.webkitAudioContext)()
        document.addEventListener('click', () => {
            if (this.audio.state === 'suspended') {
                console.debug("Resuming Audio")
                this.audio.resume()
            }
        })
    }

    playNote(frequency, duration = 1) {
        const osc = this.audio.createOscillator()
        const gain = this.audio.createGain()

        osc.type = 'sine'
        osc.frequency.value = frequency

        osc.connect(gain)
        gain.connect(this.audio.destination)

        osc.start()
        osc.stop(this.audio.currentTime + duration)
    }

    laserBlaster(frequency = 880, duration = 0.3) {
        const osc = this.audio.createOscillator()
        const gain = this.audio.createGain()

        osc.type = 'square'
        osc.frequency.setValueAtTime(frequency, this.audio.currentTime)
        osc.frequency.exponentialRampToValueAtTime(100, this.audio.currentTime + duration)

        gain.gain.setValueAtTime(1, this.audio.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, this.audio.currentTime + duration)

        osc.connect(gain)
        gain.connect(this.audio.destination)

        osc.start()
        osc.stop(this.audio.currentTime + duration)
    }

    playDamageSound() {
        const bufferSize = this.audio.sampleRate * 0.2 // 200ms burst
        const buffer = this.audio.createBuffer(1, bufferSize, this.audio.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2) // fade out
        }

        const noise = this.audio.createBufferSource()
        noise.buffer = buffer

        const filter = this.audio.createBiquadFilter()
        filter.type = 'highpass'
        filter.frequency.setValueAtTime(1500, this.audio.currentTime)
        filter.Q.value = 5

        const gain = this.audio.createGain()
        gain.gain.setValueAtTime(0.7, this.audio.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, this.audio.currentTime + 0.2)

        noise.connect(filter)
        filter.connect(gain)
        gain.connect(this.audio.destination)

        noise.start()
        noise.stop(this.audio.currentTime + 0.2)
    }

    playExplosion() {
        const bufferSize = this.audio.sampleRate
        const buffer = this.audio.createBuffer(1, bufferSize, this.audio.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1 // white noise
        }

        const noise = this.audio.createBufferSource()
        noise.buffer = buffer

        const filter = this.audio.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(1000, this.audio.currentTime)

        const gain = this.audio.createGain()
        gain.gain.setValueAtTime(1, this.audio.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, this.audio.currentTime + 1)

        noise.connect(filter)
        filter.connect(gain)
        gain.connect(this.audio.destination)

        noise.start()
        noise.stop(this.audio.currentTime + 1)
    }

    playKick(time) {
        const osc = this.audio.createOscillator()
        const gain = this.audio.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(150, time)
        osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.5)

        gain.gain.setValueAtTime(1, time)
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5)

        osc.connect(gain)
        gain.connect(this.audio.destination)

        osc.start(time)
        osc.stop(time + 0.5)
    }

    playSnare(time) {
        const noise = this.audio.createBufferSource()
        const bufferSize = this.audio.sampleRate
        const buffer = this.audio.createBuffer(1, bufferSize, this.audio.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1
        }

        const noiseGain = this.audio.createGain()
        noise.buffer = buffer
        noise.loop = false

        noiseGain.gain.setValueAtTime(1, time)
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2)

        noise.connect(noiseGain)
        noiseGain.connect(this.audio.destination)

        noise.start(time)
        noise.stop(time + 0.2)
    }

    playMusic() {
        // Chill chord loop
        const chords = [
            [261.63, 329.63, 392.00], // C major
            [220.00, 293.66, 349.23], // A minor
            [246.94, 311.13, 392.00], // Bdim (mellow tension)
            [196.00, 261.63, 329.63]  // G major
        ]
        let chordBeat = 0
        setInterval(() => {
            const chord = chords[chordBeat % chords.length]
            chord.forEach(freq => this.playNote(freq, 1.5, 0))
            chordBeat++
        }, 2000) // one chord every 2 seconds
        let beat = 0
        setInterval(() => {
            const now = this.audio.currentTime
            this.playKick(now)
            setTimeout(() => this.playSnare(this.audio.currentTime), 500)
            beat++
        }, 1000) // 1 beat per second
    }
}
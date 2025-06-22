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

    _playOscillator({
        frequency = 440,
        duration = 1,
        type = 'sine',
        frequencyRamp = null,
        gainRamp = null
    } = {}) {
        const now = this.audio.currentTime
        const osc = this.audio.createOscillator()
        const gain = this.audio.createGain()

        osc.type = type
        osc.frequency.setValueAtTime(frequency, now)

        if (frequencyRamp) {
            osc.frequency.exponentialRampToValueAtTime(frequencyRamp, now + duration)
        }

        gain.gain.setValueAtTime(1, now)
        if (gainRamp) {
            gain.gain.exponentialRampToValueAtTime(gainRamp, now + duration)
        }

        osc.connect(gain)
        gain.connect(this.audio.destination)

        osc.start(now)
        osc.stop(now + duration)
    }

    playNote(frequency, duration = 1) {
        this._playOscillator({ frequency, duration, type: 'sine' })
    }

    laserBlaster(frequency = 880, duration = 0.3) {
        this._playOscillator({
            frequency,
            duration,
            type: 'square',
            frequencyRamp: 100,
            gainRamp: 0.01
        })
    }

    _playNoise({
        duration = 1,
        fade = null,
        filter = null,
        gain = 1,
        endGain = 0.01
    } = {}) {
        const now = this.audio.currentTime
        const bufferSize = this.audio.sampleRate * duration
        const buffer = this.audio.createBuffer(1, bufferSize, this.audio.sampleRate)
        const data = buffer.getChannelData(0)

        for (let i = 0; i < bufferSize; i++) {
            const base = Math.random() * 2 - 1
            data[i] = fade ? base * fade(i / bufferSize) : base
        }

        const noise = this.audio.createBufferSource()
        noise.buffer = buffer

        const gainNode = this.audio.createGain()
        gainNode.gain.setValueAtTime(gain, now)
        gainNode.gain.exponentialRampToValueAtTime(endGain, now + duration)

        let nodeChain = noise

        if (filter) {
            const biquad = this.audio.createBiquadFilter()
            biquad.type = filter.type || 'lowpass'
            biquad.frequency.setValueAtTime(filter.frequency || 1000, now)
            if (filter.Q) biquad.Q.value = filter.Q
            nodeChain.connect(biquad)
            nodeChain = biquad
        }

        nodeChain.connect(gainNode)
        gainNode.connect(this.audio.destination)

        noise.start(now)
        noise.stop(now + duration)
    }

    playExplosion() {
        this._playNoise({
            duration: 1,
            filter: { type: 'lowpass', frequency: 1000 },
            gain: 1,
            endGain: 0.01
        })
    }

    playDamageSound() {
        this._playNoise({
            duration: 0.2,
            fade: t => Math.pow(1 - t, 2), // quadratic fade-out
            filter: { type: 'highpass', frequency: 1500, Q: 5 },
            gain: 0.7,
            endGain: 0.01
        })
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
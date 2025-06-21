export class Report {
    constructor(report_every_nth_frame) {
        this.counter = 0
        this.report_every_nth_frame = report_every_nth_frame
        this.start = new Date()
    }

    count_frames_and_report_every_nth() {
        this.counter = this.counter + 1
        // if (this.counter == fps) {
        if (this.counter >= this.report_every_nth_frame) {
            let elapsed = new Date().getTime() - this.start.getTime()
            console.log(`${this.start.toISOString()}: ${this.counter} frames rendered in ${elapsed}ms`)
            this.counter = 0
            this.start = new Date()
        }
    }
}
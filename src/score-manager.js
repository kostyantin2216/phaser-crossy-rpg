
export default class ScoreManager {

    constructor(status = {}) {
        this.status = status;
    }

    updateStatus(level, time) {
        this.status[level] = time;
    }

}

import Phaser from 'phaser';

class App {

    constructor() {
        this.game = null;
        this._isMobile = navigator.userAgent.indexOf('Mobile') > -1 || navigator.userAgent.indexOf('Tablet') > -1;
    }

    init(config) {
        this.game = new Phaser.Game(config);
    }

    get isReady() {
        return this.game !== null;
    }

    get isMobile() {
        return this._isMobile;
    }

}

// Singleton
export default new App();

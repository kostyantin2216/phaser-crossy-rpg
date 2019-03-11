import 'phaser';

import MainScene from './scenes/main.scene';

import app from './app';

window.onload = function() {
    let height, width;
    if (app.isMobile) {
        width = window.innerWidth;
        height = window.innerHeight;
    } else {
        width = 640;
        height = 360;
    }

    const config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: [
            MainScene
        ]
    };

    app.init(config);
}

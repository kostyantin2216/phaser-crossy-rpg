
import Phaser from 'phaser';
import EnemyFactory from '../enemy.factory';
import ScoreManager from '../score-manager';

export const SCENE_NAME = 'MainScene';

export default class MainScene extends Phaser.Scene {
    
    static get SCENE_NAME() { return SCENE_NAME; }
    
    constructor() {
        super(SCENE_NAME);
    }

    init(data) {
        console.log(data);
        this.level = data.level || 0;
        this.scoreManager = new ScoreManager(data.scoreStatus);
        this.playerSpeed = 3;
        this.enemyMinSpeed = 1;
        this.enemyMaxSpeed = 4;
        this.enemyMinY = 80;
        this.enemyMaxY = 280;
        this.isTerminating = false;
        this.startTime = this.getTimer();
        console.log('init', this.getTimer() / 1000);
    }
    
    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('player', 'assets/images/player.png');
        this.load.image('dragon', 'assets/images/dragon.png');
        this.load.image('treasure', 'assets/images/treasure.png');
    }
    
    create() {
        const gameW = this.sys.game.config.width;
        const gameH = this.sys.game.config.height;

        const bg = this.add.image(0, 0, 'background');
        bg.setPosition(gameW / 2, gameH / 2);
        
        this.player = this.add.image(40, gameH / 2, 'player');
        this.player.setScale(.5);

        this.goal = this.add.sprite(gameW - 70, gameH / 2, 'treasure');
        this.goal.setScale(.6);

        const enemyFactory = new EnemyFactory({ scene: this });

        if (this.level >= enemyFactory.maxLevels) {
            this.level = 0;
        }

        this.enemies = enemyFactory.createEnemyGroup(this.level);

        const txtOpts  = { backgroundColor: '#000000', padding: 5 };
        this.levelText = this.add.text(20, 10, 'Level:' + (this.level + 1), txtOpts);
        this.timeText  = this.add.text(gameW - 20, 10, 'Time: 00:00.0', txtOpts);
        this.timeText.setOrigin(1, 0);
        
        this.startTime = this.getTimer();
    }
    
    update() {
        if (this.isTerminating) return;

        if (this.input.activePointer.isDown) {
            this.player.x += this.playerSpeed;
        }

        if (this.hasCollided(this.player, this.goal)) {
            return this.gameOver(true);
        }

        this.updateEnemies();
        this.updateTime();
    }

    updateEnemies() {
        const enemies = this.enemies.getChildren();
        const enemyCount = enemies.length;

        for (let i = 0; i < enemyCount; i++) {
            const enemy = enemies[i];

            enemy.y += enemy.speed;

            const conditionUp = enemy.speed < 0 && enemy.y <= this.enemyMinY;
            const conditionDown = enemy.speed > 0 && enemy.y >= this.enemyMaxY;

            if (conditionUp || conditionDown) {
                enemy.speed *= -1;
            }

            if (this.hasCollided(this.player, enemy)) {
                return this.gameOver(false);
            }
        }
    }

    updateTime() {
        const elapsedMillis = this.getTimer() - this.startTime;

        let milliseconds = parseInt((elapsedMillis % 1000) / 100)
        let seconds = parseInt((elapsedMillis / 1000) % 60)
        let minutes = parseInt((elapsedMillis / (1000 * 60)) % 60);

        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        
        /* const minutes = Math.floor(elapsedMillis / 60000);
        const seconds = ((elapsedMillis % 60000) / 1000).toFixed(0);
        const ellapseTime = (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds); */

        this.timeText.setText('Time: ' + minutes + ":" + seconds + "." + milliseconds);
    }

    gameOver(reachedTreasure) {
        this.isTerminating = true;

        const beginFade = () => {
            this.cameras.main.fade(500);
        };
        if (reachedTreasure) {
            const elapsedMillis = this.getTimer() - this.startTime;
            this.scoreManager.updateStatus(this.level, elapsedMillis);
            this.cameras.main.flash(500);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FLASH_COMPLETE, beginFade);
        } else {
            this.cameras.main.shake(500);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.SHAKE_COMPLETE, beginFade);
        }
        
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (camera, effect) => {
            const data = {
                level: reachedTreasure ? this.level + 1 : 0,
                scoreStatus: reachedTreasure ? this.scoreManager.status : undefined
            };
            this.scene.restart(data);
        });
    }

    hasCollided(rect1, rect2) {
        return Phaser.Geom.Intersects.RectangleToRectangle(rect1.getBounds(), rect2.getBounds())
    }

    getTimer() {
        return new Date().getTime();
    }
    
}


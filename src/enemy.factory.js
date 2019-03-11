
export default class EnemyFactory {

    constructor(config) {
        this.scene = config.scene;

        this.maxLevels = 3;
        this.enemies = {
            0: firstLevelEnemies,
            1: secondLevelEnemies,
            2: thirdLevelEnemies
        }
    }

    createEnemyGroup(level) {
        if (level < 0 || level >= this.maxLevels) return;

        const enemies = this.enemies[level]();

        const group = this.scene.add.group();

        enemies.forEach((enemy) => {
            const sprite = this.scene.add.sprite(0, 0, 'dragon');

            sprite.flipX = true;

            sprite.x = enemy.x;
            sprite.y = enemy.y;

            sprite.setScale(.6);

            sprite.speed = enemy.dir * enemy.speed;

            group.add(sprite);
        });

        return group;
    }

}

function firstLevelEnemies() {
    return [
        {
            x: 210,
            y: 40,
            speed: 2,
            dir: 1
        },
        {
            x: 390,
            y: 100,
            speed: 1,
            dir: -1
        }
    ];
}

function secondLevelEnemies() {
    return [
        {
            x: 250,
            y: 120,
            speed: 3,
            dir: 1
        },
        {
            x: 320,
            y: 70,
            speed: 2,
            dir: -1
        }
    ];
}

function thirdLevelEnemies() {
    return [
        {
            x: 90,
            y: 180,
            speed: 1.5,
            dir: 1
        },
        {
            x: 120,
            y: 170,
            speed: 1.5,
            dir: 1
        },
        {
            x: 150,
            y: 160,
            speed: 1.5,
            dir: 1
        },
        {
            x: 180,
            y: 150,
            speed: 1.5,
            dir: 1
        },
        {
            x: 210,
            y: 140,
            speed: 1.5,
            dir: 1
        },
        {
            x: 240,
            y: 130,
            speed: 1.5,
            dir: 1
        },
        {
            x: 270,
            y: 120,
            speed: 1.5,
            dir: 1
        },
        {
            x: 300,
            y: 110,
            speed: 1.5,
            dir: 1
        },
        {
            x: 330,
            y: 100,
            speed: 1.5,
            dir: 1
        },
        {
            x: 360,
            y: 90,
            speed: 1.5,
            dir: 1
        },
        {
            x: 390,
            y: 80,
            speed: 1.5,
            dir: 1
        },
        {
            x: 420,
            y: 90,
            speed: 1.5,
            dir: -1
        },
        {
            x: 450,
            y: 100,
            speed: 1.5,
            dir: -1
        },
        {
            x: 480,
            y: 110,
            speed: 1.5,
            dir: -1
        },
        {
            x: 510,
            y: 120,
            speed: 1.5,
            dir: -1
        }
    ];
}

function fourthLevelEnemies() {

}

function fifthLevelEnemies() {

}

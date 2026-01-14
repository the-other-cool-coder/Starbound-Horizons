const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0,
            enableBody: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let platforms;
let collectibles = [];
let cursors;
let craftingMaterials = {};

function preload() {
    this.load.image('sky', 'path/to/your/sky-image.png');
    this.load.image('ground', 'path/to/your/ground-image.png');
    this.load.image('star', 'path/to/your/star-image.png');
    this.load.image('craft', 'path/to/your/craft-image.png');
}

function create() {
    this.add.image(400, 300, 'sky'); // Background

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    player = this.physics.add.sprite(100, 450, 'craft');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();
    
    // Collectibles
    createCollectibles.call(this);
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function createCollectibles() {
    for (let i = 0; i < 12; i++) {
        const star = collectibles[i] = this.physics.add.image(Phaser.Math.Between(0, 800), 0, 'star');
        star.setGravityY(Phaser.Math.Between(100, 300));
        star.setCollideWorldBounds(true);
        star.setBounce(1);
    }
    
    // Add overlap event
    this.physics.add.overlap(player, collectibles, collectItem, null, this);
}

function collectItem(player, star) {
    star.destroy();
    
    // Simulate collecting materials
    craftingMaterials[star.texture.key] = (craftingMaterials[star.texture.key] || 0) + 1;
    console.log(`Collected ${star.texture.key}: ${craftingMaterials[star.texture.key]} total.`);
}
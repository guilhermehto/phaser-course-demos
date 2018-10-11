const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    backgroundColor: '#DBF5FD',
    physics: {
        default: 'arcade',
    }, scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const speed = 500
const waitTime = 1000

let timeout = 0

const game = new Phaser.Game(config)

function preload() {
    this.load.image('map', 'assets/map.png')
    this.load.image('fish-1', 'assets/fish-1.png')
    this.load.image('fish-2', 'assets/fish-2.png')
    this.load.image('fish-3', 'assets/fish-3.png')
    this.load.image('fish-4', 'assets/fish-4.png')
    this.load.image('fish-5', 'assets/fish-5.png')
    this.load.image('fish-6', 'assets/fish-6.png')
}

function create() {
    const map = this.add.image(0, 0, 'map')
    map.setOrigin(0)
}

function addRandomFish(game) {
    timeout = Phaser.Math.RND.between(waitTime / 2, waitTime)
    
    const xPos = Phaser.Math.RND.between(0, 100) > 50 ? 
        Phaser.Math.RND.between(-1000, -100) 
        : Phaser.Math.RND.between(1160, 2160)

    const yPos = Phaser.Math.RND.between(100, 500)
    const newFish = game.physics.add.sprite(xPos, yPos, getRandomFishImage())

    let fishSpeed = Phaser.Math.RND.between(speed / 2, speed)
    fishSpeed = xPos < 0 ? fishSpeed : - fishSpeed
    
    newFish.flipX = xPos > 0
    newFish.setVelocityX(fishSpeed)
    
    newFish.setInteractive()
    newFish.on('pointerdown', function() {
        this.disableBody(true, true)
    })
}

function update(time, delta) { 
    timeout -= delta
    if (timeout <= 0) {
        addRandomFish(this)
    }
}

function getRandomFishImage() {
    const randomNumber = Phaser.Math.RND.between(0, 5)
    switch (randomNumber) {
        case 0:
            return 'fish-1'
        case 1:
            return 'fish-2'
        case 2:
            return 'fish-3'
        case 3:
            return 'fish-4'
        case 4:
            return 'fish-5'
        case 5:
            return 'fish-6'
    }
}

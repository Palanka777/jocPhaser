import Phaser from 'phaser';
import {config} from "../index";
import portada from "../scenes/portada"
//import game from "../index"

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var map;
var aigua
var tileset;
var vida1;
var vida2;
var vida3;
var countLife=0;
var recullir;
var musica;


export default class ScenaB extends Phaser.Scene
{
    constructor ()
    {
        super('ScenaB');
    }

    preload ()
    {

        //carrego tiles
        //this.load.image('star', './src/assets/maria.png');
        this.load.image('cor', './src/assets/cor.png');
        this.load.image('star', './src/assets/star.png');
        this.load.image('tiles', './src/images/kenney_16x16.png');
        this.load.spritesheet('dude', './src/assets/dude.png', { frameWidth: 32, frameHeight: 48 });

        // carrego mapa
        this.load.tilemapTiledJSON('map', './src/components/map.json');

        //cargo sons
        this.load.audio('recull','./src/sons/coin.wav');
        this.load.audio('musica','./src/sons/scenaB.wav');
    }

    create ()
    {

        //carrego la musica
        recullir=this.sound.add('recull')
        musica=this.sound.add('musica')
        musica.loop=true;
        musica.play();

        // Carrego mapa

        map = this.make.tilemap({ key: 'map'});
        tileset = map.addTilesetImage('map', 'tiles');

        // Carrego les capes del mapa
        map.createLayer('background', tileset)
        aigua = map.createLayer('Aigua', tileset)
        platforms = map.createLayer('ground', tileset);
        map.createLayer('background2', tileset)

        // faig que el terra i l'aigua siguin colisionables
        platforms.setCollisionByExclusion(-1, true);
        aigua.setCollisionByExclusion(-1, true);
        //Jugador
        player = this.physics.add.sprite(50, 200, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.cameras.main.setBounds(0,0,ScenaB.displayWidth,ScenaB.displayHeight)
        this.cameras.main.startFollow(player)

        //Estrelles a recollir
        stars = this.physics.add.group({
            key: 'star',
            repeat: 12,
            setXY: { x: 100, y: 0, stepX: 200 }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

        });


        //moviment del jugador
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //poso el cor de les vides
        vida1=this.add.image(1300, 35, 'cor');
        vida2=this.add.image(1345, 35, 'cor');
        vida3=this.add.image(1390, 35, 'cor');

        //aigua = this.physics.add.group();

        // especifico els elements que colisionen entre ells
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);

        this.physics.add.collider(player, aigua, caureAigua);
        this.physics.add.overlap(player, stars, collectStar, null, this);




    }

    update ()
    {
        if (gameOver)
        {
            return;
        }

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.onFloor())
        {
            player.setVelocityY(-330);
        }

    }


}

function collectStar (player, star)
{
    star.disableBody(true, true);
    recullir.play();
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

}

function caureAigua (player, aigua)
{
    //this.physics.pause();
    musica.stop();
    countLife++;
    switch (countLife) {
        case 1:
            vida1.visible = false;
            break;
        case 2:
            vida2.visible = false;
            break;
        case 3:
            vida3.visible = false;
            break;
    }

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;

    //this.scene.start('GameOver');
}



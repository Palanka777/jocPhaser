import Phaser from 'phaser';
import {config} from "../index";

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var map;
var tileset;

export default class ScenaB extends Phaser.Scene
{
    constructor ()
    {
        super('ScenaB');
    }

    preload ()
    {
        this.load.image('star', './src/assets/maria.png');
        this.load.image('tiles', './src/images/kenney_16x16.png');
        this.load.spritesheet('dude', './src/assets/dude.png', { frameWidth: 32, frameHeight: 48 });

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', './src/components/prova.json');

    }

    create ()
    {
        // Carrego mapa

        map = this.make.tilemap({ key: 'map'});
        tileset = map.addTilesetImage('prova', 'tiles');
        // create the layers we want in the right order
        map.createLayer('capa1', tileset)
        // "Ground" layer will be on top of "Background" layer
        platforms = map.createLayer('capa2', tileset);
        platforms.setCollisionByExclusion(-1, true);


        //Jugador
        player = this.physics.add.sprite(50, 200, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);


        this.physics.add.collider(player, platforms);


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



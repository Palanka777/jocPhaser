import Phaser from 'phaser';
import {config} from "../index";

//podria no declarar les variables i fer-ho amb this, pero aixi el spaguetti es mes llarg, jeeje
let player;
let stars;
let platforms;
let cursors;
let gameOver = false;
let scoreText;
let map;
let aigua
let tileset;
let vida1;
let vida2;
let vida3;
let recullir;
let musica;
let monstruo;
let porta;
let mort;
let countLife;
let score;

export default class ScenaB extends Phaser.Scene
{
    constructor ()
    {
        super('ScenaB');
    }

    preload ()
    {

        //carrego tiles

        this.load.image('cor', './src/assets/cor.png');
        this.load.image('star', './src/assets/star.png');
        this.load.image('mons', './src/assets/monstruo.png');
        this.load.image('porta', './src/assets/porta.png');
        this.load.image('tiles', './src/images/kenney_16x16.png');
        this.load.spritesheet('dude', './src/assets/dude.png', { frameWidth: 32, frameHeight: 48 });

        // carrego mapa
        this.load.tilemapTiledJSON('map', './src/components/map.json');

        //cargo sons
        this.load.audio('recull','./src/sons/coin.wav');
        this.load.audio('musica','./src/sons/scenaB.wav');
        this.load.audio('mort','./src/sons/mort.mp3');
    }

    create (data)
    {
        if (score==null)score=data.score
        if(data.score==1){
            score=0;
            data.score=0
            countLife=0;
        }

        this.cameras.main.setBounds(0,0, 1790,497)

        //carrego la musica
        recullir=this.sound.add('recull')
        musica=this.sound.add('musica')
        mort=this.sound.add('mort')
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

        this.cameras.main.startFollow(player)
        this.cameras.main.setZoom(1)
        monstruo = this.physics.add.image(800,300,'mons')
        porta = this.physics.add.image(1750,300,'porta')
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
        scoreText = this.add.text(16, 16, 'Score: '+ score, { fontSize: '32px', fill: '#000' });

        //poso el cor de les vides

        switch (countLife) {
            case 0:
                vida1=this.add.image(35, 80, 'cor');
                vida2=this.add.image(80, 80, 'cor');
                vida3=this.add.image(125, 80, 'cor');
                break;

            case 1:
                vida1=this.add.image(35, 80, 'cor');
                vida2=this.add.image(80, 80, 'cor');
                break;
            case 2:
                vida1=this.add.image(35, 80, 'cor');
                break;

        }

        //aigua = this.physics.add.group();

        // especifico els elements que colisionen entre ells
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(monstruo, platforms);
        this.physics.add.collider(porta, platforms);

        this.physics.add.collider(player, aigua, caureAigua,null, this);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.collider(player, monstruo, tocarMonstre, null, this);
        this.physics.add.collider(player, porta, passaNivell, null, this);




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

function caureAigua (player)
{
    this.physics.pause();
    musica.stop();
    mort.play()
    countLife++;
    player.setTint(0xff0000)
    player.anims.play('turn')


    setTimeout(() => {
        switch (countLife) {
            case 1:
                vida1.visible = false;
                this.scene.start('ScenaB',{score:score});
                break;
            case 2:
                vida2.visible = false;
                this.scene.start('ScenaB',{score:score});
                break;
            case 3:
                vida3.visible = false;
                countLife=0
                this.scene.start('GameOver',{score:score,countLife:countLife});
                break;
            default:
                this.scene.start('GameOver',{score:score,countLife:countLife});
        }
    }, 1000)


}

function tocarMonstre (player)
{
    this.physics.pause();
    musica.stop();
    mort.play()
    countLife++;
    player.setTint(0xff0000);
    player.anims.play('turn');
    setTimeout(() => {
        switch (countLife) {
            case 1:
                vida1.visible = false;
                this.scene.start('ScenaB',{score:score});
                break;
            case 2:
                vida2.visible = false;
                this.scene.start('ScenaB',{score:score});
                break;
            case 3:
                vida3.visible = false;
                countLife=0;
                this.scene.start('GameOver',{score:score});
                break;
            default:
                this.scene.start('GameOver',{score:score});
        }
    }, 1000)

}
function passaNivell(){
    musica.stop()
    this.scene.start('ScenaA',{score:score,countLife:countLife})
}



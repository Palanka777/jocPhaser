import Phaser from 'phaser';
import gameover from '../assets/gameover.png';
import backGround from '../assets/background.png';
import { PlayButton } from '../components/buttonStart';

export default class GameOver extends Phaser.Scene
{
    constructor ()
    {
        super('GameOver');
        this.playButton = new PlayButton(this);
    }

    preload ()
    {
        this.load.image('back', backGround);
        this.load.image('over', gameover);
        this.load.spritesheet('playbutton', './src/images/playbutton.png', { frameWidth: 200, frameHeight: 49 });

    }

    create (data)
    {
        this.add.image(800,300,'back')
        this.playButton.create();
        const over = this.add.image(830, 50, 'over');

        this.scoreText = this.add.text(760, 350, 'Score: '+ data.score, { fontSize: '32px', fill: '#fff' });

        this.tweens.add({
            targets: over,
            y: 300,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}


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
        this.load.spritesheet('playbutton', './src/images/playbutton.png', { frameWidth: 190, frameHeight: 49 });

    }

    create ()
    {
        this.add.image(300,300,'back')
        this.playButton.create();
        const over = this.add.image(400, 50, 'over');

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


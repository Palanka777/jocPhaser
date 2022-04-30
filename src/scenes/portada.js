import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import { PlayButton } from '../components/buttonStart';


export default class Portada extends Phaser.Scene
{
    constructor ()
    {
        super('Portada');
        this.playButton = new PlayButton(this);
    }

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.spritesheet('playbutton', './src/images/playbutton.png', { frameWidth: 190, frameHeight: 49 });

    }

    create ()
    {
        this.playButton.create();

        const logo = this.add.image(400, 50, 'logo');

        this.tweens.add({
            targets: logo,
            y: 300,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}


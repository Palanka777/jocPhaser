import Portada from './scenes/portada';
import MyGame from './scenes/scenaA';
import ScenaB from './scenes/scenaB';
import GameOver from "./scenes/gameOver";
import Phaser from "phaser";


const config = {
    type: Phaser.AUTO,
    width: 1790,
    height: 497,
    backgroundColor:'#5e3f6b',
    scene: [Portada,ScenaB, MyGame,GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scale: {

        autoCenter: Phaser.Scale.CENTER_BOTH,
        scale: Phaser.Scale.MAX_ZOOM

    }
}
new Phaser.Game(config);

import Portada from './scenes/portada';
import MyGame from './scenes/scenaA';
import ScenaB from './scenes/scenaB';
import GameOver from "./scenes/gameOver";



const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor:'#5e3f6b',
    scene: [Portada,ScenaB, MyGame,GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scale: {

        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}
new Phaser.Game(config);

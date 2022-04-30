import Portada from './scenes/portada';
import ScenaA from './scenes/scenaA';
import GameOver from "./scenes/gameOver";



const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor:'#5e3f6b',
    scene: [Portada, ScenaA,GameOver],
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
var game = new Phaser.Game(config);

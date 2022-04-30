import Portada from './scenes/portada';
import ScenaA from './scenes/scenaA';



const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#add8e6',
    scene: [Portada, ScenaA],
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

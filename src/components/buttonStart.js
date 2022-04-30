import { Button } from './button.js';


export class PlayButton extends Button {
    constructor(scene) {
        super(scene, 'playbutton', 390, 500);
    }

    doClick() {
        //this.relatedScene.breakoutSample.play();
        this.relatedScene.scene.start('MyGame');
    }

}
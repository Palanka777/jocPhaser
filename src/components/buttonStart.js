import { Button } from './button.js';



export class PlayButton extends Button {
    constructor(scene) {
        super(scene, 'playbutton', 790, 450);
    }

    doClick() {
        //this.relatedScene.breakoutSample.play();
        this.relatedScene.scene.start('ScenaB');
    }

}
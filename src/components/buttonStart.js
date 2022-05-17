import { Button } from './button.js';

export class PlayButton extends Button {
    constructor(scene) {
        super(scene, 'playbutton', 840, 450);
    }

    doClick() {

        this.relatedScene.scene.start('ScenaB',{score:1});
    }

}
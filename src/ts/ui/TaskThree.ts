import Sprite from "./components/Sprite";
import GU from "../utils/GameUtils";
import Rectangle from "./components/Rectangle";
import ParticleContainer = PIXI.particles.ParticleContainer;

export default class TaskThree extends Sprite {

    private maskArea : Rectangle;

    private animContainer:PIXI.Container;

    private particleContainer1:ParticleContainer;

    //**************** PARTICLES ANIMATION **********************

    private fireParticleConfig = {
        "alpha": {
            "start": 0.8,
            "end": 0
        },
        "scale": {
            "start": 0.01,
            "end": 0.5,
            "minimumScaleMultiplier": 1.25
        },
        "color": {
            "start": "#ffe100",
            "end": "#ff5500"
        },
        "speed": {
            "start": 100,
            "end": 500,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 265,
            "max": 275
        },
        "noRotation": true,
        "rotationSpeed": {
            "min": 50,
            "max": 50
        },
        "lifetime": {
            "min": 0.1,
            "max": 0.75
        },
        "blendMode": "normal",
        "frequency": 0.025,
        "emitterLifetime": -1,
        "maxParticles": 10,
        "pos": {
            "x": 0,
            "y": GU.gameResolution()[1]/2-80
        },
        "addAtBack": false,
        "spawnType": "point"
    };
    private fireAnimation_fireEmitter: PIXI.particles.Emitter;

    private elapsed: number;
    //******************************************************

    constructor () {
        super();

        this.addLayers();
        this.positionAnimatedParticles();
        this.addAnimationMask();
        this.setEmitters();
        this.setAnimation();

        this.elapsed = Date.now();
    }

    updateTransform(): void {
        super.updateTransform();
        let now = Date.now();

        this.fireAnimation_fireEmitter.update((now - this.elapsed) * 0.001);
        this.elapsed = Date.now();

    }

    private addAnimationMask(){
        const isMobile = PIXI.utils.isMobile.any;

        this.maskArea = new Rectangle({
            color: 0xFFFFFF,
            w: GU.gameResolution()[0]/2,
            h: 300,
            x: 0,
            y: isMobile ? 320: 15
        });
        this.addChild(this.maskArea);
        this.animContainer.mask = this.maskArea;
    }

    private setEmitters(){
        this.fireAnimation_fireEmitter = new PIXI.particles.Emitter(
            this.particleContainer1,
            [PIXI.Texture.fromImage('fireParticle')],
            this.fireParticleConfig
        );
    }
    private positionAnimatedParticles(){

        GU.showText({
            text: "Fire Particle Animation",
            color: 0xFFFFFF,
            parent: this,
            size: 34,
            font: "Roboto-Condensed",
            align: "center",
            y: -120
        });

    }

    private addLayers(){

        this.animContainer = new PIXI.Container();
        this.addChild(this.animContainer);

        this.particleContainer1 = new ParticleContainer();

        this.animContainer.addChild(this.particleContainer1);

    }

    private setAnimation(){
        this.fireAnimation_fireEmitter.emit = true;
    }

}

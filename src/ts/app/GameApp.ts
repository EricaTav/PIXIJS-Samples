import GameUtils from "../utils/GameUtils";
import * as TWEEN from "tween.js";
import TweenManager from "../utils/TweenExtensions";
import * as EventEmitter from "eventemitter3";
import {INITIAL_ASSETS, GENERAL_ASSETS} from "./Resources";
import WebGLRenderer = PIXI.WebGLRenderer;
import CanvasRenderer = PIXI.CanvasRenderer;

const imagesFolder = "images";

const GameApp = {
    renderer: null,
    stage: null,
    eventEmitter: new EventEmitter.EventEmitter(),

    start (params = { onpreload: () => {}, onload: () => {} }) {
        this.params = params;

        this.setupPIXI();
        this.loadStep();

        window.addEventListener("resize", GameUtils.refreshGameRenderer);
    },

    setupPIXI () {
        PIXI.settings.RESOLUTION = 2;

        this.createRenderer();
        GameUtils.resizeWindow();

        _animate();


        function _animate(time?) {
            TWEEN.update(time);

            if(GameApp.stage) GameApp.renderer.render(GameApp.stage);

            TweenManager.removeExpired();
            requestAnimationFrame(_animate);

        }
    },

    loadStep () {
        const loadQueue = [];

        const imagesPreloader = new Promise(resolved => {
            if (!INITIAL_ASSETS.length) return resolved();

            const loader = PIXI.loader;
            INITIAL_ASSETS.forEach(a => loader.add(a[0], `${imagesFolder}/${a[1]}`));
            loader.once("complete", resolved);
            loader.load();
        });

        loadQueue.push(imagesPreloader);

        Promise.all(loadQueue)
            .then(() => {
                this.startMainLoad();
                if (typeof this.params.onpreload === "function") this.params.onpreload();
            });
    },

    startMainLoad () {
        const loadQueue = [];

        const imagesPreloader = new Promise(resolved => {
            if (!GENERAL_ASSETS.length) return resolved();

            const loader = PIXI.loader;
            GENERAL_ASSETS.forEach(a => loader.add(a[0], `${imagesFolder}\\${a[1]}`));
            loader.once("complete", resolved);
            loader.load();
        });

        loadQueue.push(imagesPreloader);

        Promise.all(loadQueue).then(() =>{
            if(typeof this.params.onload === "function") this.params.onload()
        });
    },

    createRenderer () {
        if (this.renderer) this.renderer.destroy(true);

        const resolution = GameUtils.gameResolution();
        let width = resolution[0];
        let height = resolution[1];

        const renderer = new WebGLRenderer(width, height);
        //const renderer = new CanvasRenderer(width, height);
        renderer.backgroundColor = 0xFFFFFF;

        renderer.view.style.position = 'absolute';
        renderer.backgroundColor = 0xFFFFFF;
        renderer.view.style.left = '50%';
        renderer.view.style.top = '50%';
        renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';
        document.body.appendChild(renderer.view);

        this.renderer = renderer;
        this.renderer.plugins.sprite.sprites.length = 0;
    },

    createStage () {
        if (this.stage) this.stage.destroy();
        this.stage = new PIXI.Container();
        this.renderer.render(this.stage);
    },

    resizeStage () {
        const stage = this.stage;
        stage.children.forEach(_resizeContent);

        function _resizeContent(displayObj) {
            displayObj.emit("resize", {target: displayObj});
            if (displayObj.children) displayObj.children.forEach(_resizeContent);
        }
    }
};

export default GameApp;
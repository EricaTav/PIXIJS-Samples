import GU from "../utils/GameUtils";
import MainScreen from "../ui/TitleScreen";

export default class GameContainer extends PIXI.Container {

    private stateLayer: PIXI.Container;
    private uiLayer: PIXI.Container;

    private screen;

    private mainScreen: MainScreen;

    constructor () {
        super();

        this.addLayers();
        this.setGameResolution();
        this.fillStateLayer();
        this.addListeners();
    }

    private addLayers () {
        this.stateLayer = new PIXI.Container();
        this.addChild(this.stateLayer);

    }

    private setGameResolution () {
        const screen = GU.gameResolution();
        this.screen = {
            width: screen[0],
            height: screen[1]
        };
    }


    private fillStateLayer () {
        this.mainScreen = new MainScreen();
        this.stateLayer.addChild(this.mainScreen);
    }


    private addListeners () {
        this.on("added", () => {
            const res = GU.gameResolution();
            this.position.set(res[0]/2, res[1]/2);
        });
    }
}
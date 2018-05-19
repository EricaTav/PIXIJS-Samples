import * as PIXI from "pixi.js";
import GameApp from "./GameApp";
import GameContainer from "./GameContainer";
let mainGameContainer: GameContainer;

const GC = {
    isMobile: PIXI.utils.isMobile.any,
    gameApp: GameApp,
    start () {

        const onload = () => {

            GameApp.createStage();

            const setGameConfigs = new Promise(resolved => {
                mainGameContainer = new GameContainer();
                GC.getStage().addChild(mainGameContainer);
            });

        };

        const loadProcess = new Promise(mainSolution => {
            let onResourcesLoad;
            const resourcesLoading = new Promise(resolved => onResourcesLoad = resolved);
            GameApp.start({
                onpreload: () => {
                    const loaded = Promise.all([resourcesLoading]);
                    loaded.then(mainSolution);
                },
                onload: onResourcesLoad
            });
        });
        loadProcess.then(() => {
            onload();
        }).catch(e => console.log(e));
    },

    getStage () {
        return this.gameApp.stage;
    }
};

export default GC;
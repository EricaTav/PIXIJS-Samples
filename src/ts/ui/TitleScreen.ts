import Sprite from "./components/Sprite";
import GameUtils from "../utils/GameUtils";
import Rectangle from "./components/Rectangle";
import Button from "./components/Button";
import TaskOne from "./TaskOne";
import TaskTwo from "./TaskTwo";
import TaskThree from "./TaskThree";

export default class TitleScreen extends Sprite {

    private titleContainer: PIXI.Container;
    private backgroundContainer: PIXI.Container;
    private navContainer: PIXI.Container;
    private task1Screen: TaskOne;
    private task2Screen: TaskTwo;
    private task3Screen: TaskThree;

    private isMobile = PIXI.utils.isMobile.any;

    constructor () {
        super();

        this.addContainers();
        this.fillScreen();
        this.addNavButtons();

    }

    private fillScreen(){
        const resolution = GameUtils.gameResolution();
        this.backgroundContainer.addChild(new Rectangle({w: resolution[0], h: resolution[1], color: 0x22253D, lineWidth: 0}));

        GameUtils.showText({
            text: "SELECT SAMPLE",
            color: 0xFFFFFF,
            parent: this.titleContainer,
            size: this.isMobile ? 42 : 34,
            font: "Roboto-Condensed",
            align: "center",
            y: this.isMobile ? -240 : -120
        });
        this.addButtons();

    }

    private addButtons(){

        let params = {
            color: 0x00B4FF,
            width: this.isMobile ? 300 : 150,
            height: this.isMobile ? 80 :50
        };

        const task1Btn = new Button(Object.assign(params, {text: "TASK 1"}));
        const task2Btn = new Button(Object.assign(params, {text: "TASK 2"}));
        const task3Btn = new Button(Object.assign(params, {text: "TASK 3"}));

        this.titleContainer.addChild(task1Btn, task2Btn, task3Btn);

        if(this.isMobile){
            task1Btn.position.set( 0, 0);
            task2Btn.position.set( 0, 150);
            task3Btn.position.set( 0, 300);
        }else{
            task1Btn.position.set( -350, 120);
            task2Btn.position.set( 0, 120);
            task3Btn.position.set( 350, 120);
        }

        task1Btn.on("pointerclick", ()=> this.openTask1());
        task2Btn.on("pointerclick", ()=> this.openTask2());
        task3Btn.on("pointerclick", ()=> this.openTask3());
    }

    private addContainers () {
        this.titleContainer = new PIXI.Container();
        this.backgroundContainer = new PIXI.Container();
        this.navContainer = new PIXI.Container();
        this.addChild(this.backgroundContainer, this.titleContainer,this.navContainer);
        this.navContainer.visible = false;
    }

    private openTask1(){
        this.task1Screen = new TaskOne();
        this.titleContainer.visible = false;
        this.addChild(this.task1Screen);
        this.navContainer.visible = true;

    }

    private openTask2(){
        this.task2Screen = new TaskTwo();
        this.titleContainer.visible = false;
        this.addChild(this.task2Screen);
        this.navContainer.visible = true;

    }

    private openTask3(){
        this.task3Screen = new TaskThree();
        this.titleContainer.visible = false;
        this.addChild(this.task3Screen);
        this.navContainer.visible = true;

    }

    private addNavButtons(){
        const isMobile = PIXI.utils.isMobile.any;
        let backBtn = new Sprite(GameUtils.getTexture("go"));
        isMobile ? backBtn.scale.set(2*-1) : backBtn.scale.set(0.7*-1);
        backBtn.position.set(-GameUtils.gameResolution()[0]/2+backBtn.width, -GameUtils.gameResolution()[1]/2+backBtn.height);
        this.navContainer.addChild(backBtn);
        backBtn.on("pointerclick", ()=> this.closeTasks());

    }
    private closeTasks(){
        if(this.task1Screen) this.task1Screen.safeRemove();
        if(this.task2Screen) this.task2Screen.safeRemove();
        if(this.task3Screen) this.task3Screen.safeRemove();

        this.titleContainer.visible = true;
        this.navContainer.visible = false;
    }
}
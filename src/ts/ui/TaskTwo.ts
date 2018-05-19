import Sprite from "./components/Sprite";
import GameUtils from "../utils/GameUtils";
import ParticleContainer = PIXI.particles.ParticleContainer;

export default class TaskThree extends Sprite {

    private taskTwoContainer: PIXI.Container;
    private randomTexts =
        ["1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm",
        "WHITE", "BLUE", "RED", "BLACK", "YELLOW", "PINK", "GREEN", "GREY",
        "🐰","🐱","🐲"," 🐳","🐴","🐵","🐶","🐷","🐸","🐹","🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘","🌙","🌚","🌛","🌜"];

    constructor () {
        super();

        this.addLayers();
        this.fillUI(5); //how many random rows we want
        this.startGenerator();

    }

    private addLayers(){
        this.taskTwoContainer = new PIXI.Container();
        this.addChild(this.taskTwoContainer);
    }

    private startGenerator(){
        setInterval(()=>{
            for (let i = this.taskTwoContainer.children.length - 1; i >= 0; i--) {
                this.taskTwoContainer.removeChild(this.taskTwoContainer.children[i]);
            }
            this.fillUI(5); //how many random rows we want
        }, 2000);

    }

    private fillUI(nRandomElements:number){
        for(let i = 0; i<=nRandomElements; i++){
            this.getText("right", -80 + 50*i);
            this.getText("center", -80 + 50*i);
            this.getText("left", -80 + 50*i);
        }
    }

    private pickRandom (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    private getText(align, yPos){

        let textRandom = this.pickRandom(this.randomTexts);
        let sizeRandom = GameUtils.randomInt(10,34);

        let xPos = 0;
        if(align=="left") xPos = +50;
        if(align=="right") xPos = -50;

        GameUtils.showText({
            text: textRandom,
            color: 0xFFFFFF,
            parent: this.taskTwoContainer,
            size: sizeRandom,
            font: "Roboto-Condensed",
            align: align,
            y: yPos,
            x: xPos
        });
    }

}

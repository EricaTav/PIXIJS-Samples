import Sprite from "./components/Sprite";
import GameUtils from "../utils/GameUtils";
import ParticleContainer = PIXI.particles.ParticleContainer;
import * as TWEEN from "tween.js";

export default class TaskOne extends Sprite {
    private taskOneContainer:PIXI.Container;
    private cards = [];
    private fpsArr=[];
    private fpsText;
    private elapsed;
    constructor () {
        super();

        this.elapsed = Date.now();

        this.addLayers();
        this.setFPSText();
        this.addLeftCardDeck(144); //how many cards in deck
    }

    private setFPSText(){
        this.fpsText = GameUtils.showText({
            text: "FPS:",
            color: 0xFFFFFF,
            parent: this.taskOneContainer,
            size: 24,
            font: "Roboto-Condensed",
            align: "center",
            x: GameUtils.gameResolution()[0]/2-100,
            y: -GameUtils.gameResolution()[1]/2+50,
        });
    }

    updateTransform(): void {
        let now = Date.now();
        let fps = 1000 / (now - this.elapsed);
        this.elapsed = Date.now();

        this.fpsArr.push(fps);
        if(this.fpsArr.length>10){
            var sum = this.fpsArr.reduce(function(a, b) { return a + b; });
            var avg = sum / this.fpsArr.length;
            this.fpsText.text = "FPS:"+Math.ceil(avg);
            this.fpsArr = [];
        }

        super.updateTransform();

    }

    private addLayers(){
        this.taskOneContainer = new PIXI.Container();
        this.addChild(this.taskOneContainer);
    }

    private addLeftCardDeck(numberOfCards:number){

        const isMobile = PIXI.utils.isMobile.any;

        GameUtils.showText({
            text: "Card Deck Animation",
            color: 0xFFFFFF,
            parent: this.taskOneContainer,
            size: 34,
            font: "Roboto-Condensed",
            align: "center",
            y: isMobile ? -220 : -120
        });

        for(let i =0; i<numberOfCards; i++){
            let newCard = new Sprite(GameUtils.getTexture("card"));
            newCard.position.set((isMobile ? -270 :-350)+1*i, 1*i-40);
            this.cards.push(newCard);
            this.taskOneContainer.addChild(newCard);

            var tween = new TWEEN.Tween(newCard)
                .delay(1000*(numberOfCards-i))
                .to({ x: (isMobile ? 130 : 200)+1*i, y: i*1 }, 2000)
                .onStart(()=>{
                    this.taskOneContainer.removeChild(newCard);
                    this.taskOneContainer.addChild(newCard);
                })
                .start();
        }
    }

}

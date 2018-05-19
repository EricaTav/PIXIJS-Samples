import Sprite from "./Sprite";
import GU from "../../utils/GameUtils";
import Rectangle from "./Rectangle";

interface ButtonParams {
    text: string | number
    textOff?: string
    color: number
    width: number
    height: number
    fontSize?: number
    font?: string
    adaptive?: boolean
    icon?:boolean
}

export default class Button extends Sprite {

    public isSelected: boolean;

    public onTexture;
    public offTexture;

    constructor (params: ButtonParams) {
        super();

        this.addStates(params);
        this.deselect();
        this.buttonMode = true;
        this.addListeners();
    }

    private addStates(params) {

        const textures = this.buttonShapes(params);

        const buttonText1 = GU.showText({
            text: params.text,
            color: 0xFFFFFF,
            parent: textures[0],
            size: GU.isMobile() ? 34 : params.fontSize,
            font: "Roboto-Condensed",
            y: 2.5
        });

        this.fixBtnTextSize(buttonText1, params.width);

        this.onTexture = GU.createTexture(textures[0]);

        const buttonText2 = GU.showText({
            text: (params.textOff) ?params.textOff: params.text,
            color: 0xFFFFFF,
            parent: textures[1],
            size: GU.isMobile() ? 34 :params.fontSize,
            font: "Roboto-Condensed",
            y: 2
        });
        buttonText2.y -=2;

        this.fixBtnTextSize(buttonText2, params.width);

        this.offTexture = GU.createTexture(textures[1]);
    }

    private fixBtnTextSize(text, maxWidth){
        while (text.width > maxWidth*0.9) {
            text.style.fontSize--;
            text.style.lineHeight--;
        }
    }

    private buttonShapes(params){

       const onTexture = new PIXI.Graphics();
       const offTexture = new PIXI.Graphics();

       const textWidth = GU.showText({
           text: params.text,
           size: params.fontSize,
           font: "Roboto-Condensed",
           y: 0.5
       }).width;

       const shapeParams = {
           w: params.width,
           h: params.height,
           lineWidth: 0,
           color: params.color,
           rounded: true,
           radius: 5
       };

       onTexture.addChild(new Rectangle(Object.assign({}, shapeParams, {
           h: params.height + 2
       })));
       onTexture.addChild(new Rectangle(Object.assign({}, shapeParams, {
           h: params.height + 2,
           color: 0,
           shapeAlpha: 0.2
       })));
       const mainShapeOn = new Rectangle(shapeParams);
       mainShapeOn.y -= 1.5;


       onTexture.addChild(mainShapeOn);

       offTexture.addChild(new Rectangle(Object.assign({}, shapeParams, {
           h: params.height,
           y: 2
       })));
       offTexture.addChild(new Rectangle(Object.assign({}, shapeParams, {
           h: params.height + 2,
           color: 0,
           shapeAlpha: 0
       })));

       return [offTexture, onTexture];
   }

    public select () {
        this.isSelected = true;
        this.texture = this.onTexture;
        this.emit("selected", {target: this});
    }

    public deselect () {
        this.isSelected = false;
        this.texture = this.offTexture;
        this.emit("deselected", {target: this});
    }

    private addListeners () {

        this.on("pointerdown", () => {
            if (!this.isSelected) this.select();
        });

        this.on("mouseout", () => {
            if (this.isSelected) this.deselect();
        });

        this.on("pointerupoutside", () => {
            if (this.isSelected) this.deselect();
        });

        this.on("pointerup", () => {
            if (this.isSelected) this.deselect();
        });

    }
}
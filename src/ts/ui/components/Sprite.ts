import * as PIXI from 'pixi.js';

const eventReplacementEnabled = true;
const pointerEvents = [
	"mousedown",
	"mouseup",
	"mousemove",
	"click",
	"touchstart",
	"touchend",
	"touchmove",
	"tap",
	"mouseover",
	"mouseout",
	"mouseupoutside",
	"rightclick",
	"rightdown",
	"rightup",
	"rightupoutside",
	"touchendoutside",
	"pointerdown",
	"pointerup",
	"pointermove",
	"pointerclick",
	"pointerupoutside"
];

export default class Sprite extends PIXI.Sprite {

	constructor (texture?) {
		super(texture);

		this.anchor.set(0.5);
	}

	public on (event:string, fn:any, context?:any): any {

        if (eventReplacementEnabled) {

            switch (event) {
                case "pointerclick":
                    super.on("click", fn, context);
                    super.on("tap", fn, context);
                    break;
            }
        }

		if (pointerEvents.indexOf(event) >= 0) this.interactive = true;

		super.on(event, fn, context);
	}

	public once (event:string, fn:any, context?:any): any {

        if (eventReplacementEnabled) {

            switch (event) {
                case "pointerclick":
                    super.once("click", fn, context);
                    super.once("tap", fn, context);
                    break;

            }
        }

		if (pointerEvents.indexOf(event) >= 0) this.interactive = true;

		super.once(event, fn, context);
	}

	public removeListener (event:string, fn:any, context?:any, once?:boolean): any {

        if (eventReplacementEnabled) {
            switch (event) {
                case "pointerclick":
                    super.removeListener("click", fn, context);
                    super.removeListener("tap", fn, context);
                    break;

            }
        }

		super.removeListener(event, fn, context, once);
	}

	public emit (event, data?): any {
		const eventData = arguments[1] || {};

		if (!eventData.type) eventData.type = event;
		if (!eventData.target) eventData.target = this;

		super.emit(event, eventData);
	}
}

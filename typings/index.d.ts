/// <reference path="globals/pixi.js/index.d.ts" />
/// <reference path="globals/tween.js/index.d.ts" />
/// <reference path="globals/pixi-filters/index.d.ts" />

declare module PIXI {
    export interface DisplayObject {
        shiftTo(x: number, y: number, duration: number, easing?: any, onfinish?, onchange?): any;
        scaleTo(propScale: number, duration: number, easing?:any, onfinish?, onchange?): any;
        fadeTo(alpha: number, duration: number, easing?: any, onfinish?, onchange?): any;
        rotateTo(angle: number, duration: number, easing?: any, onfinish?, onchange?): any;
        removeTweens(): void;
        safeRemove(): void;
        setResizePosition(x: number, y: number, leftAnchor: string, topAnchor: string, absolute?: boolean): void;
        setRelativePosition(x: number, y: number, leftAnchor?: string, topAnchor?: string, absolute?: boolean): void;
        getAbsolutePosition(): any;
        setAbsolutePosition(x: number, y: number): void;
    }
}

declare module "*.json" {
    const value: any;
    export default value;
}
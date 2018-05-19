import { DisplayObject } from "pixi.js";
import * as TWEEN from "tween.js";
import TweenManager, { ExtendedTween } from "./TweenExtensions";
import GU from "./GameUtils";


DisplayObject.prototype.shiftTo = function (x: number, y: number, duration: number, easing?: any, onfinish?, onchange?) {
	const pos = {x: this.x, y: this.y};
	const tween = new ExtendedTween(pos);
	tween.to({
				x: x,
				y: y
			}, duration)
			.onUpdate(() => {
				this.position.set(pos.x, pos.y);
				if (typeof onchange == "function") onchange(tween);
			});

	tween.obj = this;
	if (easing) tween.easing(easing);
	if (typeof onfinish == "function") tween.onComplete(onfinish);

	return tween.start();
};

DisplayObject.prototype.scaleTo = function (propScale: number, duration: number, easing?:any, onfinish?, onchange?) {
	const pos = {scaleX: this.scale.x, scaleY: this.scale.y};
	const tween = new ExtendedTween(pos);
	tween.to({scaleX: propScale, scaleY: propScale}, duration)
		.onUpdate(() => {
			this.scale.set(pos.scaleX, pos.scaleY);
			if (typeof onchange == "function") onchange(tween);
		});

	tween.obj = this;
	if (easing) tween.easing(easing);
	if (typeof onfinish == "function") tween.onComplete(onfinish);

	return tween.start();
};

DisplayObject.prototype.fadeTo = function (alpha: number, duration: number, easing?: any, onfinish?, onchange?) {
	const pos = {alpha: this.alpha};
	const tween = new ExtendedTween(pos);
	tween.to({alpha: alpha}, duration)
		.onUpdate(() => {
			this.alpha = pos.alpha;
			if (typeof onchange == "function") onchange(tween);
		});

	tween.obj = this;
	if (easing) tween.easing(easing);
	if (typeof onfinish == "function") tween.onComplete(onfinish);

	return tween.start();
};

DisplayObject.prototype.rotateTo = function (angle: number, duration: number, easing?: any, onfinish?, onchange?) {
	const pos = {angle: this.rotation};
	const tween = new ExtendedTween(pos);
	tween.to({angle: angle}, duration)
		.onUpdate(() => {
			this.rotation = pos.angle;
			if (typeof onchange == "function") onchange(tween);
		});

	tween.obj = this;
	if (easing) tween.easing(easing);
	if (typeof onfinish == "function") tween.onComplete(onfinish);

	return tween.start();
};

DisplayObject.prototype.removeTweens = function () {
	const tweens = TWEEN.getAll();
	for (let i = tweens.length - 1; i >= 0; i--) {
		const t = tweens[i];
		if (t["obj"] === this) TweenManager.destroy(t);
	}
};

DisplayObject.prototype.safeRemove = function () {
	for (let child of this.children) {
		child.safeRemove();
	}

	if (this.parent && this.parent.children) { // FIXME children check to fix PIXI 4.0.3 bug
		this.parent.removeChild(this);
	}
	this.removeTweens();
};

DisplayObject.prototype.setResizePosition = function (x: number, y: number, leftAnchor: string, topAnchor: string, absolute?: boolean) {
	this._rezizeProps = [x, y, leftAnchor, topAnchor, absolute];
	this.setRelativePosition(...this._rezizeProps);
	this.on("resize", () => this.setRelativePosition(...this._rezizeProps));
};

DisplayObject.prototype.setRelativePosition = function (x: number = 0, y: number = 0, leftAnchor?: string, topAnchor?: string, absolute?: boolean) {
	if (!this.parent && !absolute) {
		this.position.set(x, y);
		console.warn("No parent for setRelativePosition");
		return;
	}

	const screen = GU.gameResolution();
	const width = screen[0];
	const height = screen[1];

	let xPos = 0;
	let yPos = 0;

	switch (leftAnchor) {
		case "left":
			xPos = absolute ? x: -this.parent.width/2 + x;
			break;

		case "right":
			xPos = absolute ? width - x: this.parent.width/2 - x;
			break;

		default:
			xPos = absolute ? width/2 + x: x;
	}

	switch (topAnchor) {
		case "top":
			yPos = absolute ? y: -this.parent.height/2 + y;
			break;

		case "bottom":
			yPos = absolute ? height - y: this.parent.height/2 - y;
			break;

		default:
			yPos = absolute ? height/2 + y: y;
	}

	if (absolute) {
		this.setAbsolutePosition(xPos, yPos);
	} else {
		this.position.set(xPos, yPos);
	}
};

// Fix for getGlobalPosition() bug
DisplayObject.prototype.getAbsolutePosition = function () {
	let point = {x: this.x, y: this.y};
	let nextParent = this.parent;

	while (nextParent) {
		point.x += nextParent.x;
		point.y += nextParent.y;

		nextParent = nextParent.parent;
	}

	return point;
};

DisplayObject.prototype.setAbsolutePosition = function (x: number = 0, y: number = 0) {
	const globPosition = this.getAbsolutePosition();
	this.position.set(
		this.x + x - globPosition.x,
		this.y + y - globPosition.y
	);

	if (!this.parent) console.warn("USE 'setAbsolutePosition' AFTER SETTING DisplayObject's PARENT");
};

export default function () {};
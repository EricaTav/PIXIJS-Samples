interface RectangleParams {
	color?: number | string
	w: number
	h: number
	lineWidth?: number
	lineColor?: number | string
	lineAlpha?: number
	rounded?: boolean
	radius?: number
	alpha?: number
	shapeAlpha?: number
	x?: number
	y?: number
}

export default class Rectangle extends PIXI.Graphics {
	constructor (params: RectangleParams = {color: 0xffffff, w: 40, h: 20, lineWidth: 1, lineColor: 0x000000}) {
		super();

		this.init(params);
	}

	private init (params) {
		let {
			color,
			lineWidth = 1,
			lineColor,
			w,
			h,
			rounded = false,
			radius = 10,
			alpha = 1,
			shapeAlpha = 1,
			x = 0,
			y = 0
		} = params;

		if (typeof color !== "undefined") this.beginFill(color);
		this.lineStyle(lineWidth, lineColor, alpha);
		this.alpha = shapeAlpha;

		rounded ? this.drawRoundedRect(x - w/2, y - h/2, w, h, radius): this.drawRect(x - w/2, y - h/2, w, h);

	}

}
import GameController from "../app/GameController";


const GU = {

	gameResolution () {
		const gameResolution = GameController.isMobile ? [750, 1118]: [960, 540];

		const gameResCoef = gameResolution[0] / gameResolution[1];
		const windowResCoef = window.innerWidth / window.innerHeight;

		const coef = windowResCoef < gameResCoef ?
		gameResolution[0] / window.innerWidth:
		gameResolution[1] / window.innerHeight;

		return gameResolution;

	},
	isMobile(){
		return PIXI.utils.isMobile.any;
	},
	createTexture (displayObject, scaleMode: number = 1, resolution: number = PIXI.settings.RESOLUTION) {

		if ("generateCanvasTexture" in displayObject) {
			return displayObject.generateCanvasTexture(scaleMode,resolution);
		} else {
			return GameController.gameApp.renderer.generateTexture(displayObject, scaleMode, resolution);
		}

	},
	refreshGameRenderer () {
		GameController.gameApp.createRenderer();
		GU.resizeWindow();

		const stage = GameController.getStage();
		if (stage) stage.emit("resize");
	},

	resizeWindow () {
		const renderer = GameController.gameApp.renderer;
		const rendererSize = [renderer.width, renderer.height];

		let ratio = rendererSize[0] / rendererSize[1];
		let w, h;

		if (window.innerWidth / window.innerHeight >= ratio) {
			w = window.innerHeight * ratio;
			h = window.innerHeight;
		} else {
			w = window.innerWidth;
			h = window.innerWidth / ratio;
		}

		if (renderer) {
			renderer.view.style.width = w + 'px';
			renderer.view.style.height = h + 'px';
		}
	},

	pickRandom (arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	},
	randomInt (bottomValue, topValue) {
		return bottomValue + Math.round(Math.random() * (topValue - bottomValue));
	},
	showText (params) {
		const {
			text, font, size, style, color, align, valign, x = 0, y = 0,
			parent
		} = params;

		const txt = new PIXI.Text(text + "", {
			fontStyle : style || "normal",
			fontFamily : font || "Arial",
			fontSize: size || 24,
			fill : color || 0x000000,
			align : align || 'center',
		});

		txt.anchor.set(
			align == "left" ? 0 : (align == "right" ? 1: 0.5),
			valign == "top" ? 0 : (valign == "bottom" ? 1: 0.5)
		);

		txt.position.set(x, y);

		return parent ? parent.addChild(txt): txt;
	},


	getCookie (name) {
		let ret;

		try {
			ret = window.localStorage.getItem(name);
		} catch(e) {
			let prefix = name + "=";
			let cookieStartIndex = document.cookie.indexOf(prefix);
			if (cookieStartIndex == -1) return null;
			let cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
			if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;
			ret = decodeURIComponent(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
		}

		return ret;
	},

	loadJSON (filePath, callback) {
		let xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', filePath, true);
		xobj.onreadystatechange = () => {
			if (xobj.readyState == 4 && xobj.status == 200) {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	},

	getTexture (name) {
		return PIXI.utils.TextureCache[name];
	},

	safeRemove (displayObject) {
		const hasParent = !!displayObject.parent;
		hasParent ? displayObject.parent.removeChild(displayObject): displayObject.destroy();
	}

};

export default GU;

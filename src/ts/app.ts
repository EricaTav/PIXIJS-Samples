import GC from "./app/GameController";

import PixiExtensions from "./utils/PixiExtensions";
PixiExtensions();

window.addEventListener("load", GC.start);

declare var global: any;

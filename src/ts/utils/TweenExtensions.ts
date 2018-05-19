import * as TWEEN from "tween.js";

const TweenManager = {

    expiredTweens: [],

    removeExpired () {
        this.expiredTweens.forEach(t => TWEEN.remove(t));
        this.expiredTweens = [];
    },

    destroy (tween: TWEEN.Tween) {
        this.expiredTweens.push(tween);
    }

};

export default TweenManager;

export class ExtendedTween extends TWEEN.Tween {

    public obj: any;

}
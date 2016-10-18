'use strict';

/**
 *  Easing Formula taken from: http://gizma.com/easing
 *
 *  currentFrame = current frame
 *  startValue = start value
 *  endValue = end value
 *  totalFrames = total frame
 *  
 */
    


var EXPORTS = module.exports = {
        // simple linear tweening - no easing, no acceleration
        linear: linearTween,
        
        //  quadratic easing in - accelerating from zero velocity
        easeIn: easeInQuad,
        easeInQuad: easeInQuad,

        // quadratic easing out - decelerating to zero velocity
        easeOut: easeOutQuad,
        easeOutQuad: easeOutQuad,
        
        // quadratic easing in/out - acceleration until halfway,
        //                                  then deceleration
        easeInOut: easeInOutQuad,
        easeInOutQuad: easeInOutQuad,
        
        // cubic easing in - accelerating from zero velocity
        easeInCubic: easeInCubic,
        
        // cubic easing out - decelerating to zero velocity
        easeOutCubic: easeOutCubic,
        
        // cubic easing in/out - acceleration until halfway, then deceleration
        easeInOutCubic: easeInOutCubic,
        
        // quartic easing in - accelerating from zero velocity
        easeInQuart: easeInQuart,
        
        // quartic easing out - decelerating to zero velocity
        easeOutQuart: easeOutQuart,
        
        // quartic easing in/out - acceleration until halfway, then deceleration
        easeInOutQuart: easeInOutQuart,

        // quintic easing in - accelerating from zero velocity
        easeInQuint: easeInQuint,
        
        // quintic easing out - decelerating to zero velocity
        easeOutQuint: easeOutQuint,

        // quintic easing in/out - acceleration until halfway, then deceleration
        easeInOutQuint: easeInOutQuint,

		// sinusoidal easing in - accelerating from zero velocity
        easeInSine: easeInSine,	

        // sinusoidal easing out - decelerating to zero velocity
        easeOutSine: easeOutSine,		

        // sinusoidal easing in/out - accelerating until halfway,
        //          then decelerating
        easeInOutSine: easeInOutSine,
        
        // exponential easing in - accelerating from zero velocity
        easeInExpo: easeInExpo,

        // exponential easing out - decelerating to zero velocity
        easeOutExpo: easeOutExpo,
        

        // exponential easing in/out - accelerating until halfway,
        //                      then decelerating
        easeInOutExpo: easeInOutExpo,
        
        // circular easing in - accelerating from zero velocity
        easeInCirc: easeInCirc,
        
        // circular easing out - decelerating to zero velocity
        easeOutCirc: easeOutCirc,
        
        // circular easing in/out - acceleration until halfway,
        //                      then deceleration
        easeInOutCirc: easeInOutCirc
        
    };
    
// simple linear tweening - no easing, no acceleration
function linearTween(currentFrame, startValue, endValue, totalFrames) {
	return endValue *
                currentFrame / totalFrames + startValue;
}

//  quadratic easing in - accelerating from zero velocity
function easeInQuad(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
	return endValue * currentFrame * currentFrame + startValue;
}

// quadratic easing out - decelerating to zero velocity
function easeOutQuad(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
	return -endValue * currentFrame * (currentFrame-2) + startValue;
}

		

// quadratic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuad(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames / 2;
    
	if (currentFrame < 1) {
        return endValue / 2 * currentFrame * currentFrame + startValue;
    }
    
	currentFrame--;
	return -endValue / 2 *
                (currentFrame * (currentFrame - 2) - 1) + startValue;
}


// cubic easing in - accelerating from zero velocity
function easeInCubic(currentFrame, startValue, endValue, totalFrames) {
    
	currentFrame /= totalFrames;
    
	return endValue * currentFrame * currentFrame * currentFrame + startValue;
}

		

// cubic easing out - decelerating to zero velocity
function easeOutCubic(currentFrame, startValue, endValue, totalFrames) {
    
	currentFrame /= totalFrames;
	currentFrame--;
	return endValue *
                (currentFrame * currentFrame * currentFrame + 1) +
                startValue;
}

		

// cubic easing in/out - acceleration until halfway, then deceleration
function easeInOutCubic(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames / 2;
    
	if (currentFrame < 1) {
        return endValue / 2 *
                currentFrame * currentFrame * currentFrame + startValue;
    }
    
	currentFrame -= 2;
	return endValue / 2 *
            (currentFrame * currentFrame * currentFrame + 2) + startValue;
}
	

// quartic easing in - accelerating from zero velocity
function easeInQuart(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
    
	return endValue *
            currentFrame * currentFrame * currentFrame * currentFrame +
            startValue;
}

		

// quartic easing out - decelerating to zero velocity
function easeOutQuart(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
	currentFrame--;
    
	return -endValue *
            (currentFrame * currentFrame * currentFrame * currentFrame - 1) +
            startValue;
}

		

// quartic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuart(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames / 2;
    
	if (currentFrame < 1) {
        return endValue / 2 *
                    currentFrame * currentFrame * currentFrame * currentFrame +
                    startValue;
    }
    
	currentFrame -= 2;
	return -endValue / 2 *
            (currentFrame * currentFrame * currentFrame * currentFrame - 2) +
            startValue;
}


// quintic easing in - accelerating from zero velocity
function easeInQuint(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
    
	return endValue *
            currentFrame * currentFrame * currentFrame *
            currentFrame * currentFrame + startValue;
}

		

// quintic easing out - decelerating to zero velocity
function easeOutQuint(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
	currentFrame--;
    
	return endValue *
                (currentFrame * currentFrame * currentFrame *
                 currentFrame * currentFrame + 1) + startValue;
}

		

// quintic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuint(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames / 2;
    
	if (currentFrame < 1) {
        
        return endValue / 2 *
                currentFrame * currentFrame * currentFrame *
                currentFrame * currentFrame + startValue;
    }
    
	currentFrame -= 2;
	return endValue / 2 *
            (currentFrame * currentFrame * currentFrame *
                currentFrame * currentFrame + 2) + startValue;
}
		

// sinusoidal easing in - accelerating from zero velocity
function easeInSine(currentFrame, startValue, endValue, totalFrames) {
    var M = Math;
    
	return -endValue *
            M.cos(currentFrame / totalFrames * (M.PI / 2)) +
            endValue + startValue;
}

		

// sinusoidal easing out - decelerating to zero velocity
function easeOutSine(currentFrame, startValue, endValue, totalFrames) {
    var M = Math;
    
	return endValue *
            M.sin(currentFrame / totalFrames * (M.PI / 2)) + startValue;
}

		

// sinusoidal easing in/out - accelerating until halfway, then decelerating
function easeInOutSine(currentFrame, startValue, endValue, totalFrames) {
    var M = Math;
    
	return -endValue / 2 *
            (M.cos(M.PI * currentFrame / totalFrames) - 1) + startValue;
}

		

// exponential easing in - accelerating from zero velocity
function easeInExpo(currentFrame, startValue, endValue, totalFrames) {
	return endValue *
            Math.pow(2, 10 * (currentFrame / totalFrames - 1)) + startValue;
}

		

// exponential easing out - decelerating to zero velocity
function easeOutExpo(currentFrame, startValue, endValue, totalFrames) {
	return endValue *
            (-Math.pow(2, -10 * currentFrame / totalFrames ) + 1) + startValue;
}

		

// exponential easing in/out - accelerating until halfway, then decelerating
function easeInOutExpo(currentFrame, startValue, endValue, totalFrames) {
    var M = Math;
    
	currentFrame /= totalFrames / 2;
    
	if (currentFrame < 1) {
        return endValue / 2 * M.pow(2, 10 * (currentFrame - 1)) + startValue;
    }
	currentFrame--;
    
	return endValue / 2 * (-M.pow(2, -10 * currentFrame) + 2) + startValue;
}
		

// circular easing in - accelerating from zero velocity
function easeInCirc(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
    
	return -endValue *
            (Math.sqrt(1 - currentFrame * currentFrame) - 1) + startValue;
}

		

// circular easing out - decelerating to zero velocity
function easeOutCirc(currentFrame, startValue, endValue, totalFrames) {
	currentFrame /= totalFrames;
	currentFrame--;
    
	return endValue * Math.sqrt(1 - currentFrame * currentFrame) + startValue;
}

		

// circular easing in/out - acceleration until halfway, then deceleration
function easeInOutCirc(currentFrame, startValue, endValue, totalFrames) {
    var M = Math;
    
	currentFrame /= totalFrames / 2;
	if (currentFrame < 1) {
        return -endValue / 2 *
                    (M.sqrt(1 - currentFrame * currentFrame) - 1) + startValue;
    }
	currentFrame -= 2;
	return endValue / 2 *
                (M.sqrt(1 - currentFrame * currentFrame) + 1) + startValue;
}


module.exports = EXPORTS;
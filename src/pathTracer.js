import * as PIXI from 'pixi.js'
import { cubicInterpolation } from './util/interpolation.js';


/* The image file that will determine how the trace looks */
const TRAIL_TEXTURE = PIXI.Texture.from('img/trail.png');

/* history size determines the maximum number of points to keep track of. */
const HISTORY_SIZE = 5000;

/**
 * The rope size determines how many points will actually be drawn.
 * Additional points are interpolated to produce a smoother line. A modest
 * multiple of the history size keeps the curve smooth without spending a large
 * amount of per-frame work interpolating points that are visually redundant.
 */
const ROPE_SIZE = Math.floor(HISTORY_SIZE * 2);


/**
 * Path Tracer traces the path of the planet in the simulation. This module
 * encapsulates the logic of the tracer so that it is easier to use
 * in the OrbitView.
 */
export default class PathTracer {

    constructor(pathLength) {
        this.historyX = [];
        this.historyY = [];
        this.points = [];

        for (let i = 0; i < HISTORY_SIZE; i++) {
            this.historyX.push(0);
            this.historyY.push(0);
        }

        for (let i = 0; i < ROPE_SIZE; i++) {
            this.points.push(new PIXI.Point(0, 0));
        }

        this.rope = new PIXI.SimpleRope(TRAIL_TEXTURE, this.points);
        this.setPathLength(pathLength);
        this.rope.blendmode = PIXI.BLEND_MODES.ADD;
    }

    getPixiObject() {
        return this.rope;
    }

    setPathLength(pathLength) {
        this.rope.size = Math.floor((ROPE_SIZE - 1) * pathLength) + 1;
    }

    /**
     * Clearing the tracer line requires setting all of the points to a single
     * location. Provide that location (which should be the current location of
     * the planet).
     */
    clear(x, y) {
        for (let i = 0; i < HISTORY_SIZE; i++) {
            this.historyX[i] = x;
            this.historyY[i] = y;
        }
        for (let i = 0; i < ROPE_SIZE; i++) {
            this.points[i].set(x, y);
        }
    }

    /**
     * Adds a new position value to the planet tracing history, allowing the tracer
     * line to continue following the planet on the screen. Call this function
     * whenever the planet sprite is moved to a new position.
     */
    addLocation(x, y) {
        if (this.historyX.length >= HISTORY_SIZE) {
            this.historyX.pop();
        }
        this.historyX.unshift(x);
        if (this.historyY.length >= HISTORY_SIZE) {
            this.historyY.pop();
        }
        this.historyY.unshift(y);
        this._updateRopePoints();
    }

    _updateRopePoints() {
        for (let i = 0; i < ROPE_SIZE; i++) {
            const p = this.points[i];

            // Smooth the curve with cubic interpolation to prevent sharp edges.
            const ix = cubicInterpolation(this.historyX, i / ROPE_SIZE * HISTORY_SIZE);
            const iy = cubicInterpolation(this.historyY, i / ROPE_SIZE * HISTORY_SIZE);

            p.x = ix;
            p.y = iy;
        }
    }
}

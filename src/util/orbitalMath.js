/**
 * Pure geometry helpers shared by the simulation views. Kept free of any
 * rendering dependencies so they can be reused and unit tested in isolation.
 */

/**
 * Converts an ecliptic longitude (in degrees) to an x pixel location along the
 * Zodiac strip of the given width. The strip wraps around 360 degrees, with
 * 0 degrees placed so that the constellations line up with the orbit view.
 *
 * @param {Number} longitude longitude in degrees (may be negative)
 * @param {Number} width width of the strip in pixels
 * @return {Number} x pixel location in the range [0, width)
 */
export function longitudeToLocationX(longitude, width) {
    let x = longitude < 0 ? longitude + 360 : longitude;
    x = (x + 90) % 360;
    x = -x + 360;
    return width * x / 360;
}

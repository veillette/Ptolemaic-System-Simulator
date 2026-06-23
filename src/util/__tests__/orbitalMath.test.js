import { longitudeToLocationX } from '../orbitalMath.js';

const WIDTH = 800;

describe('longitudeToLocationX', () => {
    test('maps a 0 degree longitude to the expected location', () => {
        // 0 -> (0 + 90) % 360 = 90 -> -90 + 360 = 270 -> 800 * 270 / 360 = 600
        expect(longitudeToLocationX(0, WIDTH)).toBeCloseTo(600);
    });

    test('handles negative longitudes by wrapping into [0, 360)', () => {
        // -90 and 270 describe the same direction and must map to the same x
        expect(longitudeToLocationX(-90, WIDTH)).toBeCloseTo(longitudeToLocationX(270, WIDTH));
    });

    test('always returns a location within the strip width', () => {
        for (let deg = -360; deg <= 360; deg += 17) {
            const x = longitudeToLocationX(deg, WIDTH);
            expect(x).toBeGreaterThanOrEqual(0);
            expect(x).toBeLessThanOrEqual(WIDTH);
        }
    });

    test('scales linearly with the supplied width', () => {
        expect(longitudeToLocationX(45, 360) * 2).toBeCloseTo(longitudeToLocationX(45, 720));
    });
});

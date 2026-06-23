import { clipInput, getTangent, cubicInterpolation } from '../interpolation.js';

describe('clipInput', () => {
    const arr = [10, 20, 30];

    test('returns the element at a valid index', () => {
        expect(clipInput(1, arr)).toBe(20);
    });

    test('clamps negative indices to the first element', () => {
        expect(clipInput(-5, arr)).toBe(10);
    });

    test('clamps out-of-range indices to the last element', () => {
        expect(clipInput(99, arr)).toBe(30);
    });
});

describe('getTangent', () => {
    test('is the scaled central difference of the neighbours', () => {
        const arr = [0, 10, 30];
        // factor * (arr[2] - arr[0]) / 2 = 1 * (30 - 0) / 2
        expect(getTangent(1, 1, arr)).toBe(15);
    });
});

describe('cubicInterpolation', () => {
    const arr = [0, 10, 20, 30];

    test('passes exactly through the sample points at integer t', () => {
        expect(cubicInterpolation(arr, 0)).toBeCloseTo(0);
        expect(cubicInterpolation(arr, 1)).toBeCloseTo(10);
        expect(cubicInterpolation(arr, 2)).toBeCloseTo(20);
        expect(cubicInterpolation(arr, 3)).toBeCloseTo(30);
    });

    test('produces an intermediate value between two samples', () => {
        const v = cubicInterpolation(arr, 1.5);
        expect(v).toBeGreaterThan(10);
        expect(v).toBeLessThan(20);
    });

    test('defaults the tangent factor to 1 when omitted', () => {
        expect(cubicInterpolation(arr, 1.5)).toBeCloseTo(cubicInterpolation(arr, 1.5, 1));
    });
});

import {rand} from '../../../../src/common/scripts/utilities/math';

describe('Math utilities', () => {

    describe('rand', () => {

        it('flot should generate a random floating number within range', () => {
            let min = 2;
            let max = 6;
            let num = rand.flot(min, max);
            expect(num).toEqual(jasmine.any(Number));
            expect(num % 1 !== 0).toEqual(true);
            expect(num >= min && num < max).toEqual(true);
        });

        it('int should generate a random integer within range', () => {
            let min = 3;
            let max = 9;
            let num = rand.int(min, max);
            expect(num).toEqual(jasmine.any(Number));
            expect(num % 1 === 0).toEqual(true);
            expect(num >= min && num <= max).toEqual(true);
        });

    });
});

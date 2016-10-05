import * as func from '../../../../src/common/scripts/utilities/func';

describe('Function utilities', () => {

    const add3Numbers = (a, b, c) => a + b + c;
    const partialAdd3Numbers = func.partial(add3Numbers);
    const curriedAdd3Numbers = func.curry(add3Numbers);
    const pow = func.partialRight(Math.pow);

    it('partialRight should partially apply arguments from right', () => {
        const toThePowerOf2 = pow(2);
        expect(toThePowerOf2(3)).toEqual(9);
    });

    it('partial should partially apply arguments', () => {
        expect(partialAdd3Numbers()(1, 2, 3) === partialAdd3Numbers(1)(2, 3)).toEqual(true);
        expect(partialAdd3Numbers(1, 2)(3) === partialAdd3Numbers(1, 2, 3)()).toEqual(true);
    });

    it('curry should break down a function into multiple function calls', () => {
        expect(curriedAdd3Numbers(1, 2, 3) === curriedAdd3Numbers(1)(2)(3)).toEqual(true);
        expect(curriedAdd3Numbers(1, 2)(3) === curriedAdd3Numbers(1)(2, 3)).toEqual(true);
        expect(curriedAdd3Numbers()(1)(2)()()(3) === curriedAdd3Numbers()()(1)()(2, 3)).toEqual(true);
    });

    it('compose should compose functions', () => {
        const ƒ = func.compose(
            Math.sqrt,
            curriedAdd3Numbers(5, 6),
            pow(2)
        );
        expect(ƒ(5)).toEqual(6);
    });

    it('pipe should pipe functions', () => {
        const ƒ = func.pipe(
            pow(2),
            curriedAdd3Numbers(5, 6),
            Math.sqrt
        );
        expect(ƒ(5)).toEqual(6);
    });

});

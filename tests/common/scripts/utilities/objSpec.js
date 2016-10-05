import * as obj from '../../../../src/common/scripts/utilities/obj';

describe('Object utilities', () => {

    let testArr = [0, 1, true, 'three', 4, [5, 6], {key: 'value'}];
    let testObj = {
        arr: [0, 1, true, 'three', 4, [5, 6], {key: 'value'}],
        deep: {
            arr: [0, 1, true, 'three', 4, [5, 6], {key: 'value'}]
        }
    };

    it('isObj shoud check if argument is an object', () => {
        expect(obj.isObj()).toBe(false);
        expect(obj.isObj(undefined)).toBe(false);
        expect(obj.isObj(true)).toBe(false);
        expect(obj.isObj(null)).toBe(false);
        expect(obj.isObj(1)).toBe(false);
        expect(obj.isObj('1')).toBe(false);
        expect(obj.isObj(function() {})).toBe(false);
        expect(obj.isObj([])).toBe(false);
        expect(obj.isObj({})).toBe(true);
    });

    it('clone shoud deep copy an array', () => {
        let cloned = obj.clone(testArr);
        // array slice for cloning an array works correctly
        // if the array contains only primitives
        let sliced = testArr.slice();
        expect(testArr === cloned).toBe(false);
        expect(testArr === sliced).toBe(false);

        // in the cloned array every item is a new value
        cloned[6].key = 'changed value';
        expect(testArr[6].key === 'value').toBe(true);
        expect(testArr[6].key === cloned[6].key).toBe(false);

        // but in the sliced array non primitives are just references and can be overwritten
        sliced[6].key = 'changed value';
        expect(testArr[6].key === 'value').toBe(false);
        expect(testArr[6].key === sliced[6].key).toBe(true);

    });

    it('clone shoud deep copy an object', () => {
        let cloned = obj.clone(testObj);
        expect(testObj === cloned).toBe(false);
        cloned.arr[6].key = 'changed value';
        expect(testObj.arr[6].key === 'value').toBe(true);
        expect(testObj.arr[6].key === cloned.arr[6].key).toBe(false);
    });

    it('setProp should set and getProp should get object properties from dot separated string', () => {

        const newObj = obj.setProp(testObj, 'deep.level.prop', 10);

        const deep = obj.getProp(newObj, 'deep');
        const level = obj.getProp(newObj, 'deep.level');
        const prop = obj.getProp(newObj, 'deep.level.prop');

        expect(deep).toEqual({arr: [0, 1, true, 'three', 4, [5, 6], {key: 'value'}], level: {prop: 10}});
        expect(level).toEqual({prop: 10});
        expect(prop).toEqual(10);

    });

    it('getProp should return undefined instead of throwing an error for non existing namespace', () => {
        sinon.spy(obj, 'getProp');
        const notExists = obj.getProp(testObj, 'name');
        const notExistsLong = obj.getProp(testObj, 'there.is.no.prop.here');
        expect(notExists).toEqual(undefined);
        expect(notExistsLong).toEqual(undefined);
        expect(obj.getProp.threw()).toBe(false);
    });
});

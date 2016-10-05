import {sortObjects} from '../../../../src/common/scripts/utilities/arr';

describe('Array utilities', () => {

    describe('sortObjects', () => {

        const testArr = [
            {id: 1, name: 'abc'},
            {id: 20, name: 'jkl'},
            {id: 10, name: 'ghi'},
            {id: 2, name: 'def'}
        ];

        it('should sort array of objects upon a given property as numbers ascending', () => {
            expect(testArr.sort(sortObjects('asc', 'id'))).toEqual([
                {id: 1, name: 'abc'},
                {id: 2, name: 'def'},
                {id: 10, name: 'ghi'},
                {id: 20, name: 'jkl'}
            ]);
        });

        it('should sort array of objects upon a given property as numbers descending', () => {
            expect(testArr.sort(sortObjects('desc', 'id'))).toEqual([
                {id: 20, name: 'jkl'},
                {id: 10, name: 'ghi'},
                {id: 2, name: 'def'},
                {id: 1, name: 'abc'}
            ]);
        });

        it('should sort array of objects upon a given property as numbers converted to string ascending', () => {
            expect(testArr.sort(sortObjects('asc', 'id', str => str.toString()))).toEqual([
                {id: 1, name: 'abc'},
                {id: 10, name: 'ghi'},
                {id: 2, name: 'def'},
                {id: 20, name: 'jkl'}
            ]);
        });

        it('should sort array of objects upon a given property as numbers converted to string descending', () => {
            expect(testArr.sort(sortObjects('desc', 'id', str => str.toString()))).toEqual([
                {id: 20, name: 'jkl'},
                {id: 2, name: 'def'},
                {id: 10, name: 'ghi'},
                {id: 1, name: 'abc'}
            ]);
        });
    });
});

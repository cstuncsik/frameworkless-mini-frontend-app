import eventEmitter from '../../../../src/common/scripts/utilities/eventEmitter';

describe('Event emitter', () => {

    let myModule;

    beforeEach(() => {
        myModule = Object.create(Object.assign({}, eventEmitter()));

        sinon.spy(myModule, 'on');
        sinon.spy(myModule, 'once');
        sinon.spy(myModule, 'off');
        sinon.spy(myModule, 'emit');
    });

    it('should have a "emit" method', () => {
        expect(myModule.emit).toEqual(jasmine.any(Function));
    });

    it('should have a "on" method', () => {
        expect(myModule.on).toEqual(jasmine.any(Function));
    });

    it('should have a "once" method', () => {
        expect(myModule.once).toEqual(jasmine.any(Function));
    });

    it('should have a "off" method', () => {
        expect(myModule.off).toEqual(jasmine.any(Function));
    });

    it('should emit event and call callback', done => {
        const updateCallback = sinon.spy();

        myModule.on('update', updateCallback);

        setTimeout(() => {
            myModule.emit('update', {ids: [1, 2, 3]});
            expect(updateCallback.withArgs({ids: [1, 2, 3]}).called).toBe(true);
            done();
        }, 100);
    });

    it('should emit event and call callback once', done => {
        const updateCallback = sinon.spy();

        myModule.once('update', updateCallback);

        setTimeout(() => {
            myModule.emit('update', {ids: [1, 2, 3]});
            setTimeout(() => {
                myModule.emit('update', {ids: [1, 2, 3]});
                expect(updateCallback.withArgs({ids: [1, 2, 3]}).calledOnce).toBe(true);
                done();
            }, 100);
        }, 100);
    });

    it('should remove a callback', done => {
        const updateCallback1 = sinon.spy();
        const updateCallback2 = sinon.spy();

        myModule.on('update', updateCallback1);
        myModule.on('update', updateCallback2);

        setTimeout(() => {
            myModule.emit('update', {ids: [1, 2, 3]});
            myModule.off('update', updateCallback1);
            setTimeout(()=> {
                myModule.emit('update', {ids: [1, 2, 3]});
                expect(updateCallback1.withArgs({ids: [1, 2, 3]}).calledOnce).toBe(true);
                expect(updateCallback2.withArgs({ids: [1, 2, 3]}).calledTwice).toBe(true);
                done();
            }, 100);
        }, 100);
    });

    it('should remove all callbacks', done => {
        const updateCallback1 = sinon.spy();
        const updateCallback2 = sinon.spy();
        const updateCallback3 = sinon.spy();

        myModule.on('update', updateCallback1);
        myModule.on('update', updateCallback2);
        myModule.on('update', updateCallback3);

        setTimeout(() => {
            myModule.emit('update', {ids: [1, 2, 3]});
            myModule.off('update');
            setTimeout(() => {
                myModule.emit('update', {ids: [1, 2, 3]});
                expect(updateCallback1.withArgs({ids: [1, 2, 3]}).calledOnce).toBe(true);
                expect(updateCallback2.withArgs({ids: [1, 2, 3]}).calledOnce).toBe(true);
                expect(updateCallback3.withArgs({ids: [1, 2, 3]}).calledOnce).toBe(true);
                done();
            }, 100);
        }, 100);
    });

});

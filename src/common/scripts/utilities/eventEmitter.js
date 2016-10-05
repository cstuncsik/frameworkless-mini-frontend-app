import {partial, partialRight} from './func';

const on = (listeners, type, listener, once) => {
    if (!listeners[type]) {
        listeners[type] = [];
    }
    if (listeners[type].indexOf(listener) < 0) {
        listener.once = once;
        listeners[type].push(listener);
    }
};

const once = partialRight(on)(true);

const off = (listeners, type, listener) => {
    const listenerType = listeners[type];
    if (listenerType && listenerType.length) {
        const index = listenerType.indexOf(listener);
        if (index !== -1) {
            listenerType.splice(index, 1);
        }
    }
    if ((listenerType && !listenerType.length) || !listener) {
        delete listeners[type];
    }
};

const emit = (listeners, type, ...data) => {
    if (listeners[type]) {
        listeners[type].forEach(listener => {
            listener.apply(null, data);
            if (listener.once) {
                off(listeners, type, listener);
            }
        });
    }
};

export default () => {
    const listeners = {};
    return {
        on: partial(on)(listeners),
        once: partial(once)(listeners),
        off: partial(off)(listeners),
        emit: partial(emit)(listeners)
    }
}

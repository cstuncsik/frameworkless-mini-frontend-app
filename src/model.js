import eventEmitter from './common/scripts/utilities/eventEmitter';
import * as obj from './common/scripts/utilities/obj';

let data = {};

const model = Object.create(Object.assign({}, eventEmitter()));

model.set = (nsStr, val) => {
    data = obj.setProp(data, nsStr, val);
    model.emit(nsStr, val);
};

model.get = nsStr => obj.getProp(data, nsStr);

export default model;

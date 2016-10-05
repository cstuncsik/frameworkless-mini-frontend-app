import view from './mediaList.view';
import model from '../../model';
import {curry, pipe} from '../../common/scripts/utilities/func'

const getWatchList = () => JSON.parse(localStorage.getItem('watchList') || '[]');
const addIdToList = curry((id, watchList) => {
    if (watchList.indexOf(id) < 0) {
        watchList.push(id);
    }
    return watchList;
});
const removeIdFromList = curry((id, watchList) => {
    const idx = watchList.indexOf(id);
    if (idx > -1) {
        watchList.splice(idx, 1);
    }
    return watchList;
});
const setWatchList = watchList => localStorage.setItem('watchList', JSON.stringify(watchList));
const addToWatchList = id => pipe(getWatchList, addIdToList(id), setWatchList)();
const removeFromWatchList = id => pipe(getWatchList, removeIdFromList(id), setWatchList)();

view.on('addToWatchList', addToWatchList);
view.on('removeFromWatchList', removeFromWatchList);
model.on('mediaList', view.render);

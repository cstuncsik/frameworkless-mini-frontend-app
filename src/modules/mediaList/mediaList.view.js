import './mediaList.scss';
import tpl from './mediaList.tpl';
import eventEmitter from '../../common/scripts/utilities/eventEmitter';

const view = Object.create(Object.assign({}, eventEmitter()));

const mediaList = document.getElementById('mediaList');

mediaList.addEventListener('click', e => {
    const elem = e.target.parentNode;
    const classes = elem.classList;
    if (classes.contains('watchList')) {
        const id = parseInt(elem.value);
        const listItem = document.getElementById(`media-${id}`);
        if (classes.contains('add')) {
            classes.add('remove');
            classes.remove('add');
            listItem.classList.add('inWatchList');
            view.emit('addToWatchList', id);
        } else {
            classes.add('add');
            classes.remove('remove');
            listItem.classList.remove('inWatchList');
            view.emit('removeFromWatchList', id);
        }
    }
});

view.render = data => mediaList.innerHTML = data.map(item => tpl(item)).join('');

export default view;

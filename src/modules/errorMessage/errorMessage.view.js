import './errorMessage.scss';
import tpl from './errorMessage.tpl';
import eventEmitter from '../../common/scripts/utilities/eventEmitter';

const view = Object.create(Object.assign({}, eventEmitter()));

const errorMessage = document.getElementById('errorMessage');

view.show = error => {
    errorMessage.innerHTML = tpl(error);
    errorMessage.className = 'visible';
};

view.hide = () => errorMessage.className = 'hidden';

export default view;

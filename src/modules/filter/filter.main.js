import model from '../../model';
import view from './filter.view';
import errorMessageView from '../errorMessage/errorMessage.view';
import {sortObjects} from '../../common/scripts/utilities/arr'
import {jsonp} from '../../common/scripts/utilities/remote'

const getWatchList = () => JSON.parse(localStorage.getItem('watchList') || '[]');

const sortData = (data, options) => {
    model.set('mediaList', data.sort(sortObjects(options.order, options.sort, options.transform)));
};

const updateData = options => {
    errorMessageView.hide();
    const watchList = getWatchList();
    const newWatchList = [];
    jsonp({
        url: 'http://beta.json-generator.com/api/json/get/4JbORZDnW'
    }).then(data => {
        const list = data.map(item => {
            if (watchList.indexOf(item.id) > -1) {
                item.isInWatchList = true;
                newWatchList.push(item.id);
            } else {
                item.inWatchList = false;
            }
            return item;
        });
        sortData(list, options);
        localStorage.setItem('watchList', JSON.stringify(newWatchList));
    }).catch(error => errorMessageView.show(error));
};

view.on('update', updateData);
view.on('sorting', options => sortData(model.get('mediaList'), options));
view.init();

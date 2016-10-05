import './filter.scss';
import tpl from './filter.tpl';
import eventEmitter from '../../common/scripts/utilities/eventEmitter';

const view = Object.create(Object.assign({}, eventEmitter()));

const viewModel = {
    polling: [
        {value: 60000, text: '1m', selected: true},
        {value: 30000, text: '30s', selected: false},
        {value: 10000, text: '10s', selected: false},
        {value: 5000, text: '5s', selected: false},
        {value: 3000, text: '3s', selected: false},
        {value: 1000, text: '1s', selected: false}
    ],
    filtering: [
        {value: 'all', text: 'all', selected: true},
        {value: 'liveChannelFilter', text: 'live channel', selected: false},
        {value: 'offlineChannelFilter', text: 'offline channel', selected: false},
        {value: 'videoFilter', text: 'video', selected: false},
        {value: 'watchListFilter', text: 'watch list', selected: false}
    ],
    sorting: [
        {value: 'id', text: 'id', selected: true},
        {value: 'title', text: 'title', selected: false},
        {value: 'description', text: 'description', selected: false},
        {value: 'viewers', text: 'viewers', selected: false}
    ],
    ordering: [
        {value: 'asc', selected: true},
        {value: 'desc', selected: false}
    ]
};

const setListFilterClass = elements => elements.mediaList.className = elements.filtering.value;

const setPollingInterval = (() => {
    let intervalId = null;
    return elements => {
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            view.emit('update', getSortOptions(elements));
        }, elements.polling.value);
    };
})();

const getSortOptions = elements => ({
    sort: elements.sorting.value,
    order: elements.ordering.className,
    transform: ['id', 'viewers'].indexOf(elements.sorting.value) > -1 ? parseInt : str => str.toLowerCase()
});

view.init = () => {
    document.getElementById('filterForm').innerHTML = tpl(viewModel);

    const elements = ['polling', 'filtering', 'sorting', 'ordering', 'mediaList'].reduce((obj, item) => {
        obj[item] = document.getElementById(item);
        return obj;
    }, {});

    elements.filtering.addEventListener('change', () => {
        setListFilterClass(elements);
    });

    elements.polling.addEventListener('change', () => {
        setPollingInterval(elements);
    });

    elements.sorting.addEventListener('change', () => {
        view.emit('sorting', getSortOptions(elements));
    });

    elements.ordering.addEventListener('click', () => {
        elements.ordering.className = elements.ordering.className === 'asc' ? 'desc' : 'asc';
        view.emit('sorting', getSortOptions(elements));
    });

    setListFilterClass(elements);
    setPollingInterval(elements);

    view.emit('update', getSortOptions(elements));
};

export default view;

export default data => `
    <div>
        <label for="polling">Server polling interval: </label>
        <select id="polling">
            ${data.polling.map(item => `<option${item.selected ? ' selected' : ''} value="${item.value}">${item.text}</option>`).join('')}
        </select>
    </div>
    <div>
        <label for="filtering">Filter by type: </label>
        <select id="filtering">
            ${data.filtering.map(item => `<option${item.selected ? ' selected' : ''} value="${item.value}">${item.text}</option>`).join('')}
        </select>
    </div>
    <div>
        <label for="sorting">Sort by: </label>
        <select id="sorting">
            ${data.sorting.map(item => `<option${item.selected ? ' selected' : ''} value="${item.value}">${item.text}</option>`).join('')}
        </select>
        <button id="ordering" class="${data.ordering.filter(item => item.selected)[0].value}"></button>
    </div>`;

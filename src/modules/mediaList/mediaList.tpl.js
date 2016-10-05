export default data => `
    <li id="media-${data.id}" class="${data.type}${data.isLive ? ' isLive' : ''}${data.isInWatchList ? ' inWatchList' : ''}">
        <div>
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <picture>
                <img src="${data.picture}" alt="${data.title} - ${data.description}">        
            </picture>
            <strong>labels: ${data.labels.join(', ')}</strong>
            <span>viewers: ${data.viewers}</span>
            <small>type: ${data.type}</small>
            <small>id: ${data.id}</small>
            ${data.isLive ? '<small>live</small>' : ''}
            <button class="watchList ${data.isInWatchList ? 'remove' : 'add'}" value="${data.id}">
                <span>Add to watch list</span>            
                <span>Remove from watch list</span>            
            </button>
        </div>
    </li>`;

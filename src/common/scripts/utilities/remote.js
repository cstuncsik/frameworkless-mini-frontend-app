import {rand} from './math';

const createJsonpCb = (url, cbName) => {
    const scriptTag = document.createElement('script');
    scriptTag.src = `${url}?callback=${cbName}`;
    scriptTag.async = true;
    document.body.appendChild(scriptTag);
    return scriptTag;
};

const deleteJsonpCb = (cbName, scriptTag) => {
    scriptTag.parentNode.removeChild(scriptTag);
    return delete window[cbName];
};

const jsonp = ({
    url = '',
    timeout = 5000,
    callbackName = `JSONP_CALLBACK_${new Date().getTime()}_${rand.int(1, 1000)}`
} = {}) => new Promise((resolve, reject) => {

    if(!url){
        reject({error: 'no url provided'});
    }

    const script = createJsonpCb(url, callbackName);
    const timeoutId = setTimeout(() => {
        reject({error: `script loading timeout: ${script.src}`});
        deleteJsonpCb(callbackName, script);
    }, timeout);

    script.onerror = () => {
        reject({error: `script loading error: ${script.src}`});
        deleteJsonpCb(callbackName, script);
    };

    window[callbackName] = data => {
        resolve(data);
        deleteJsonpCb(callbackName, script);
        clearTimeout(timeoutId);
    };

});

export {
    jsonp
}

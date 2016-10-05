const sortObjects = (order, prop, transform) => {
    const key = transform ? obj => transform(obj[prop]) : obj => obj[prop];
    const dir = order === 'asc' ? 1 : -1;
    return (a, b) => {
        const x = key(a);
        const y = key(b);
        return (x < y ? -1 : (x > y ? 1 : 0)) * dir;
    }
};

export {sortObjects}

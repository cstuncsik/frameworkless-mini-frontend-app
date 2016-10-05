const flot = (min, max) => Math.random() * (max - min) + min;
const int = (min, max) => flot(min, max + 1) | 0;

export const rand = {
    flot,
    int,
};

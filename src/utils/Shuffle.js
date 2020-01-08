const shuffle = (a) => {
    let b = a.map(i => i);
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
};

export default shuffle;
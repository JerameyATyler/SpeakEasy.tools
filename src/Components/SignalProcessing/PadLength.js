import {mean, median, mode, sqrt, square, sum} from 'mathjs';

export default ({s, length, fill}) => {
    if (s.length >= length) return s;

    const extendFill = (frontPad, backPad) => {
        let dt = [];
        for (let i = 1; i < s.length; i++) {
            dt.push(sqrt(square(s[i] - s[i - 1])) / (s.length - 1))
        }

        const summation = sum(dt);

        let xStart = s[0];
        let xEnd = s[s.length - 1];

        for (let i = 0; i < frontPad; i++) {
            xStart -= summation;
            s.unshift(xStart);
        }
        for (let i = 0; i < backPad; i++) {
            xEnd += summation;
            s.push(xEnd);
        }
        return s;
    };

    const meanFill = (frontPad, backPad) => {
        const m = mean(s);

        return [
            ...Array(frontPad).fill(m),
            ...s,
            ...Array(backPad).fill(m)
        ];
    };

    const medianFill = (frontPad, backPad) => {
        const m = median(s);

        return [
            ...Array(frontPad).fill(m),
            ...s,
            ...Array(backPad).fill(m)
        ];
    };

    const modeFill = (frontPad, backPad) => {
        const m = mode(s);

        return [
            ...Array(frontPad).fill(m),
            ...s,
            ...Array(backPad).fill(m)
        ];
    };

    const zeroFill = (frontPad, backPad) => {
        return [
            ...Array(frontPad).fill(0),
            ...s,
            ...Array(backPad).fill(0)
        ];
    };

    const getPads = () => {
        const lenDiff = Math.floor((length - s.length) / 2);

        const frontPad = lenDiff;
        let backPad = lenDiff;

        if ((length - s.length) % 2 > 0) backPad += 1;

        return [frontPad, backPad];
    };

    const fillEnum = {'mean': meanFill, 'median': medianFill, 'mode': modeFill, 'zero': zeroFill, 'extend': extendFill};
    const [fPad, bPad] = getPads();
    return fillEnum[fill](fPad, bPad);
}
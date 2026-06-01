function pipe(...fns) {
    return value => fns.reduce((acc, fn) => fn(acc), value);
}

function memoize(fn) {
    const cache = {};
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache[key]) return cache[key];
        return cache[key] = fn(...args);
    };
}

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

async function retry(fn, maxAttempts = 3) {
    let error;
    for (let i = 1; i <= maxAttempts; i++) {
        try {
            return await fn();
        } catch (e) {
            error = e;
        }
    }
    throw error;
}

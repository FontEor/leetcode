function throtte(func, time) {
    let activeTime = 0;
    return () => {
        let current = Date.now();
        if (current - activeTime > time) {
            func.apply(this, arguments);
            activeTime = Date.now();
        }
    }
}
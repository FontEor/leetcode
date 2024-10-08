function getMaxDepth(arr) {
    if (!Array.isArray(arr)) {
        return 0;
    }
    let maxDepth = 0;
    for (const item of arr) {
        const depth = getMaxDepth(item);
        if (depth > maxDepth) {
            maxDepth = depth;
        }
    }
    return maxDepth + 1; // 加1是因为当前层也算深度
}

console.log(getMaxDepth([1,2,3,[4,5,6]]))
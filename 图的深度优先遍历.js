var maxAreaOfIsland = function(grid) {
    let res = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 1) {
                res = Math.max(res, dfs(i, j, grid));
            }
        }
    }
    return res;
};

function dfs(i, j, grid) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[i].length || grid[i][j] == 0) {
        return 0;
    }
    grid[i][j] = 0;
    let num = 1;
    num += dfs(i + 1, j, grid);
    num += dfs(i - 1, j, grid);
    num += dfs(i, j + 1, grid);
    num += dfs(i, j - 1, grid);
    return num;
}
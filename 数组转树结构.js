const arr = [
  {
    id: 0,
    pid: 0,
  },
  {
    id: 1,
    pid: 0,
  },
  {
    id: 2,
    pid: 0,
  },
  {
    id: 3,
    pid: 1,
  },
  {
    id: 4,
    pid: 1,
  },
  {
    id: 5,
    pid: 2,
  },
  {
    id: 6,
    pid: 2,
  },
];

const result = [
  {
    id: 0,
    pid: 0,
    children: [
      {
        id: 1,
        pid: 0,
        children: [
          {
            id: 3,
            pid: 1,
          },
          {
            id: 4,
            pid: 1,
          },
        ],
      },
      {
        id: 2,
        pid: 0,
        children: [
          {
            id: 5,
            pid: 2,
          },
          {
            id: 6,
            pid: 2,
          },
        ],
      },
    ],
  },
];

function tree(arr) {
  const map = {};
  arr.forEach((item) => {
    map[item.id] = item;
  });
  const tree = [];
  arr.forEach((item) => {
    if (item.id === 0) {
      // 如果节点的 pid 为 0，添加到根节点
      tree.push(map[item.id]);
    } else {
      // 否则，将其添加到其父节点的 children 数组中
      const parent = map[item.pid];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(map[item.id]);
      }
    }
  });
  return tree;
}
console.log(JSON.stringify(tree(arr), null, 2));

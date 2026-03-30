# LeetCode 脚手架文档

## 项目概述

`@bobzi/my-lib-leetcode` 是一个用于快速初始化 LeetCode 练习项目的命令行脚手架工具。它可以帮助开发者快速创建基于 Express、Koa 或 Egg 框架的项目模板，同时也包含了丰富的 JavaScript 算法和前端知识点练习代码。

---

## 安装

```bash
# 全局安装
npm install -g @bobzi/my-lib-leetcode

# 或者使用 npx 直接运行
npx leetcli create my-project
```

---

## CLI 命令

### 命令入口

脚手架提供的 CLI 命令名称为 `leetcli`。

### 可用命令

#### 1. 创建项目

```bash
leetcli create [project]
```

**功能描述**：初始化一个新的 LeetCode 项目。

**选项**：
| 选项 | 简写 | 描述 |
|------|------|------|
| `--force` | `-f` | 强制初始化，覆盖已存在的文件 |
| `--help` | `-h` | 显示帮助信息 |

**使用示例**：

```bash
# 创建名为 my-project 的项目
leetcli create my-project

# 强制创建（覆盖已存在的目录）
leetcli create my-project --force
```

**执行流程**：
1. 命令行提示选择框架模板
2. 可选框架：Express、Koa、Egg
3. 从对应的 GitHub 仓库下载模板
4. 显示下载进度和结果状态

#### 2. 帮助命令

```bash
leetcli help [command]
```

**功能描述**：显示命令的帮助信息。

**使用示例**：

```bash
# 显示所有帮助
leetcli help

# 显示特定命令的帮助
leetcli help create
```

---

## 项目结构

```
leetcode/
├── bin/
│   └── leetcli.js          # CLI 入口文件
├── lib/
│   └── core/
│       ├── help.js         # 帮助命令实现
│       ├── init.js         # 初始化命令注册
│       └── initAction.js   # 初始化命令逻辑
├── js/
│   ├── 算法/               # 算法练习
│   ├── promise/            # Promise 相关练习
│   ├── 前端/               # 前端知识点练习
│   └── 类/                 # 类与原型练习
├── html/                   # HTML 示例文件
├── config.js               # 框架配置文件
├── index.js                # 主入口文件
└── package.json            # 项目配置
```

---

## 技术栈

### 核心依赖

| 依赖包 | 版本 | 用途 |
|--------|------|------|
| `commander` | ^14.0.3 | 命令行参数解析与命令管理 |
| `inquirer` | ^13.3.0 | 交互式命令行界面（选择框架） |
| `download-git-repo` | ^3.0.2 | 从 GitHub 下载模板仓库 |
| `chalk` | ^5.6.2 | 终端文字颜色美化 |
| `ora` | ^9.3.0 | 终端加载动画（spinner） |

---

## 核心模块详解

### 1. 命令入口 (`bin/leetcli.js`)

```javascript
#!/usr/bin/env node
import { Command } from "commander";
import helpCommand from "../lib/core/help.js";
import InitCommand from "../lib/core/init.js";

const program = new Command();
helpCommand(program);
InitCommand(program);

program.parse(process.argv);
```

**说明**：
- 使用 `commander` 库创建命令行程序
- 注册 `help` 和 `create` 两个命令
- `#!/usr/bin/env node` 确保可以直接执行

### 2. 帮助命令 (`lib/core/help.js`)

**功能**：
- 无参数时显示全部帮助信息
- 有参数时显示指定命令的详细帮助

### 3. 初始化命令 (`lib/core/init.js` & `initAction.js`)

**执行流程**：
1. 接收项目名称和选项参数
2. 使用 `inquirer` 弹出选择框，让用户选择框架
3. 调用 `downloadFramework` 函数下载对应模板

### 4. 框架配置 (`config.js`)

**支持的框架模板**：

| 框架名称 | GitHub 仓库 |
|----------|-------------|
| Express | `expressjs/express` |
| Koa | `koajs/koa` |
| Egg | `eggjs/egg` |

**下载流程**：
```javascript
export function downloadFramework(answers, project, download) {
  const config = frameworkConfig[answers.framework];
  const spinner = ora(chalk.blue(`Loading ${config.name}...`)).start();

  download(config.repo, project, function (err) {
    if (err) {
      spinner.fail(chalk.red("Failed to download the repository"));
    } else {
      spinner.succeed(chalk.green("Repository downloaded successfully"));
    }
  });
}
```

---

## JavaScript 练习代码

项目包含丰富的 JavaScript 练习代码，分为以下几个模块：

### 1. 算法模块 (`js/算法/`)

| 文件名 | 描述 |
|--------|------|
| `快速排序.js` | 快速排序算法实现 |
| `冒泡排序.js` | 冒泡排序算法实现 |
| `堆排序.js` | 堆排序算法实现 |
| `二分查找.js` | 二分查找算法 |
| `全排列.js` | 全排列生成算法 |
| `回溯算法.js` | 回溯算法示例 |
| `二叉树层序遍历.js` | 二叉树层序遍历 |
| `二叉树中序遍历——栈.js` | 使用栈实现中序遍历 |
| `数组转树结构.js` | 数组转树形结构 |
| `有序链表合并.js` | 有序链表合并算法 |
| `删除链表重复节点.js` | 删除链表中的重复节点 |
| `图的深度优先遍历.js` | 图的 DFS 遍历 |
| `二维数组顺时针遍历.js` | 二维数组顺时针遍历 |
| `供暖器.js` | 供暖器问题 |
| `复原ip地址93.js` | 复原 IP 地址问题 |
| `16进制转10进制.js` | 进制转换 |
| `1到n最小公倍数.js` | 最小公倍数计算 |
| `二分法求平方根.js` | 二分法求平方根 |
| `查找数组的深度.js` | 查找嵌套数组深度 |
| `ip地址.js` | IP 地址相关处理 |

**示例 - 快速排序**：

```javascript
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let temp = arr[0];
  let leftArr = [], rightArr = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > temp) {
      rightArr.push(arr[i]);
    } else {
      leftArr.push(arr[i]);
    }
  }
  return [...quickSort(leftArr), temp, ...quickSort(rightArr)];
}
```

### 2. Promise 模块 (`js/promise/`)

| 文件名 | 描述 |
|--------|------|
| `myPromise.js` | 手写 Promise 实现 |
| `promiseAll.js` | 手写 Promise.all 实现 |
| `promiseRace.js` | 手写 Promise.race 实现 |
| `Promise红绿灯问题.js` | 红绿灯循环控制 |
| `控制处理任务并发数量.js` | 控制任务并发数量 |
| `控制请求并发数量.js` | 控制请求并发数量 |
| `promise产生随机数.js` | Promise 生成随机数 |
| `定时器.js` | 定时器相关练习 |

**示例 - Promise.all 实现**：

```javascript
function customPromiseAll(promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError("Arguments must be an array"));
  }
  if (promises.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let remaining = promises.length;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          if (--remaining === 0) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}
```

### 3. 前端模块 (`js/前端/`)

| 文件名 | 描述 |
|--------|------|
| `深拷贝.js` | 深拷贝实现（支持循环引用、特殊对象） |
| `函数柯里化.js` | 函数柯里化实现 |
| `节流防抖.js` | 节流与防抖函数 |
| `观察者模式.js` | 观察者模式实现 |
| `发布订阅者模式.js` | 发布订阅模式实现 |
| `lodashGet.js` | lodash.get 实现 |
| `reduce.js` | 手写 reduce 方法 |
| `filter的实现.js` | 手写 filter 方法 |
| `对象遍历.js` | 对象遍历方法 |
| `对象的后序遍历.js` | 对象后序遍历 |
| `文件系统.js` | 文件系统相关操作 |

**示例 - 深拷贝实现**：

```javascript
function cloneDeep(value, map = new WeakMap()) {
  if (value === null || typeof value !== "object") {
    return value;
  }
  // 处理循环引用
  if (map.has(value)) {
    return map.get(value);
  }
  // 支持 Date、RegExp、Set、Map、Error 等特殊类型
  const type = Object.prototype.toString.call(value);
  // ... 完整实现见源码
}
```

### 4. 类与原型模块 (`js/类/`)

| 文件名 | 描述 |
|--------|------|
| `LRUCache.js` | LRU 缓存实现 |
| `new.js` | 手写 new 操作符 |
| `类与原型.js` | 类与原型链练习 |
| `数组随机排序foreach.js` | 数组随机排序 |

---

## 开发指南

### 本地开发

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
npm install

# 链接到全局（本地测试）
npm link

# 测试命令
leetcli create test-project
```

### 发布到 NPM

```bash
# 登录 npm
npm login

# 发布
npm publish --access public
```

---

## 扩展框架模板

如需添加新的框架模板，修改 `config.js` 文件：

```javascript
export const choices = [
  { name: "Express", value: "Express" },
  { name: "Koa", value: "Koa" },
  { name: "Egg", value: "Egg" },
  // 添加新框架
  { name: "NestJS", value: "NestJS" },
];

export const frameworkConfig = {
  // ...existing configs
  NestJS: {
    repo: "nestjs/nest",
    name: "nestjs",
  },
};
```

---

## 许可证

MIT License

---

## 作者

Bob Zi

---

## 更新日志

- **v1.0.0**: 初始版本发布
  - 支持 Express、Koa、Egg 三种框架模板
  - 提供创建项目命令
  - 提供帮助命令
  - 包含丰富的算法和前端练习代码
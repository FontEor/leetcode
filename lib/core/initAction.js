import inquirer from "inquirer";

const initAction = async (project, opts) => {
  const choices = [
    { name: "Express", value: "express" },
    { name: "KOA", value: "koa" },
    { name: "EGG", value: "egg" },
  ];
  const answers = await inquirer.prompt([
    {
      type: "rawlist",
      name: "framwork",
      message: "请选择框架？",
      choices,
      loop: false,
    },
  ]);
  console.log(`你选择了 ${answers.framwork} 框架，正在初始化项目...`);
};

export default initAction;

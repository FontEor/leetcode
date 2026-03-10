import inquirer from "inquirer";
import download from "download-git-repo";
import { choices, downloadFramework } from "../../config.js";

const initAction = async (project, opts) => {
  console.log("project", project);
  console.log("opts", opts);
  const answers = await inquirer.prompt([
    {
      type: "rawlist",
      name: "framework",
      message: "请选择框架？",
      choices,
      loop: true,
    },
  ]);
  downloadFramework(answers, project, download);
};

export default initAction;

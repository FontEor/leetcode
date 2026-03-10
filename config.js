import ora from "ora";
import chalk from "chalk";
export const choices = [
  { name: "Express", value: "Express" },
  { name: "Koa", value: "Koa" },
  { name: "Egg", value: "Egg" },
];

export const frameworkConfig = {
  Express: {
    repo: "expressjs/express",
    name: "express",
  },
  Koa: {
    repo: "koajs/koa",
    name: "koa",
  },
  Egg: {
    repo: "eggjs/egg",
    name: "egg",
  },
};

export function downloadFramework(answers, project, download) {
  const config = frameworkConfig[answers.framework];
  const spinner = ora(
    chalk.blue(`Loading${config ? ` ${config.name}...` : "..."}`),
  ).start();
  if (config) {
    download(config.repo, project, function (err) {
      if (err) {
        spinner.fail(chalk.red("Failed to download the repository"));
      } else {
        spinner.succeed(chalk.green("Repository downloaded successfully"));
      }
    });
  }
}

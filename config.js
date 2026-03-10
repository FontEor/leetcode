import ora from "ora";
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
  const spinner = ora(`Loading${config ? ` ${config.name}` : ""}`).start();
  if (config) {
    download(config.repo, project, function (err) {
      if (err) {
        spinner.fail("Failed to download the repository");
      } else {
        spinner.succeed("Repository downloaded successfully");
      }
    });
  }
}

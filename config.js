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
  if (config) {
    download(config.repo, project, function (err) {
      console.log(err ? "Error" : "Success");
    });
  }
}

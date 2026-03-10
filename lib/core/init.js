import initAction from "./initAction.js";
const InitCommand = (program) => {
  program
    .command("create [project]")
    .option("-f, --force", "Force initialization by overwriting existing files")
    .description("Initialize a new LeetCode project")
    .action(async (project, options) => {
      await initAction(project, options);
    });
};

export default InitCommand;

const InitCommand = (program) => {
  program
    .command("init")
    .description("Initialize a new LeetCode project")
    .action(() => {
      console.log("Initializing a new LeetCode project...");
    });
};

export default InitCommand;

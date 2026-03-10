const helpCommand = (program) => {
  program
    .command("help [command]")
    .description("Display help information for a command")
    .action((command) => {
      if (command) {
        const cmd = program.commands.find((c) => c.name() === command);
        if (cmd) {
          console.log(cmd.helpInformation());
        } else {
          console.log(`Command "${command}" not found`);
        }
      } else {
        console.log(program.helpInformation());
      }
    });
};

export default helpCommand;

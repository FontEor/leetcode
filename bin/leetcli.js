#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { version } = require("../package.json");
const helpCommand = require("../lib/core/help").default;
const InitCommand = require("../lib/core/init").default;
program.version(version);
helpCommand(program);
InitCommand(program);

program.parse(process.argv);

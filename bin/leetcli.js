#!/usr/bin/env node
import { Command } from "commander";
import helpCommand from "../lib/core/help.js";
import InitCommand from "../lib/core/init.js";
const program = new Command();
helpCommand(program);
InitCommand(program);

program.parse(process.argv);

const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const path = require('path');
const enquirer = require('enquirer');
const execa = require('execa');

const defaultTemplates = path.join(__dirname, 'templates');
const defaultActions = ['index', 'build', 'show', 'create', 'edit', 'update', 'destroy'];

const buildCommand = (type, name, actions) => {
  // actually we can check if actions param is empty only with actions.length
  // but it won't be readable code
  const normalizedActions = actions.length === 0 ? defaultActions : actions;
  return [
    'generate',
    type,
    name,
    '--actions',
    normalizedActions.join(','),
  ].join(' ');
};

module.exports = ({ type, name, actions }) => {
  const command = buildCommand(type, name, actions);

  runner(command, {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new Logger(console.log.bind(console)),
    createPrompter: () => enquirer,
    exec: (action, body) => {
      const opts = body && body.length > 0 ? { input: body } : {};
      return execa.shell(action, opts);
    },
    debug: !!process.env.DEBUG,
  });
};
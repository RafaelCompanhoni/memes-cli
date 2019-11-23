const inquirer = require('inquirer');
const { writeFileSync } = require('fs');
const nodeConfig = require('./config/tsconfig.node.json');
const reactNativeConfig = require('./config/tsconfig.react-native.json');
const reactConfig = require('./config/tsconfig.react.json');

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Escolha o framework para a geração do arquivo tsconfig',
      name: 'selectedFramework', choices: ['react', 'react-native', 'node']
    }
  ])
  .then(answers => {
    console.log(answers.selectedFramework);
  });
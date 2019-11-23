const inquirer = require('inquirer');
const { writeFileSync } = require('fs');
const nodeConfig = require('./config/tsconfig.node.json');
const reactNativeConfig = require('./config/tsconfig.react-native.json');
const reactConfig = require('./config/tsconfig.react.json');

const NODE = 'node';
const REACT_NATIVE = 'react-native';
const REACT = 'react';

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Escolha o framework para a geração do arquivo tsconfig',
      name: 'selectedFramework', choices: ['react', 'react-native', 'node']
    }
  ])
  .then(({ selectedFramework }) => {
    let tsconfigFile = '';

    switch(selectedFramework) {
      case NODE:
        tsconfigFile = nodeConfig;
        break;
      case REACT_NATIVE:
        tsconfigFile = reactNativeConfig;
        break;
      case REACT:
        tsconfigFile = reactConfig;
        break;
    }

    const cwd = process.cwd();
    writeFileSync(cwd + '/tsconfig.json', JSON.stringify(tsconfigFile, null, 2));
  });
const inquirer = require('inquirer');
const { writeFileSync } = require('fs');
const nodeConfig = require('./config/tsconfig.node.json');
const reactNativeConfig = require('./config/tsconfig.react-native.json');
const reactConfig = require('./config/tsconfig.react.json');

const NODE = 'node';
const REACT_NATIVE = 'react-native';
const REACT = 'react';

let tsconfigFile = '';

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Escolha o framework para a geração do arquivo tsconfig',
      name: 'selectedFramework',
      choices: ['react', 'react-native', 'node']
    },
    {
      type: 'list',
      message: 'Selecione o modo de utilização',
      name: 'mode',
      choices: ['desenvolvimento', 'produção']
    },
    {
      type: 'list',
      message: 'Será utilizado para migrar um projeto JavaScript pré-existente?',
      name: 'migration',
      choices: ['sim', 'não']
    },
    {
      type: 'list',
      message: 'Será exportado como módulo NPM?',
      name: 'isNpm',
      choices: ['sim', 'não']
    },
  ])
  .then(({ selectedFramework, mode, migration, isNpm }) => {
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

    console.log(`Modo: ${mode}`);
    console.log(`Para migração: ${migration}`);
    console.log(`Exportar como módulo NPM: ${isNpm}`);

    const cwd = process.cwd();
    writeFileSync(cwd + '/tsconfig.json', JSON.stringify(tsconfigFile, null, 2));
  });
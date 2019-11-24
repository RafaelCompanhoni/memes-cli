const inquirer = require('inquirer');
const { writeFileSync } = require('fs');

const nodeConfig = require('./config/node/tsconfig.node.json');
const reactNativeConfig = require('./config/react-native/tsconfig.react-native.json');
const reactConfig = require('./config/react/tsconfig.react.json');

const devConfig = require('./config/common/dev.json');
const prodConfig = require('./config/common/prod.json');

// frameworks
const NODE = 'node';
const REACT_NATIVE = 'react-native';
const REACT = 'react';

// modes
const DEV = 'desenvolvimento';
const PROD = 'produção';

// boolean options
const YES = 'sim';
const NO = 'não';

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Escolha o framework para a geração do arquivo tsconfig',
      name: 'selectedFramework',
      choices: [NODE, REACT_NATIVE, REACT]
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
      choices: [YES, NO]
    },
    {
      type: 'list',
      message: 'Será exportado como módulo NPM?',
      name: 'isNpm',
      choices: [YES, NO]
    },
  ])
  .then(({ selectedFramework, mode, migration, isNpm }) => {
    let tsconfigFile = '';
    let modeFile = ''

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

    modeFile = mode === DEV ? devConfig : prodConfig;

    console.log(`Modo:`);
    console.log(JSON.stringify(modeFile, null, 2));

    console.log(`Para migração: ${migration}`);
    console.log(`Exportar como módulo NPM: ${isNpm}`);

    const cwd = process.cwd();
    writeFileSync(cwd + '/tsconfig.json', JSON.stringify(tsconfigFile, null, 2));
  });
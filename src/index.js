const inquirer = require('inquirer');
const { writeFileSync } = require('fs');

const nodeConfig = require('./config/node/tsconfig.node.json');
const reactNativeConfig = require('./config/react-native/tsconfig.react-native.json');
const reactConfig = require('./config/react/tsconfig.react.json');

const devConfig = require('./config/common/dev.json');
const prodConfig = require('./config/common/prod.json');

const forMigrationsConfig = require('./config/common/forMigrations.json');
const forNewProjectsConfig = require('./config/common/forNewProjects.json');

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
    }
  ])
  .then(({ selectedFramework, mode, migration }) => {
    let tsconfigFile = '';
    let modeFile = ''
    let purposeFile = '';

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
    purposeFile = migration === YES ? forMigrationsConfig : forNewProjectsConfig;

    const result = [...tsconfigFile, ...modeFile, ...purposeFile];

    console.log('RESULTADO');
    console.log(JSON.stringify(result, null, 2));

    const cwd = process.cwd();
    writeFileSync(cwd + '/tsconfig.json', JSON.stringify(result, null, 2));
  });
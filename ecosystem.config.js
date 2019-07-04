module.exports = {
  apps : [{
    name: 'colsure',
    script: './bin/www',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: [
      'config',
      'controller',
      'db',
      'enums',
      'middleware',
      'model',
      'router',
      'service',
      'utils'
    ],
    max_memory_restart: '100M',
    max_restarts:30,
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    env: {
      "PORT": 3000,
      "NODE_ENV": 'dev'
    },
    env_prod: {
      "PORT": 9555,
      "NODE_ENV": 'prod'
    }
  }]
};

const packageJson = require('./package.json');

module.exports = {
  apps: [
    {
      name: 'mobile-ordering-app',
      script: './server.js',
      args: 'preview',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

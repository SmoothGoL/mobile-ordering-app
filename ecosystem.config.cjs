module.exports = {
  apps: [
    {
      name: 'mobile-ordering-app',
      script: 'npm',
      args: 'run preview',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

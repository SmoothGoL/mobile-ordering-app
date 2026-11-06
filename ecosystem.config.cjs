module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'npm',
      args: 'run preview',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

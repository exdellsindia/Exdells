module.exports = {
  apps: [
    {
      name: 'exdells-backend',
      script: 'server.js',
      cwd: './backend',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}

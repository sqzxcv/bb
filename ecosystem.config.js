module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'API',
      script    : './bin/www',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
    {
      "name": "love video0",
      "max_memory_restart": "1024M",
      "log_date_format": "YYYY-MM-DD HH:mm:ss SSS",
      "script": "/var/www/rocket.chat/bundle/main.js",
      "out_file": "/var/log/rocket.chat/app.log",
      "error_file": "/var/log/rocket.chat/err.log",
      "port": "8080",
      "env": {
        "CDN_PREFIX": "//dbde4sd21oahf.cloudfront.net",
        "MONGO_URL": "mongodb://localhost:27017/rocketchat",
        "MONGO_OPLOG_URL": "mongodb://localhost:27017/local",
        "ROOT_URL": "http://rocket.chat",
        "PORT": "8080"
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'node',
      host : '172.104.91.83',
      ref  : 'origin/master',
      repo : 'git@github.com:sqzxcv/videoservice.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '172.104.91.83',
      ref  : 'origin/master',
      repo : 'git@github.com:sqzxcv/videoservice.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};

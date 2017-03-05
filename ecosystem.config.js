module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "Egiang",
      script    : "server.js",
      env_production : {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      key: 'ssh/id_rsa',
      user : "root",
      host : "104.131.31.231",
      ref  : "origin/master",
      repo : "https://a8a676fb1b1999d4eeb1b7083eb7e3d27fe30964@github.com/mxdi9i7/werewolf-exp.git",
      path : "~/egiang",
      "post-deploy" : "nvm install && npm install && redis-server & && /root/.nvm/versions/node/v6.10.0/bin/pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
}

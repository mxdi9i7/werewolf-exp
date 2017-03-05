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
      },
      env_staging : {
        NODE_ENV: "staging"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "deploy",
      host : "104.131.31.231",
      ref  : "origin/master",
      repo : "git@github.com:repo.git",
      path : "~/egiang",
      "post-deploy" : "nvm install && npm install && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
}


const PROXY_CONFIG = {
    "/corso-api": {
      "target": "http://corso-api:8080",
      "logLevel": "debug",
      "secure": false,
      // "pathRewrite": {
      //   "^/corso-api": ""
      // },
      "changeOrigin": true
    }
};
module.exports = PROXY_CONFIG;

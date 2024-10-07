var defaultTarget = 'http://localhost:3000';
// var defaultTarget = 'https://3000-actionanand-angularhttp-six5y8k89a8.ws-us116.gitpod.io';

module.exports = [
  {
    context: ['/api/v2/*'],
    target: defaultTarget,
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      '^/api/v2/': '/',
    },
  },
  {
    context: ['/api/v2/**'],
    target: defaultTarget,
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      '^/api/v2/': '/',
    },
  },
];

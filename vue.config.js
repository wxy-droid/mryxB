module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/mall-admin-app-pro/' : '/',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};

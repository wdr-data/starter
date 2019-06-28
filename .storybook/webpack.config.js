module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localsConvention: 'camelCase',
            },
          },
        ],
      },
      // Following config is based on the Webpack config from Gatsby
      // to archieve parity
      {
        test: /\.(ico|svg|jpg|jpeg|png|gif|webp)(\?.*)?$/,
        loader: require.resolve('url-loader'),
      },
    ],
  },
}

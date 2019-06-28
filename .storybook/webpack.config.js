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
        {
          test: /\.(jpg|png|gif)$/,
          loader: require.resolve('file-loader'),
        },
      ],
    },
  }

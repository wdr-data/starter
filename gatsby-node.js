exports.onCreateWebpackConfig = ({
    stage,
    actions,
 }) => {
    console.log('hello gatsby', stage)
    actions.setWebpackConfig({
      module: {
        rules: [
            {
              test: /\.csv$/,
              loader: 'csv-loader',
              options: {
                dynamicTyping: true,
                header: true,
                skipEmptyLines: true
              }
            }
          ]
      },
    })
  }
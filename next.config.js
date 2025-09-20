const webpack = require('webpack')
const _ = require('lodash')

module.exports = {
  trailingSlash: true,
  output: 'export',
  basePath: '', // do not edit - modified by .github/workflows/deployment-gh-pages.yml
  webpack: (config, options) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    )
    return config
  }

}

const webpack = require('webpack')
const _ = require('lodash')

module.exports = {
  trailingSlash: true,
  output: 'export',
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

const webpack = require('webpack')
const _ = require('lodash')

const basePath = ''; // do not edit - modified by .github/workflows/deployment-gh-pages.yml

module.exports = {
  trailingSlash: true,
  output: 'export',
  basePath: basePath,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  publicRuntimeConfig: {
    basePath: basePath, // for access at runtime https://nextjs.org/docs/pages/api-reference/config/next-config-js/runtime-configuration
  },
  experimental: {
    cssChunking: 'strict',
  },
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

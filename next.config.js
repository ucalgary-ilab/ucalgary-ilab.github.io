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
  webpack: (config, options) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    )
    // Ensure CSS ordering as declared in pages/_app.js
    // https://github.com/vercel/next.js/issues/64921
    // https://github.com/vercel/next.js/issues/64921#issuecomment-2621632945
    if (!options.isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          styles: {
            name: 'vendor-styles',
            test: /[\\/]node_modules[\\/].*\.(css|scss|sass)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    return config
  }

}

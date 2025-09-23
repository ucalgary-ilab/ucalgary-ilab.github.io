const webpack = require('webpack')
const _ = require('lodash')

const basePath = ''; // do not edit - modified by .github/workflows/deployment-gh-pages.yml

module.exports = {
  trailingSlash: true,
  output: 'export',
  images: { unoptimized: true },
  basePath: basePath,
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  publicRuntimeConfig: {
    basePath: basePath, // for access at runtime https://nextjs.org/docs/pages/api-reference/config/next-config-js/runtime-configuration
  },
  // exportPathMap: function () {
  //   const ids = [
  //     'publications',
  //     'people',
  //     'courses',
  //     'news',
  //     'seminar',
  //     'facility',
  //     'location',
  //   ]

  //   let pages = {}
  //   for (let id of ids) {
  //     let href = id
  //     pages[href] = {
  //       page: '',
  //       query: { id: id }
  //     }
  //   }

  //   const summary = require('./content/output/summary.json')

  //   const publications = Object.keys(summary.fileMap)
  //   .filter((fileName) => {
  //     return fileName.includes('publications')
  //   })
  //   for (let publication of publications) {
  //     let id = publication.split('/')[3].replace('.json', '')
  //     let href = `/publications/${id}`
  //     pages[href] = {
  //       page: '/publication',
  //       query: { id: id }
  //     }
  //   }

  //   const people = Object.keys(summary.fileMap)
  //   .filter((fileName) => {
  //     return fileName.includes('people')
  //   })
  //   for (let person of people) {
  //     let id = person.split('/')[3].replace('.json', '')
  //     let href = `/people/${id}`
  //     pages[href] = {
  //       page: '/person',
  //       query: { id: id }
  //     }
  //   }

  //   /*
  //   const speakers = require('./content/output/seminar.json')
  //   for (let speaker of speakers) {
  //     let nameId = _.lowerCase(speaker.name).replace(/ /g, '-')
  //     let id = `${speaker.date}-${speaker.nameId}`
  //     let href = `/seminar/${id}`
  //     pages[href] = {
  //       page: '/speaker',
  //       query: { id: id }
  //     }
  //   }
  //   */

  //   // console.log(pages)
  //   return Object.assign({}, pages, {
  //     '/': { page: '/' }
  //   })
  // },
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

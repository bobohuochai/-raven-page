module.exports = {
    configureWebpack: {
      externals: {
        '@raven/cell': {
          commonjs: '@raven/cell',
          commonjs2: '@raven/cell',
          amd: '@raven/cell',
          root: '@raven/cell'
        },
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'Vue'
        }
      }
    },
    css: { extract: false }
  }
  
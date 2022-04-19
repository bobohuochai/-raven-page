module.exports = {
    configureWebpack: {
      externals: {
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
  
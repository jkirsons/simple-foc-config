const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/variables/index.scss";`
      },
      sassOptions: {
        indentedSyntax: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ],
  }
}

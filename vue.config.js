module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/variables/_all.scss"; @import "@/scss/utils/_all.scss";',
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/league-skin-guesser/'
    : '/',
}

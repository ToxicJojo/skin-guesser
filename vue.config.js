module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/variables/_all.scss";',
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/league-skin-guesser/'
    : '/',
}

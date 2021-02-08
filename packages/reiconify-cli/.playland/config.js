const path = require('path')
const resolveCwd = path.resolve.bind(null, process.env.CWD)
const userPkg = require(resolveCwd('package.json'))

module.exports = {
  home: '🏠',
  title: userPkg.name,
  pagePatterns: [
    'docs/**/*.mdx',
    '/Users/lj/dev/github/reiconify/packages/md.icons/README.md',
  ],
  override(config) {
    Object.assign(config.alias, {
      '~icons': process.env.ICONS_PATH,
    })
    if (!config.esbuild) {
      config.esbuild = {}
    }
    Object.assign(config.esbuild, {target: 'es2015'})
  },
  // buildPath: resolveCwd('dist'),
  // webpack(config) {
  //   config.plugins.push(
  //     new webpack.EnvironmentPlugin({REICONIFY_SHOW_ALIGN: false})
  //   )
  //   config.resolve.alias = {
  //     '~cwd/README.md': resolveCwd('README.md'),
  //     ...config.resolve.alias,
  //     '~icons': process.env.SRC_DIR,
  //   }
  //   return config
  // },
}

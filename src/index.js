const { parseRawCommit } = require('conventional-changelog/lib/git')

module.exports = function (pluginConfig, {commit}, cb) {
  if (commit.message.indexOf('[release skip]') > -1 ||
      commit.message.indexOf('[skip release]') > -1) {
    return cb(null, null)
  }

  commit = parseRawCommit(`${commit.hash}\n${commit.message}`)

  if (!commit) return cb(null, null)
  if (commit.breaks.length) return cb(null, 'major')
  if (commit.type === 'feat') return cb(null, 'minor')
  if (commit.type === 'fix') return cb(null, 'patch')

  cb(null, null)
}

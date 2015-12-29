const { sync as parseCommit } = require('conventional-commits-parser')

module.exports = function (pluginConfig, {commit}, cb) {
  commit = parseCommit(`${commit.hash}\n${commit.message}`)

  if (!commit) return cb(null, null)
  if (commit.breaks.length) return cb(null, 'major')
  if (commit.type === 'feat') return cb(null, 'minor')
  if (commit.type === 'fix') return cb(null, 'patch')

  cb(null, null)
}

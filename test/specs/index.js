const { test } = require('tap')

const analyzer = require('../../dist')

test('derive version number from commits', (t) => {
  t.test('no change', (tt) => {
    tt.plan(2)

    analyzer({}, {
      commit: {
        hash: '1234',
        message: 'chore: build script'
      }
    }, (err, type) => {
      tt.error(err)
      tt.is(type, null)
    })
  })

  t.test('patch version', (tt) => {
    tt.plan(2)

    analyzer({}, {
      commit: {
        hash: '1234',
        message: 'fix(scope): even nastier bug'
      }
    }, (err, type) => {
      tt.error(err)
      tt.is(type, 'patch')
    })
  })

  t.test('minor/feature version', (tt) => {
    tt.plan(2)

    analyzer({}, {
      commit: {
        hash: '1234',
        message: 'feat(scope): cool feature'
      }
    }, (err, type) => {
      tt.error(err)
      tt.is(type, 'minor')
    })
  })

  t.test('major/breaking version', (tt) => {
    tt.plan(2)

    analyzer({}, {
      commit: {
        hash: '1234',
        message: 'feat(something): even cooler feature\nBREAKING CHANGE: everything so broken'
      }
    }, (err, type) => {
      tt.error(err)
      tt.is(type, 'major')
    })
  })

  t.end()
})

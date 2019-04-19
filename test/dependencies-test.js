const test = require('ava')
const { dependencies, devDependencies } = require('../package.json')
const dropModules = ['husky', 'react-icons']
const isDropped = module => !dropModules.includes(module)

test('basic check', t => {
  t.true(true, 'ava works ok')
})

Object.keys(devDependencies).filter(isDropped).forEach(dependency => {
  test(`${dependency} loads ok`, t => {
    const module = require(dependency)
    t.truthy(module)
  })
})

Object.keys(dependencies).filter(isDropped).forEach(dependency => {
  test(`${dependency} loads ok`, t => {
    const module = require(dependency)
    t.truthy(module)
  })
})

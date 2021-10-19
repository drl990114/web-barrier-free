const fs = require('fs')
const execa = require('execa')

const dirs = fs.readdirSync('packages').filter((p) => {
  if (!fs.statSync(`packages/${p}`).isDirectory()) {
    return false
  }
  return true
})

async function build (target) {
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
    stdio: 'inherit'
  })
}

async function runParallel (dirs, iterFn) {
  const result = []
  for (const item of dirs) {
    result.push(iterFn(item))
  }
  return Promise.all(result)
}

runParallel(dirs, build).then(() => {
  console.log('成功')
})

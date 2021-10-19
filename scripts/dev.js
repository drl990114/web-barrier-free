const execa = require('execa')

async function build(target) {
  await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], {
    stdio: 'inherit',
  })
}
build('wsa')

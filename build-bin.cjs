const fs = require('fs')
const path = require('path')
const spawn = require('cross-spawn')
const packageJson = require('./package.json')

const dirsToDelete = ['dist', 'dist-web']
dirsToDelete.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`Deleting "${dir}" folder...`)
    fs.rmSync(path.resolve(__dirname, dir), { recursive: true })
  }
})

console.log('Starting building...')
for (const key in packageJson.scripts) {
  if (key.startsWith('build-')) {
    spawn.sync(`npm run ${key}`, [], {
      stdio: 'inherit',
    })
  }
}

spawn(
  'bun',
  [
    'build',
    './dist/server/index.js',
    '--compile',
    '--target',
    'bun',
    '--outfile',
    'netserv.exe',
    '--windows-title',
    'NetServ',
    '--windows-description',
    'NetServ - A simple file transfer server',
  ],
  { stdio: 'inherit' }
)

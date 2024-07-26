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
    const child = spawn(`npm run ${key}`, [], { stdio: 'inherit' })

    child.on('error', (err) => {
      console.error('Failed to start subprocess:', err)
    })

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`"${key}" completed successfully`)
      } else {
        console.error(`"${key}" exited with code ${code}`)
      }
    })
  }
}

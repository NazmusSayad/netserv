#!/usr/bin/env node

const isDevMode = process.argv.at(1)?.endsWith('.ts')
isDevMode || require('module-alias/register')

console.clear()
import './args'

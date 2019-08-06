// take folder rename to discogs name
// take mp3 files and add metadata: images, artist... rename files
// take flac, wav... and convert to aaic

// first arg is folder, second is discogs link

const fs = require('fs')
const url = require('url')

const dir = require('os').homedir() + '/Music/Discogs'
const args = process.argv.slice(2, process.argv.length)

if (!fs.existsSync(dir))
  fs.mkdirSync(dir)

if (args.length < 2)
  throw 'missing arguments'

const path = args[0]
const uri = url.parse(args[1])




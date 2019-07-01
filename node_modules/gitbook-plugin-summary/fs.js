const fs = require('fs')
const glob = require('glob')
const { List } = require('immutable-ext')
const path = require('path')
const Task = require('folktale/concurrency/task')

const { fromPath } = require('./files')

const print = str => x => { console.log(str, x); return x }

// Config -> Task ( List ( FileType String String ) )
const getPathTree = config =>
  getFilesRecursively(config)
    .map(sortFiles(config.isReadme))
    .map(paths => paths.map(fromPath))
    .map(List)

const getFilesRecursively = config => {
  const mdFiles = getPaths(config, `*/**/*.md`)
  const directories = getPaths(config, '**/*/')

  return Task.of([
    ...mdFiles,
    ...directories
  ])
}

const sortFiles = isReadme => files =>
  files.sort((a, b) => {
    if (path.dirname(b).includes(path.dirname(a)) && isReadme(a)) {
      return -1
    }
    if (path.dirname(a).includes(path.dirname(b)) && isReadme(b)) {
      return 1
    }
    return a < b ? -1 : a > b ? 1 : 0
  })

const getPaths = (config, pattern) =>
  glob.sync(
    pattern,
    {
      cwd: config.root,
      ignore: [ 'node_modules/**', '_book' ],
      nosort: true
    }
  )

// Config -> [ String, _ ] -> String
const readFile = config => ([ path ]) =>
  fs.readFileSync(`${config.root}/${path}`, { encoding: 'utf8' })

const writeSummaryFile = config => summaryContent => {
  fs.writeFileSync(`${config.root}/${config.summaryFilename}`, summaryContent, { encoding: 'utf8' })
}

// Config -> [ String, _ ] -> Bool
const isReadmeExistingInDir = config => ([ dirPath ]) => {
  const readmePath = path.join(config.root, dirPath, config.readmeFilename)
  const res = fs.existsSync(readmePath)
  return res
}

module.exports = {
  getPathTree,
  readFile,
  writeSummaryFile,
  isReadmeExistingInDir
}

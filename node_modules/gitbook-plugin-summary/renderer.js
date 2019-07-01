const Maybe = require('folktale/maybe')

const print = str => x => { console.log(str, x); return x }

const dirEntry = readmeFilename => ([ dirPath, hasReadme ]) => {
  const depth = getDirDepth(dirPath)
  const title = getDirTitle(dirPath)

  if (!hasReadme && depth === 0) {
    return sectionEntries(title)
  } else if (hasReadme) {
    return linkEntries(depth, title, dirPath + readmeFilename)
  } else {
    return disabledEntries(depth, title)
  }
}

const getDirTitle = path =>
  Maybe.of(path.split('/'))
    .chain(x => Maybe.fromNullable(x[x.length - 2]))
    .getOrElse('NO_NAME') // shouldn't happen, right !?

const getFileName = path =>
  Maybe.of(path.split('/'))
    .chain(x => Maybe.fromNullable(x[x.length - 1]))
    .getOrElse('NO_NAME') // shouldn't happen, right !?

// (String -> Bool) -> [ String, Markdown ] -> String
const fileEntry = isReadme => ([ filePath, parsedMarkdown ]) => {
  if (isReadme(filePath)) return

  const depth = getFileDepth(filePath)
  const fileTitle = getFileTitle(parsedMarkdown)
    .getOrElse(getFileName(filePath))

  return linkEntries(depth, fileTitle, filePath)
}

const getFileTitle = parsedMarkdown =>
  parsedMarkdown
    .chain(m => Maybe.fromNullable(m.headings))
    .map(headings => headings[0])
    .filter(title => !!title)
    .map(title => title.trim())

const depthEntries = (depth, entries) =>
  Array(depth).join('    ') + entries

const sectionEntries = (title, path) => `\n## ${title}\n`

const disabledEntries = (depth, title) =>
  depthEntries(depth, `- [${title}]()`)

const linkEntries = (depth, title, path) =>
  depthEntries(depth, `- [${title}](${path})`)

const getFileDepth = path => path.match(/\//g).length

const getDirDepth = path => getFileDepth(path) - 1

const buildSummary = config => entries =>
  entries.join('\n')

module.exports = {
  fileEntry,
  dirEntry,
  buildSummary
}

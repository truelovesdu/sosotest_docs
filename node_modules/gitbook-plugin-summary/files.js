const isADir = path => path.charAt(path.length - 1) === '/'

const fromPath = path =>
  isADir(path) ? Dir(path, path) : File(path, path)

const File = (path, x) => {
  const apply = f => f([ path, x ])

  const map = (f, _) => File(path, chain(f))

  const mapFile = f => map(f, null)

  const mapDir = _ => File(path, x)

  const inspect = _ => `File(${path}, ${x})`

  const chain = (f, _) => apply(f)

  return {
    map,
    mapFile,
    mapDir,
    inspect,
    chain,
    fold: chain
  }
}

const Dir = (path, x) => {
  const apply = g => g([ path, x ])

  const map = (_, g) => Dir(path, apply(g))

  const mapFile = _ => Dir(path, x)

  const mapDir = g => map(null, g)

  const inspect = _ => `Dir(${path}, ${x})`

  const chain = (_, g) => apply(g)

  return {
    map,
    mapFile,
    mapDir,
    inspect,
    chain,
    fold: chain
  }
}

module.exports = {
  fromPath,
  File,
  Dir
}

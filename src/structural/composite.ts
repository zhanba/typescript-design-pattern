import * as FS from 'fs'
import * as Path from 'path'

abstract class FileSystemObject {
  constructor(public path: string, public parent?: FileSystemObject) {}
  get basename(): string {
    return Path.basename(this.path)
  }
}

class FileObject extends FileSystemObject {
  readAll(): Buffer {
    return FS.readFileSync(this.path)
  }
}

class FolderObject extends FileSystemObject {
  items: FileSystemObject[]

  constructor(path: string, parent?: FileSystemObject) {
    super(path, parent)
    this.items = FS.readdirSync(this.path).map(path => {
      const stats = FS.statSync(path)
      if (stats.isFile()) {
        return new FileObject(path, this)
      } else if (stats.isDirectory()) {
        return new FolderObject(path, this)
      } else {
        return new Error('Not supported')
      }
    })
  }
}

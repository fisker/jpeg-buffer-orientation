import {readFileSync} from 'fs'
import path from 'path'
import glob from 'fast-glob'
// import createEsmUtils from 'esm-utils'
import getOrientation from '../src/index.js'

// const {__dirname} = createEsmUtils(import.meta)

const directory = path.join(__dirname, 'exif-samples')
const fixtures = glob
  .sync('**/*.{jpg,jpeg}', {
    cwd: directory,
  })
  .map((file) => ({
    name: file,
    file: path.join(directory, file),
  }))

describe('more jpeg test', () => {
  for (const image of fixtures) {
    const {name, file} = image

    test(`File ${name}`, () => {
      const {buffer} = readFileSync(file)
      const result = getOrientation(buffer)

      const type = typeof result

      expect(type === 'number' || type === 'undefined').toBe(true)
    })
  }
})

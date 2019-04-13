import {readFileSync} from 'fs'
import {join} from 'path'
import glob from 'fast-glob'

import getOrientation from '../src'

const dir = join(__dirname, 'exif-samples/jpg')
const fixtures = glob
  .sync('**/*.jpg', {
    cwd: dir,
  })
  .map(file => ({
    name: file,
    file: join(dir, file),
  }))

describe('more jpeg test', () => {
  for (const image of fixtures) {
    const {name, file} = image

    test(`${name}`, () => {
      const {buffer} = readFileSync(file)
      const result = getOrientation(buffer)

      expect(typeof result === 'number' || result === null).toBe(true)
    })
  }
})

import {readFileSync} from 'fs'
import {join} from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies
import glob from 'fast-glob'

import getOrientation from '../src'

const directory = join(__dirname, 'exif-samples')
const fixtures = glob
  .sync('**/*.{jpg,jpeg}', {
    cwd: directory,
  })
  .map((file) => ({
    name: file,
    file: join(directory, file),
  }))

describe('more jpeg test', () => {
  for (const image of fixtures) {
    const {name, file} = image

    test(`${name}`, () => {
      const {buffer} = readFileSync(file)
      const result = getOrientation(buffer)

      const type = typeof result

      expect(type === 'number' || type === 'undefined').toBe(true)
    })
  }
})

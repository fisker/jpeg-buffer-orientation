import {readFileSync, readdirSync} from 'fs'
import {join} from 'path'

import getOrientation from '../src'

const dir = join(__dirname, 'fixture2')
const fixtures = readdirSync(dir).map(file => ({
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

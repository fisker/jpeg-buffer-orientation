import {readFileSync} from 'node:fs'
import path from 'node:path'

import getOrientation from '../src'

const fixtureDirectory = path.join(__dirname, 'fixture')
const fixtures = [
  ...Array.from({length: 8}, (_, index) => ({
    name: `image_${index + 1}.jpg`,
    orientation: index + 1,
  })),
  {
    name: 'image_no_orientation.jpg',
    orientation: undefined,
  },
  {
    name: 'image_unknown_orientation.jpg',
    orientation: undefined,
  },
].map((fixture) => ({
  ...fixture,
  file: path.join(fixtureDirectory, fixture.name),
}))

describe('jpeg image orientation', () => {
  for (const image of fixtures) {
    const {name, file, orientation} = image

    test(`${name} orientation should be ${orientation}`, () => {
      const {buffer} = readFileSync(file)
      const result = getOrientation(buffer)
      expect(result).toBe(orientation)
    })
  }
})

describe('non-jpeg image orientation', () => {
  test('text file orientation should be undefined', () => {
    const {buffer} = readFileSync(__filename)
    const result = getOrientation(buffer)
    expect(typeof result).toBe('undefined')
  })
})

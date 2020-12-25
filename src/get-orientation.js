import {TIFF_ORIENTATION_TAG_NO} from './constants'

import validateEXIFData from './validate-exif-data'

function getOrientation(view, offset) {
  const result = validateEXIFData(view, offset)

  if (!result) {
    return
  }

  const {tiffOffset, littleEndian, firstIFDOffset} = result

  const tags = view.getUint16(firstIFDOffset, littleEndian)
  const start = tiffOffset + firstIFDOffset

  for (let index = 0; index < tags; index += 1) {
    const entryOffset = start + index * 12 + 2

    if (entryOffset > view.byteLength - 16) {
      return
    }

    // skip type check
    // var type = view.getUint16(entryOffset+2, littleEndian)
    // var numValues = view.getUint32(entryOffset+4, littleEndian)
    const tiffTagNumber = view.getUint16(entryOffset, littleEndian)
    if (tiffTagNumber === TIFF_ORIENTATION_TAG_NO) {
      const orientation = view.getUint16(entryOffset + 8, littleEndian)
      if (orientation < 1 || orientation > 8) {
        return
      }
      return orientation
    }
  }
}

export default getOrientation

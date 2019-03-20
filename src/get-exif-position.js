import {APP1_MARKER} from './constants'

// https://github.com/dominictarr/exif-orientation-lite/blob/master/index.js
// https://github.com/exif-js/exif-js/blob/master/exif.js

function getExifPosition(view) {
  const {byteLength} = view

  let offset = 2
  while (offset < byteLength) {
    // Not a valid marker
    if (view.getUint8(offset) !== 0xff) {
      return null
    }

    const marker = view.getUint16(offset)

    if (marker === APP1_MARKER) {
      return offset + 4
    }

    offset += 2
    offset += view.getUint16(offset)
  }

  return null
}

export default getExifPosition

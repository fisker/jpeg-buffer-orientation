// get orientation from a Arraybuffer
// most codes from urls bellow
// https://github.com/dominictarr/exif-orientation-lite/blob/master/index.js
// https://github.com/exif-js/exif-js/blob/master/exif.js

import globalThis from './global-this'
import isJPEG from './is-jpeg'
import getExifPosition from './get-exif-position'
import getOrientation from './get-orientation'

const {DataView} = globalThis

function orientation(buffer) {
  const view = new DataView(buffer)

  if (!isJPEG(view)) {
    return
  }

  const exifOffset = getExifPosition(view)

  if (!exifOffset) {
    return
  }

  return getOrientation(view, exifOffset)
}

export default orientation

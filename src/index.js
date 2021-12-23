// get orientation from a Arraybuffer
// most codes from urls bellow
// https://github.com/dominictarr/exif-orientation-lite/blob/master/index.js
// https://github.com/exif-js/exif-js/blob/master/exif.js

import isJpeg from './is-jpeg.js'
import getExifPosition from './get-exif-position.js'
import getOrientation from './get-orientation.js'

function getJpegOrientation(buffer) {
  const view = new DataView(buffer)

  if (!isJpeg(view)) {
    return
  }

  const exifOffset = getExifPosition(view)

  if (!exifOffset) {
    return
  }

  return getOrientation(view, exifOffset)
}

export default getJpegOrientation

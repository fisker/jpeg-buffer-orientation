import {EXIF_START, TIFF_FIRST_IFD_OFFSET, TIFF_TAG_MARK} from './constants.js'
import isLittleEndia from './is-tiff-align-little-endian.js'
import isBoolean from './is-boolean.js'

function validateExifData(view, offset) {
  // Not valid EXIF data! NO 'Exif' found
  if (
    view.getUint32(offset) !== EXIF_START ||
    view.getUint16(offset + 4) !== 0x00_00
  ) {
    return false
  }

  const tiffOffset = offset + 6
  const littleEndian = isLittleEndia(view, tiffOffset)

  /* istanbul ignore if */
  if (!isBoolean(littleEndian)) {
    return false
  }

  /* istanbul ignore if */
  // "Not valid TIFF data! (no 0x002A)"
  if (view.getUint16(tiffOffset + 2, littleEndian) !== TIFF_TAG_MARK) {
    return false
  }

  const firstIFDOffset = view.getUint32(tiffOffset + 4, littleEndian)

  /* istanbul ignore if */
  if (firstIFDOffset < TIFF_FIRST_IFD_OFFSET) {
    // Not valid TIFF data! (First offset less than 8)
    return false
  }

  return {
    tiffOffset,
    littleEndian,
    firstIFDOffset,
  }
}

export default validateExifData

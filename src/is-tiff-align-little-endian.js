import {TIFF_ALIGN_MOTOROLA, TIFF_ALIGN_INTEL} from './constants'

function isLittleEndian(view, offset) {
  const tiffAlign = view.getUint16(offset)

  if (tiffAlign === TIFF_ALIGN_INTEL) {
    return true
  }

  /* istanbul ignore else */
  if (tiffAlign === TIFF_ALIGN_MOTOROLA) {
    return false
  }

  /* istanbul ignore next */
  // "Not valid TIFF data! (no 0x4949 or 0x4D4D)"
  return null
}

export default isLittleEndian

;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.getOrientation = factory()))
})(this, function() {
  'use strict'

  // eslint-disable-next-line no-new-func
  var globalThis = new Function('return this')()

  // https://www.media.mit.edu/pia/Research/deepview/exif.html
  var SOI_MARKER = 0xffd8
  var APP1_MARKER = 0xffe1
  var EXIF_START = 0x45786966
  var TIFF_ALIGN_INTEL = 0x4949
  var TIFF_ALIGN_MOTOROLA = 0x4d4d
  var TIFF_TAG_MARK = 0x002a
  var TIFF_FIRST_IFD_OFFSET = 0x00000008
  var TIFF_ORIENTATION_TAG_NO = 0x0112

  function isJPEG(view) {
    return view.getUint16(0) === SOI_MARKER
  }

  // https://github.com/exif-js/exif-js/blob/master/exif.js

  function getExifPosition(view) {
    var byteLength = view.byteLength
    var offset = 2

    while (offset < byteLength) {
      // Not a valid marker
      if (view.getUint8(offset) !== 0xff) {
        return null
      }

      var marker = view.getUint16(offset)

      if (marker === APP1_MARKER) {
        return offset + 4
      }

      offset += 2
      offset += view.getUint16(offset)
    }

    return null
  }

  function isLittleEndian(view, offset) {
    var tiffAlign = view.getUint16(offset)

    if (tiffAlign === TIFF_ALIGN_INTEL) {
      return true
    }

    if (tiffAlign === TIFF_ALIGN_MOTOROLA) {
      return false
    } // "Not valid TIFF data! (no 0x4949 or 0x4D4D)"

    return null
  }

  function isBoolean(x) {
    return x === true || x === false
  }

  function validateEXIFData(view, offset) {
    // Not valid EXIF data! NO 'Exif' found
    if (
      view.getUint32(offset) !== EXIF_START ||
      view.getUint16(offset + 4) !== 0x0000
    ) {
      return false
    }

    var tiffOffset = offset + 6
    var littleEndian = isLittleEndian(view, tiffOffset)

    if (!isBoolean(littleEndian)) {
      return false
    } // "Not valid TIFF data! (no 0x002A)"

    if (view.getUint16(tiffOffset + 2, littleEndian) !== TIFF_TAG_MARK) {
      return false
    }

    var firstIFDOffset = view.getUint32(tiffOffset + 4, littleEndian)

    if (firstIFDOffset < TIFF_FIRST_IFD_OFFSET) {
      // Not valid TIFF data! (First offset less than 8)
      return false
    }

    return {
      tiffOffset: tiffOffset,
      littleEndian: littleEndian,
      firstIFDOffset: firstIFDOffset,
    }
  }

  function getOrientation(view, offset) {
    var result = validateEXIFData(view, offset)

    if (!result) {
      return
    }

    var tiffOffset = result.tiffOffset,
      littleEndian = result.littleEndian,
      firstIFDOffset = result.firstIFDOffset
    var tags = view.getUint16(firstIFDOffset, littleEndian)
    var start = tiffOffset + firstIFDOffset

    for (var i = 0; i < tags; i += 1) {
      var entryOffset = start + i * 12 + 2

      if (entryOffset > view.byteLength - 16) {
        return
      } // skip type check
      // var type = view.getUint16(entryOffset+2, littleEndian)
      // var numValues = view.getUint32(entryOffset+4, littleEndian)

      var tiffTagNumber = view.getUint16(entryOffset, littleEndian)

      if (tiffTagNumber === TIFF_ORIENTATION_TAG_NO) {
        var orientation = view.getUint16(entryOffset + 8, littleEndian)

        if (orientation < 1 || orientation > 8) {
          return
        }

        return orientation
      }
    }
  }

  // get orientation from a Arraybuffer
  var DataView = globalThis.DataView

  function orientation(buffer) {
    var view = new DataView(buffer)

    if (!isJPEG(view)) {
      return
    }

    var exifOffset = getExifPosition(view)

    if (!exifOffset) {
      return
    }

    return getOrientation(view, exifOffset)
  }

  return orientation
})
//# sourceMappingURL=index.js.map

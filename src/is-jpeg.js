import {SOI_MARKER} from './constants'

function isJPEG(view) {
  return view.getUint16(0) === SOI_MARKER
}

export default isJPEG

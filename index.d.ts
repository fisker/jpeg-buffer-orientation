export type Orientation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

/**
Get orientation of JPEG file.

@param buffer - ArrayBuffer of JPEG file.

@example
```
import getOrientation from 'jpeg-buffer-orientation'

const orientation = getOrientation(buffer)
```
*/
export default function getJpegOrientation(
  buffer: ArrayBuffer,
): Orientation | void

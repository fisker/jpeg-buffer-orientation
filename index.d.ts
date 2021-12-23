export type JpegBufferOrientation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/**
Get orientation of a jpeg file.

@param buffer - ArrayBuffer of jpeg file.

@example
```
import getJpegBufferOrientation from 'jpeg-buffer-orientation';

getJpegBufferOrientation(buffer)
```
*/
export default function getJpegBufferOrientation (buffer: ArrayBuffer): JpegBufferOrientation | void;

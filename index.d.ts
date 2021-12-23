/**
 * 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
 */
export type JpegBufferOrientation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/**
Get orientation from a jpeg buffer.
@param buffer - Jpeg Buffer.
@example
```
import getJpegBufferOrientation from 'jpeg-buffer-orientation';
const myJPEGFile = 'path/to/a/jpeg/file'
// this time we use fetch to get a ArrayBuffer
const response = await fetch(myJPEGFile)
const buffer = await response.arrayBuffer()
const orientation = getJpegBufferOrientation(buffer)
```
*/
export default function getJpegBufferOrientation (buffer: ArrayBuffer): JpegBufferOrientation | void;

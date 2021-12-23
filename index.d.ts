export type JpegBufferOrientation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/**
Get orientation from a jpeg buffer.
@param buffer - ArrayBuffer of jpeg file.
@example
```
getJpegBufferOrientation(buffer)
```
*/
export default function getJpegBufferOrientation (buffer: ArrayBuffer): JpegBufferOrientation | void;

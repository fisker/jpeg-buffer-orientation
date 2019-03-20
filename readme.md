# jpeg-buffer-orientation

> get orientation from a jpeg buffer

## Install

```sh
yarn add --dev jpeg-buffer-orientation
```

## Usage

in browser

```html
<script type="module">
  import getOrientation from "https://unpkg.com/jpeg-buffer-orientation?module"

  const myJPEGFile = "path/to/a/jpeg/file"

  // this time we use fetch to get a ArrayBuffer

  ;(async () => {
    const reponse = await fetch(myJPEGFile)
    const buffer = await response.arrayBuffer()
    const orientation = getOrientation(buffer)

    console.log("orientation", orientation)
  })()
</script>
```

[demo](https://fisker.github.com/jpeg-buffer-orientation)

in browser (legacy)

```html
<script src="https://unpkg.com/jpeg-buffer-orientation"></script>
<script>
  const blob = someJPEGBlob

  // this time we use FileReader to get a ArrayBuffer

  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(blob)
  fileReader.onload = () => {
    console.log(getOrientation(fileReader.result))
  }
</script>
```

in node

```js
import getOrientation from "jpeg-buffer-orientation"

const myJPEGFile = "path/to/a/jpeg/file"
const {buffer} = readFileSync(myJPEGFile)
const orientation = getOrientation(buffer)
console.log("orientation", orientation)
```

## API

getOrientation(buffer)

- buffer

  type: `ArrayBuffer`

- @returns

  type: `Number|null`

## FYI

this package is design for use in browser, not optimized for node.

1. accept `Buffer` instead of `ArrayBuffer` should be easier to use.
2. instead of reading the whole image, just reading head maybe better.

## License

MIT © [fisker Cheung](https://github.com/fisker)

# jpeg-buffer-orientation

[![gzip size](http://img.badgesize.io/https://unpkg.com/jpeg-buffer-orientation/dist/index.min.mjs?compression=gzip&style=flat-square)](http://img.badgesize.io/https://unpkg.com/jpeg-buffer-orientation/dist/index.min.mjs)

[![Travis](https://img.shields.io/travis/fisker/jpeg-buffer-orientation.svg?style=flat-square)](https://travis-ci.org/fisker/jpeg-buffer-orientation)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f1c92423809b450e871e4812581f8fe6)](https://app.codacy.com/app/fisker/jpeg-buffer-orientation?utm_source=github.com&utm_medium=referral&utm_content=fisker/jpeg-buffer-orientation&utm_campaign=Badge_Grade_Settings)
[![Coveralls github](https://img.shields.io/coveralls/github/fisker/jpeg-buffer-orientation.svg?style=flat-square)](https://coveralls.io/github/fisker/jpeg-buffer-orientation)

[![devDependencies](https://img.shields.io/david/dev/fisker/jpeg-buffer-orientation.svg?style=flat-square)](https://david-dm.org/fisker/jpeg-buffer-orientation)
[![Issues](http://img.shields.io/github/issues/fisker/jpeg-buffer-orientation.svg?style=flat-square)](https://github.com/fisker/jpeg-buffer-orientation/issues)
[![Issues](https://img.shields.io/github/issues-pr/fisker/jpeg-buffer-orientation.svg?style=flat-square)](https://github.com/fisker/jpeg-buffer-orientation/pulls)
[![GitHub last commit](https://img.shields.io/github/last-commit/fisker/jpeg-buffer-orientation.svg?style=flat-square)](https://github.com/fisker/jpeg-buffer-orientation/commits)
[![GitHub Release Date](https://img.shields.io/github/release-date/fisker/jpeg-buffer-orientation.svg?style=flat-square)](https://github.com/fisker/jpeg-buffer-orientation/releases)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MIT license](https://img.shields.io/github/license/fisker/jpeg-buffer-orientation.svg?style=flat-square)](http://opensource.org/licenses/MIT)

> get orientation from a jpeg buffer

## Install

```sh
yarn add --dev jpeg-buffer-orientation
```

## Usage

in browser

```html
<script type="module">
  import getOrientation from 'https://unpkg.com/jpeg-buffer-orientation?module'

  const myJPEGFile = 'path/to/a/jpeg/file'

  // this time we use fetch to get a ArrayBuffer

  ;(async () => {
    const reponse = await fetch(myJPEGFile)
    const buffer = await response.arrayBuffer()
    const orientation = getOrientation(buffer)

    console.log('orientation', orientation)
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
import getOrientation from 'jpeg-buffer-orientation'

const myJPEGFile = 'path/to/a/jpeg/file'
const {buffer} = readFileSync(myJPEGFile)
const orientation = getOrientation(buffer)
console.log('orientation', orientation)
```

## API

getOrientation(buffer)

- buffer

  type: `ArrayBuffer`

- @returns

  type: `Number|undefined`

## FYI

this package is design for use in browser, not optimized for node.

1. accept `Buffer` instead of `ArrayBuffer` should be easier to use.
2. instead of reading the whole image, just reading head maybe better.

## License

MIT © [fisker Cheung](https://github.com/fisker)

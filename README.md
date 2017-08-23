# libdom
Lean Browser Library for typical DOM operations tested to run in IE8 up to modern browsers.
This will be used to further create DOM UI libraries for browsers in the future.

## Installation

This library is packaged by npm, so it can be installed by running code below.

```shell
npm install libdom --save
```

### Webpack and other CommonJS setup

**libdom** can be required directly within webpack or browserify.
```javascript
var libdom = require("libdom");

libdom.on(global.document,
        "load",
        function (event) {
            console.log('okay, got it! ', event.target);
        });
```

### Directly embed script in HTML
**libdom** can also be directly embedded in HTML.

```html
<!doctype >

<html>
<head>
    <title>Test Libdom</title>
</head>
<body>
    <script src="node_modules/libdom/dist/libdom.min.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>
```

Non-minified version of **libdom** is located in `node_modules/libdom/dist/libdom.js`.


## More

## License

This Project is fully Open Source [MIT](https://opensource.org/licenses/MIT) licensed.

# Browser Radar

Javascript to detect and display browser/system info along with basic url sharing. Does not use modern js features/libs to maintain support
for Internet Explorer.

Uses the fabulous [UAParser.js](https://github.com/faisalman/ua-parser-js) library for detection and some basic javascript for reading url and rendering resulting data.

**Demo** - https://sparkalow.github.io/browser-radar/


# Usage

Intended to be used in client browsers (with a dom), not intended/tested in node environments.

- Include the js
- Setup html elements with `data-br-key` to mark them as containers for data output
- Call `browserRadar.init();` after the dom is ready


### Basic Template
```html
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            browserRadar.init();
        });
    </script>
    <strong>Browser</strong><span data-br-key="browser.name"></span>
    <p>Copy the link below to share with your support team.</p>
    <input data-br-share-link />
    <button data-br-copy-button>Copy to clipboard</button>
    <div data-br-copy-button-message></div>
```

## Docs

### Outputting Data

Use `data-br-key` attributes to output underlying [ua-parser.js](https://github.com/faisalman/ua-parser-js) data. The innerHTML of these elements
will be replaced with data defined by the attribute `data-br-key` value.

```
# example 
<span data-br-key="browser.name"></span> 
# becomes
<span data-br-key="browser.name">Firefox</span> 
```

### Available data keys

All data from [ua-parser.js](https://github.com/faisalman/ua-parser-js) is accessible via dot notation.
Here are some popular ones.

| Attribute Value                    | Data                        |
| -----------------------------------| ----------------------------|
| `data-br-key="browser.name"`       | Browser Name                |
| `data-br-key="browser.version"`    | Browser Version             |
| `data-br-key="os.name"`            | Operating System            |
| `data-br-key="os.version"`         | Operating System Version    |
  
    

### Share urls
Share urls can be automatically output for sharing with support teams. Share urls are simply links to the
current page with url encoded user agent strings. When viewing the page with a passed user agent string, the passed
string will be used to generate the data.


Use `data-br-copy-button` attribute on a dom element (probably a button) to cause the share url to be copied to 
the clipboard on click.

Optionally, mark a dom element with `data-br-copy-button-message` to output "Copied to clipboard!" when the copy button is clicked.

Use `data-br-share-link` on a read-only input element for outputting the share link.

---

## API

**`browserRadar.init();`** (function)
Call when the dom is ready to replace marked dom element.innerHTML with data.

An options object can be passed:<br> 
example : `browserRadar.init({logData:true, render:renderFunction});`

Options object properties:
- **`logData`** (boolean, default false)  set to true to console.log browser data. This can be useful to see available data keys.
- **`render`**  (function, default null) set this to a render function to bypass internal rendering and handle it all yourself. The set render
             function will receive the same data object used internally. You should probably just use [UAParser.js](https://github.com/faisalman/ua-parser-js) and build your own if goint this route.

**`browserRadar.getData()`** (function, returns object) retrieve browser data.

---

## Roadmap
- npm package
- support different bundling options
- tests

---

## License

MIT License

Copyright (c) 2012-2021 Brian Matthews <<brian@slapthink.net>>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
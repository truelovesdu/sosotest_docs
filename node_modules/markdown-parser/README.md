# MarkdownParser [![NPM version](https://badge.fury.io/js/markdown-parser.png)](http://badge.fury.io/js/markdown-parser) [![Build Status](https://travis-ci.org/darul75/markdown-parser.png?branch=master)](https://travis-ci.org/darul75/markdown-parser) [![Total views](https://sourcegraph.com/api/repos/github.com/darul75/markdown-parser/counters/views.png)](https://sourcegraph.com/github.com/darul75/markdown-parser)

NodeJS module markdown syntax extractor.

## Why ?

I was looking to extract links from [github markdown](https://guides.github.com/features/mastering-markdown/) readme files.

## Demo

http://darul75.github.io/markdown-parser/

## Features

Extraction of following markdown elements:
- bold
- code
- heading
- italic
- reference (link, images)
- lists
- listsOrdered
- sections
- strikethroughs
- tasks

## Install

~~~
npm install markdown-parser
~~~

## Usage

```javascript
var Parser = require('markdown-parser');

var parser = new Parser();

// options repository url
// var parser = new Parser({html_url: "https://github.com/darul75/markdown-parser"});

// fetch by api or what else
var markdownContent = ".....";

parser.parse(markdownContent, function(err, result) {
// result example
/*
{
   "bolds": [
      "No JQUERY dependency needed anymore"
   ],
   "codes": [
      {
         "type": "html",
         "code": "<script type=\"text/javascript\" src=\"angular.min.js\"></script>"
      },
      {
         "type": "html",
         "code": "<link rel=\"stylesheet\" type=\"text/css\" href=\"ng-slider.min.css\">"
      }
   ],
   "headings": [
      " Options",
      " Build",
      " Issue",
      " Metrics",
      " License"
   ],
   "italics": [],
   "references": [
      {
         "title": "![NPM version",
         "href": "https://badge.fury.io/js/ng-slider.png",
         "image": true
      },
      {
         "title": "angular slider demo",
         "href": "http://darul75.github.io/ng-slider/images/slider1.png \"angular slider demo screenshot\"",
         "image": true
      }
   ],
   "lists": [
      [
         "`from`: start value",
         "`to`: end value",
         "`step`: step value",
         "`dimension`: string, example \" $\"",
         "`scale`: array for scale",
         "`round`: how many numbers allowed after comma",
         "`smooth`: true/false; false snaps the button to value",
         "`vertical`: true/false; vertical slider, default false",
         "`css`: hash object"
      ],
      [
         "`callback` : function triggering current value, can be useful"
      ],
      [
         "2.1.3: bug fixes, refactoring, inline options param",
         "2.1.2: bug fixes, changes in z-index via CSS and not js",
         "2.1.1: override css, colors...",
         "2.1.0: bug fixes",
         "2.0.0: no JQuery"
      ]
   ],
   "listsOrdered": [],
   "sections": [
      "Why",
      "Screenshot",
      "Demo",
      "How to use it",
      "Installation",
      "RELEASE"
   ],
   "strikethroughs": [],
   "tasks": []
}

*/
  
});
```
    
## Return    
```json
{
  "bolds": [],
  "codes": [],
  "headings": [],
  "italics": [],
  "references": [],
  "lists": [],
  "listsOrdered": [],
  "sections": [],
  "strikethroughs": [],
  "tasks": []
}
```

### Options

* `html_url`: repository url, used for link references, ex: "https://github.com/darul75/markdown-parser"

## TODO
- [ ] Finish tests
- [ ] Browserify
- [ ] Missing markdown

## Metrics

[![NPM](https://nodei.co/npm/markdown-parser.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/markdown-parser/)

## License

The MIT License (MIT)

Copyright (c) 2015 Julien Valéry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

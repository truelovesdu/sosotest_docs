// pegjs  -e markdownparser markdown-grammar.pegjs parser-browser.js
// pegjs markdown-grammar.pegjs parser.js
var pegparser = require('./parser.js');
var pat = /^https?:\/\//i;


function MarkdownParser(options) {  
  Object.defineProperty(this, 'options', {writable: true, value: options || {}});
  
  this.init();
}

MarkdownParser.prototype.init = function() {
  return this;
};

MarkdownParser.prototype.parse = function(markdown, next) {
  var result = pegparser.parse(markdown);

  // relative or absolute links
  if (result && this.options.html_url && result.references) {
    var prefix = this.options.html_url;
    result.references.forEach(function(elt) {
      if (!pat.test(elt.href)) {
        elt.href = prefix + '/blob/master/' + elt.href.replace('./', '');
      }
    }); 
  }
    
  return process.nextTick(function() {
    next(null, result);
  });  
};

module.exports = MarkdownParser;
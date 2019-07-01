// test/main.js
var Parser = require('../src/markdown-parser');

var parser = new Parser();
var parserOptions = new Parser();

var assert = require("assert");

describe('tests', function() {
  describe('parsing', function() {
    it('bold', function(done) {
      parser.parse("**b** __b__", function(err, result) {                
        assert.equal(result.bolds.length, 2);
        done();
      });
    });
    it('code', function(done) {
      parser.parse("```js \n var a; \n ```", function(err, result) {                
        assert.equal(result.codes.length, 1);
        done();
      });
    });
    it('headings', function(done) {
      parser.parse("#header1 \n#header2", function(err, result) {                
        assert.equal(result.headings.length, 2);
        done();
      });
    });
    it('italics', function(done) {
      parser.parse("*iiiii*\nother\n\n *iiiii*", function(err, result) {                
        assert.equal(result.italics.length, 2);
        done();
      });
    });
    it('list', function(done) {
      parser.parse("- item1 \n- item2 \nother\n*item1\nitem2", function(err, result) {                
        assert.equal(result.lists[0].length, 2);
        done();
      });
    });      
    it('headings', function(done) {
      parser.parse("#header1 \n#header2", function(err, result) {                
        assert.equal(result.headings.length, 2);
        done();
      });
    });
    it('images full no options', function(done) {
      parser.parse("[google](http://www.google.com)", function(err, result) {
        assert.equal(result.references.length, 1);
        done();
      });
    });
    it('images full', function(done) {      
      parserOptions.parse("[google](http://www.google.com)", function(err, result) {                
        assert.equal(result.references.length, 1);
        done();
      });
    });
    it('images relative', function(done) {
      parserOptions.options = {html_url: "https://github.com/darul75/markdown-parser"};
      parserOptions.parse("[zoubida](./images/zoubida.png)", function(err, result) {                
        assert.equal(result.references.length, 1);
        assert.equal(result.references[0].href, parserOptions.options.html_url+'/blob/master/images/zoubida.png');
        parserOptions.options.html_url = "https://github.com/CMBJS/NodeBots";
        var res = parserOptions.parse("![Alt text](poster.jpg)", function(err, result) {
          assert.equal(result.references.length, 1);
          assert.equal(result.references[0].href, parserOptions.options.html_url+'/blob/master/poster.jpg');
          done();
        });
      });
    });
    it('images relative not needed', function(done) {
      parserOptions.options = {html_url: "https://github.com/darul75/markdown-parser"};
      parserOptions.parse("[zoubida](http://www.google.com/images/zoubida.png)", function(err, result) {
        assert.equal(result.references.length, 1);
        assert.equal(result.references[0].href, 'http://www.google.com/images/zoubida.png');
        done();
      });            
    });

  });
});
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['src/**/*.js', 'test/**/*.js']
    },
    // UGLIFY TASK
    uglify: {
      task1: {
       options: {
        preserveComments: 'some',
        report: 'min',
        banner: '/*! \n* @license <%= pkg.name %> - v<%= pkg.version %>\n' + 
         '* (c) 2013 Julien VALERY https://github.com/darul75/markdown-parser\n' +
         '* License: MIT \n*/\n'
        },         
        files: {'lib/markdown-parser.js': ['src/markdown-parser.js']
       }
      }
    }
});

  // LOAD PLUGINS
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');  

  // TASK REGISTER
  //grunt.registerTask('default', ['jshint', 'uglify:task1']);
  grunt.registerTask('default', []);
};

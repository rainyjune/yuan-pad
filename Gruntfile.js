module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 

  grunt.initConfig({
    // https://www.npmjs.com/package/grunt-babel
    babel: {
      // http://babeljs.io/docs/usage/options/
      options: {
        sourceMap: true,
        compact: true,
        presets: ['babel-preset-react']
      },
      dist: {
        files: {
          'themes/spa/build/index.js': 'themes/spa/src/index.js'
        }
      }
    },

    watch: {
      index: {
        files: ['themes/spa/src/index.js'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['babel']);
};

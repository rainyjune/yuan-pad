module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 

  grunt.initConfig({
    // https://www.npmjs.com/package/grunt-babel
    babel: {
      // http://babeljs.io/docs/usage/options/
      options: {
        sourceMap: false,
        compact: false,
        presets: ['babel-preset-react']
      },
      dist: {
        files: {
          'themes/spa/build/index.js': 'themes/spa/src/index.js'
        }
      }
    },

    // https://www.npmjs.com/package/grunt-contrib-uglify
    uglify: {
      index: {
        options: {
          sourceMap: true
        },
        files: {
          'themes/spa/build/index.js' : ['themes/spa/build/index.js']
        }
      }
    },

    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      index: {
        files: ['themes/spa/src/index.js'],
        tasks: ['babel', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);
};

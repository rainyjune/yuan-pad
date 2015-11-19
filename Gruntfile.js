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
      devIndex: {
        options: {
          sourceMapRoot: '../src/',
          sourceMap: true
        },
        files: {
          'themes/spa/build/index.js' : ['themes/spa/build/index.js']
        }
      },
      distIndex: {
        options: {
          sourceMap: false 
        },
        files: {
          'themes/spa/build/index.js' : ['themes/spa/build/index.js']
        }
      },
    },

    htmlmin: {
      distIndex: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'themes/spa/templates/index.php': 'themes/spa/templates/index.html'
        }
      },
      devIndex: {
        options: {
          collapseWhitespace: true
        },
        files: {
          'themes/spa/templates/index.php': 'themes/spa/templates/index.html'
        }
      }
    },

    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      indexjs: {
        files: ['themes/spa/src/index.js'],
        tasks: ['babel', 'uglify:devIndex']
      },
      indexhtml: {
        files: ['themes/spa/templates/index.html'],
        tasks: ['htmlmin:devIndex']
      }
    }
  });

  // We don't have to load babel here, because we run it at line 2.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build-dist', ['babel', 'uglify:distIndex', 'htmlmin:distIndex']);
};

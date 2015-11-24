module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'themes/spa/build/index.js': ['themes/spa/src/index.js']
        },
        options: {
          transform: [
            ['babelify', {presets: ['react']}]
          ]
        }
      }
    },
    
    env: {
      dist: {
        NODE_ENV : 'production',
      },
      dev: {
        NODE_ENV: 'development',
      } 
    },

    // https://github.com/gruntjs/grunt-contrib-sass
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'themes/spa/css/style.css': 'themes/spa/sass/style.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'themes/spa/css/style.css': 'themes/spa/sass/style.scss'
        }
      }
    },

    /*
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
    */

    // https://www.npmjs.com/package/grunt-contrib-uglify
    uglify: {
      options: {
        compress:{
          dead_code     : true,  // discard unreachable code
          drop_debugger : true,  // discard “debugger” statements
          global_defs   : {      // global definitions
            "DEBUG": false,      // matters for some libraries
          }
        }
      },
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
        tasks: ['env:dist', 'browserify:dist', 'uglify:devIndex']
      },
      indexhtml: {
        files: ['themes/spa/templates/index.html'],
        tasks: ['htmlmin:devIndex']
      },
      css: {
        files: ['themes/spa/sass/style.scss'],
        tasks: ['sass:dev'] 
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build-dist', ['sass:dist', 'env:dist', 'browserify:dist', 'uglify:distIndex', 'htmlmin:distIndex']);
};

module.exports = function(grunt) {
  
  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config.js");

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'build/index.js': ['src/index.js'],
          'build/acp.js': ['src/acp.js']
        },
        options: {
          transform: [
            ['babelify', {presets: ['es2015', 'react']}]
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
          'css/style.css': 'sass/style.scss',
          'css/acp.css': 'sass/acp.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/style.css': 'sass/style.scss',
          'css/acp.css': 'sass/acp.scss'
        }
      }
    },

    // https://www.npmjs.com/package/grunt-contrib-uglify
    uglify: {
      options: {
        
      },
      distIndex: {
        options: {
          sourceMap: false ,
          compress:{
            dead_code     : true,  // discard unreachable code
            drop_debugger : true,  // discard “debugger” statements
            global_defs   : {      // global definitions
              "DEBUG": false,      // matters for some libraries
            }
          }
        },
        files: {
          'build/index.js' : ['build/index.js'],
          'build/acp.js' : ['build/acp.js']
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
          'templates/index.php': 'templates/index.html',
          'templates/admin.php': 'templates/admin.html'
        }
      },
      devIndex: {
        options: {
          collapseWhitespace: false
        },
        files: {
          'templates/index.php': 'templates/index.html',
          'templates/admin.php': 'templates/admin.html'
        }
      }
    },
    
    webpack: {
      options: webpackConfig,
      build: {
        plugins: webpackConfig.plugins.concat(
          new webpack.DefinePlugin({
            "process.env": {
              // This has effect on the react lib size
              "NODE_ENV": JSON.stringify("production")
            }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        )
      },
      "build-dev": {
        devtool: "sourcemap",
        debug: true
      }
    },

    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      app: {
        files: ["src/*.js"],
        tasks: ["webpack:build-dev"],
        options: {
          spawn: false,
        }
      },
      indexhtml: {
        files: ['templates/index.html', 'templates/admin.html'],
        tasks: ['htmlmin:devIndex']
      },
      css: {
        files: ['sass/style.scss', 'sass/acp.scss'],
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
  grunt.loadNpmTasks("grunt-webpack");

  //grunt.registerTask('default', ['watch']);
  //grunt.registerTask('build-dist', ['sass:dist', 'env:dist', 'browserify:dist', 'uglify:distIndex', 'htmlmin:distIndex']);
  grunt.registerTask("dev", ["webpack:build-dev", "watch"]);
  grunt.registerTask("build", ['sass:dist', "webpack:build", 'htmlmin:distIndex']);
};

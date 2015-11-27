module.exports = function(grunt) {
  
  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config.js");

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
          collapseWhitespace: false
        },
        files: {
          'themes/spa/templates/index.php': 'themes/spa/templates/index.html'
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
        files: ["themes/spa/src/*.js"],
				tasks: ["webpack:build-dev"],
				options: {
					spawn: false,
				}
      },
      /*
      indexjs: {
        files: ['themes/spa/src/*.js'],
        tasks: ['browserify:dist']
      },
      */
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
  grunt.loadNpmTasks("grunt-webpack");

  //grunt.registerTask('default', ['watch']);
  //grunt.registerTask('build-dist', ['sass:dist', 'env:dist', 'browserify:dist', 'uglify:distIndex', 'htmlmin:distIndex']);
  grunt.registerTask("dev", ["webpack:build-dev", "watch"]);
  grunt.registerTask("build", ['sass:dist', "webpack:build", 'htmlmin:distIndex']);
};

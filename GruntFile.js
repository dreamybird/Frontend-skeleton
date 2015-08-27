module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),				
		
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,				
				browser: true,
				globals: {
					jQuery: true,
					$: true,
					console: true
				}
			},
			'<%= pkg.name %>': {
				src: [ 'src/js/**/*.js' ]
			},
		},
		
		concat: {
			options: {
				stripBanners: true,
				banner: '/* <%= pkg.name %> - v<%= pkg.version %> */\n'
			},
			dist: {
				src: [ 
					'bower_components/angular/angular.js',
					'src/js/*',
					'src/js/*/*'
				],
				dest: 'www-root/js/build.js'
			}
		},
		
		uglify: {
			build: {
				src: 'www-root/js/build.js',
				dest: 'www-root/js/build.min.js'
			}
		},
		
		cssmin: {
			with_banner: {
				options: {
					banner: '/* CSS */'
				},
				
				files: {
					'www-root/css/style.min.css' : [ 'bower_components/bootstrap/dist/css/bootstrap.min.css', 'src/css/*.css' ]
				}
			}
		},

		less: {
  			development: {
				files: {
      				"src/css/compiled-style.css": "src/less/style.less"
    			}
			}
		},

		watch: {
			files: [
				'src/*/*',
				'src/*/*/*',
				'www-root/*'
			],
			tasks: ['jshint', 'concat', 'uglify', 'less', 'cssmin'],
			options: { livereload: true }
		},
	
		connect: {
    		server: {
      			options: {
        			port: 9000,
        			base: 'www-root',
      			}
    		}
		},

		lineremover: {
			html: {
		    	files: [
		        	{
		            	expand: true,
		            	cwd: 'www-root/',
		            	src: ['**/*.html'],
		            	dest: 'www-root/',
		            	ext: '.html'
		          	}
		        ]
			}
		},
		
	
	});
	
	// Загрузка задач
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-line-remover');
	grunt.loadNpmTasks('grunt-contrib-less');
	
	// Задачи по умолчанию
	grunt.registerTask("default", ['jshint', 'concat', 'uglify', 'less', 'cssmin', 'lineremover', 'watch']);
	
	// Запустить простой веб - сервер
	grunt.registerTask("server", ['connect::server', 'watch']);	
}
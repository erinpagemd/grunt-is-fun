'use-strict';

module.exports = function(grunt) {

  // Load the plugin that provides the task.
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    connect: {
      options: {
        port: 3333,
        base: 'public',
        hostname: 'localhost',
        useAvailablePort: true,
        open: true
      },
      server: {
        options: {
          livereload: true
        }
      }
    }, //end connect
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'package.json'],
        options: {
          reload: true
        }
      },
      other: {
        files: ['app/**', '!app/**/*.jade', '!app/styles/**'],
        tasks: ['copy']
      },
      livereload: {
        options: {lifereload: true},
        files: ['public/{,*/}*.{html,css,js}']
      },
      jade: {
        files: ['app/**/*.jade'],
        tasks: ['jade']
      },
      sass: {
        files: ['app/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass']
      }
    }, //end watch
    clean: ['public'],//end clean
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['**', '!**/*.jade', '!**/*.{sass,scss}'], dest: 'public/', filter: 'isFile'}
        ]
      }
    },//end copy
    jade: {
      compile: {
        files: [
          {expand: true, cwd: 'app/', src: ['**/*.jade', '!**/_*.jade'], dest: 'public/', ext: '.html'}
        ]
      }
    },// end jade
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
            'public/css/main.css': 'app/css/main.scss'
        }
      }
    }//end sass
  });//end initConfig

  // Default task(s).
  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean', 'copy', 'jade', 'sass']);
  grunt.registerTask('serve', ['build', 'connect:server', 'watch']);

};//end module.exports

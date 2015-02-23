'use-strict';

module.exports = function(grunt) {
  
  // Load the plugin that provides the task.
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
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

};//end module.exports
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: "package.json",
    jshint: {
      files: ['Gruntfile.js', 'src/server/index.js', 'src/server/main/**/*.js', 'src/server/test/*.js'],
      options: {
        force: true
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false
        },
        src: ['src/server/test/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['jshint', 'mochaTest']);

};

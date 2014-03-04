module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  var transport = require('grunt-cmd-transport');
  var style = transport.style.init(grunt);
  var text = transport.text.init(grunt);
  var script = transport.script.init(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    transport : {
      options : {
        paths : ['.'],
        alias: '<%= pkg.spm.alias %>',
        parsers : {
          '.js' : [script.jsParser],
          '.css' : [style.css2jsParser],
          '.html' : [text.html2jsParser]
        }
      },
      app: {
        options: {
          idleading: '<%= pkg.name %>/app/'
        },
        files: [{
          cwd: 'assets/js/app',
          src: ['**/*'],
          filter: 'isFile',
          dest: '.build/app'
        }]
      },
    module: {
        options: {
          idleading: '<%= pkg.name %>/module/'
        },
        files: [{
          cwd: 'assets/js/module',
          src: '**/*',
          filter: 'isFile',
          dest: '.build/module'
        }]
      }
    },
    concat : {
      options : {
        paths : ['.'],
        include: 'relative'
      },
      app: {
        files: [{
          expand: true,
          cwd: '.build',
          src: ['app/**/*.js', '!app/mods/**/*', '!app/tmpl/**/*'],
          dest: 'assets/js/dest',
          ext: '.js'
        }]
      }
    },
    uglify : {
      app: {
        files: [{
          expand: true,
          cwd: 'assets/js/dest',
          src: ['app/**/*.js', '!app/**/*-debug.js'],
          dest: 'assets/js/dest',
          ext: '.js'
        }]
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'assets/css',
        src: ['*.css', '!*.min.css'],
        dest: 'assets/css',
        ext: '.min.css'
      }
    },
    watch: {
      seajs: {
        files: '**/*.js',
        tasks: ['transport', 'concat', 'uglify', 'cssmin', 'clean'],
        options: {
          cwd: 'assets/js/app',
          livereload: true
        }
      },
      compass: {
        files: '**/*.scss',
        tasks: ['compass'],
        options: {
          cwd: 'assets/sass',
          livereload: true
        }
      }
    },
    clean : {
      spm: ['.build']
    }
  });

  grunt.registerTask('build', ['transport', 'concat', 'uglify', 'cssmin', 'clean']);
  grunt.registerTask('buildx', ['transport', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('sass', ['compass']);
  grunt.registerTask('watchSass', ['watch:compass']);
  grunt.registerTask('watchSeajs', ['watch:seajs']);
  grunt.registerTask('default', ['clean']);

};

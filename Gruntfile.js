'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        options: {
          jshintrc: 'lib/.jshintrc'
        },
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit', 'closureCompiler', 'closureBuilder']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      }
    },
    closureCompiler: {
      options: {
        // [REQUIRED] Path to closure compiler
        compilerFile: 'node_modules/fast-closure-compiler/closure-compiler/compiler.jar',

        // [OPTIONAL] set to true if you want to check if files were modified
        // before starting compilation (can save some time in large sourcebases)
        checkModified: false,

        // [OPTIONAL] Set Closure Compiler Directives here
        compilerOpts: {
          /**
           * Keys will be used as directives for the compiler
           * values can be strings or arrays.
           * If no value is required use null
           *
           * The directive 'externs' is treated as a special case
           * allowing a grunt file syntax (<config:...>, *)
           *
           * Following are some directive samples...
           */
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          //externs: [],
          define: ["'goog.DEBUG=false'"],
          warning_level: 'verbose',
          //jscomp_off: [],
          output_wrapper: "'(function(){%output%}).call(this);'"
        }
      },
      // any name that describes your task
      target: {
        // [OPTIONAL] Target files to compile. Can be a string, an array of strings
        // or grunt file syntax (<config:...>, *)
        src: 'lib/closure.js',

        // [OPTIONAL] set an output file
        dest: 'dist/closure.js'
      }
    },

    closureBuilder:  {
      options: {
        // [REQUIRED] To find the builder executable we need either the path to
        //    closure library or directly the filepath to the builder:
        closureLibraryPath: 'closure-library',
        // [OPTIONAL] You can define an alternative path of the builder.
        //    If set it trumps 'closureLibraryPath' which will not be required.
        //builder: 'path/to/closurebuilder.py',

        // [REQUIRED] One of the two following options is required:
        //inputs: 'string|Array', // input files (can just be the entry point)
        inputs: 'lib/notepad.js',
        //namespaces: 'string|Array', // namespaces

        // [OPTIONAL] The location of the compiler.jar
        // This is required if you set the option "compile" to true.
        compilerFile: '<%= closureCompiler.options.compilerFile %>',

        // [OPTIONAL] output_mode can be 'list', 'script' or 'compiled'.
        //    If compile is set to true, 'compiled' mode is enforced.
        //    Default is 'script'.
        //output_mode: 'list',

        // [OPTIONAL] if we want builder to perform compile
        compile: true, // boolean
        compilerOpts: '<%= closureCompiler.options.compilerOpts %>'
      },
      // any name that describes your operation
      target: {
        // [REQUIRED] paths to be traversed to build the dependencies
        src: ['closure-library/', 'lib/'],

        // [OPTIONAL] if not set, will output to stdout
        dest: 'dist/notepad.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-closure-tools');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'closureCompiler', 'closureBuilder']);

};

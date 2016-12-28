'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // --------------------------------------------------------------------

    /**
     * Collecting files into collections for an easy processing
     * ------------------------------------------
     */
    var configFiles = [
            '<%= vdcPortal.mainFolder %>/*.js'
        ],
        VDCScripts = [
            // Directives and page scripts
            '<%= vdcPortal.mainFolder %>/app/**/*.js'
        ],
        lessFiles = [
            '<%= vdcPortal.mainFolder %>/assets/css/less/**/*.less'
        ];

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project Settings
        vdcPortal: {
            // configurable paths
            mainFolder: '.',
            app: 'app',
            dist: 'dist',

            // For banners (uglify, concat...)
            name: 'VDC-Portal-Management',
            version: '1.0'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            configFiles: {
                files: configFiles,
                tasks: ['lint']
            },
            VDCFiles: {
                files: VDCScripts,
                tasks: ['lint']
            },
            less: {
                files: lessFiles,
                tasks: ['less:globalFiles']
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                configFiles,
                VDCScripts
            ]
        },

        gjslint: {
            options: {
                reporter: {
                    name: 'console'
                },
                flags: [
                    '--flagfile .gjslintrc' //use flag file'
                ],
                force: false
            },
            all: [
                '<%= vdcPortal.mainFolder %>/*.js',
                '<%= vdcPortal.app %>/*.js',
                '<%= vdcPortal.app %>/**/*.js'
            ]
        },

        // Compile LESS files into CSS
        less: {
            globalFiles: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    relativeUrls: true
                },
                files: {
                    '<%= vdcPortal.mainFolder %>/assets/css/style.css':
                        '<%= vdcPortal.mainFolder %>/assets/css/less/style.less',

                    '<%= vdcPortal.mainFolder %>/assets/css/theme.css':
                        '<%= vdcPortal.mainFolder %>/assets/css/less/theme.less',

                    '<%= vdcPortal.mainFolder %>/assets/css/ui.css':
                        '<%= vdcPortal.mainFolder %>/assets/css/less/ui.less',
                }
            }
        },

        // Test settings
        karma: {
            unit: {
                configFile: '<%= vdcPortal.mainFolder %>/test/config/karma.unit.conf.js'
            }
        }
    });

    /**
     * Register main build task
     * ------------------------------------------
     */
    //grunt.registerTask('build', [] );

    /**
     * Unit tests task
     * ------------------------------------------
     */
    grunt.registerTask('test-unit', [
        'karma:unit'
    ]);

    grunt.registerTask('lint', [
        'jshint',
        'gjslint'
    ]);
};

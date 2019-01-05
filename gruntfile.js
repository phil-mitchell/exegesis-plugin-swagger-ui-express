'use strict';

const path = require( 'path' );

//const is_ci = process.env.CI === 'true';
const is_shippable = process.env.SHIPPABLE === 'true';

var coverage_dir = is_shippable ? './shippable/codecoverage' : './coverage';

module.exports = function( grunt ) {
    grunt.initConfig({
        clean: [ 'coverage', 'shippable', 'xunit.xml' ],
        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: path.resolve( __dirname, 'coverage/instrument' ),
                REPORT_DIR_FOR_CODE_COVERAGE: path.resolve( __dirname, 'coverage/reports' )
            }
        },
        mkdir: {
            report: {
                options: {
                    create: [ path.dirname( process.env.XUNIT_FILE || './xunit.xml' ) ]
                }
            }
        },
        express: {
            test: {
                options: {
                    script: './test/app.js'
                }
            }
        },
        instrument: {
            files: 'src/**/*.js',
            options: {
                lazy: false,
                basePath: './coverage/instrument/'
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec-xunit-file'
            },
            test: {
                src: [ 'src/**/*.spec.js', 'test/**/*.spec.js' ]
            }
        },
        storeCoverage: {
            options: {
                dir: './coverage/reports',
                'include-all-sources': true
            }
        },
        makeReport: {
            src: './coverage/reports/**/*.json',
            options: {
                type: 'cobertura',
                dir: coverage_dir,
                print: 'detail'
            }
        }
    });
    grunt.loadNpmTasks( 'grunt-express-server' );
    grunt.loadNpmTasks( 'grunt-mocha-test' );
    grunt.loadNpmTasks( 'grunt-istanbul' );
    grunt.loadNpmTasks( 'grunt-env' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-mkdir' );

    grunt.registerTask( 'dummyCoverage', () => {
        global['__coverage__'] = {};
    });

    grunt.registerTask( 'integration', [ 'express:test', 'mkdir:report', 'mochaTest', 'express:test:stop' ] );
    grunt.registerTask( 'default', [ 'clean', 'integration' ] );
    grunt.registerTask( 'coverage', [ 'clean', 'env:coverage', 'instrument', 'integration', 'dummyCoverage', 'storeCoverage', 'makeReport' ] );
};

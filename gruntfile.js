'use strict';

//const is_ci = process.env.CI === 'true';
//const is_shippable = process.env.SHIPPABLE === 'true';

module.exports = function( grunt ) {
    grunt.initConfig({
        express: {
            test: {
                options: {
                    script: './test/app.js'
                }
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec-xunit-file'
            },
            test: {
                src: [ './src/**/*.spec.js',
                       './test/**/*.spec.js' ]
            }
        }
    });
    grunt.loadNpmTasks( 'grunt-express-server' );
    grunt.loadNpmTasks( 'grunt-mocha-test' );
    grunt.registerTask( 'default', [ 'express:test', 'mochaTest' ] );
};

'use strict';

var expect = require( 'chai' ).expect;
var require_helper = require( '../require_helper' );
var index = require_helper( 'index' );

describe( 'No app in options', function() {
    before( function() {
        this.plugin = index({});
    });
    it( 'throws an error', function() {
        expect( this.plugin.makeExegesisPlugin ).to.throw( 'options.app is not an Express app' );
    });
});

describe( 'No path in options', function() {
    before( function() {
        this.plugin = index({
            app: {
                use: ( path ) => { this.usedPath = path; }
            }
        });
        this.plugin.makeExegesisPlugin().preCompile({ apiDoc: {} });
    });
    it( 'uses / as default path', function() {
        expect( this.usedPath ).to.equal( '/' );
    });
});

describe( 'path in options', function() {
    before( function() {
        this.plugin = index({
            app: {
                use: ( path ) => { this.usedPath = path; }
            },
            path: '/foo/bar'
        });
        this.plugin.makeExegesisPlugin().preCompile({ apiDoc: {} });
    });
    it( 'uses /foo/bar as path', function() {
        expect( this.usedPath ).to.equal( '/foo/bar' );
    });
});

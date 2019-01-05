'use strict';

var superagent = require( 'superagent' );
var expect = require( 'chai' ).expect;

describe( 'No options', function() {
    it( 'renders HTML', function( done ) {
        superagent
        .get( 'http://localhost:3000/api-doc' )
        .end( function( e, res ) {
            expect( e ).to.be.null;
            expect( res.text ).to.contain( '<title>Swagger UI</title>' );
            expect( res.text ).to.contain( '.swagger-ui .topbar .download-url-wrapper { display: none }' );
            done();
        });
    });
    it( 'contains the Pet Store API', function( done ) {
        superagent
        .get( 'http://localhost:3000/api-doc/swagger-ui-init.js' )
        .end( function( e, res ) {
            expect( e ).to.be.null;
            expect( Buffer.isBuffer( res.body ) ).to.be.true;
            expect( res.body.toString() ).to.contain( '"/pets"' );
            expect( res.body.toString() ).to.contain( '"Pet"' );
            done();
        });
    });
});

describe( 'Custom title', function() {
    it( 'renders HTML', function( done ) {
        superagent
        .get( 'http://localhost:3000/api-doc-title' )
        .end( function( e, res ) {
            expect( e ).to.be.null;
            expect( res.text ).to.contain( '<title>Petstore API</title>' );
            expect( res.text ).to.contain( '.swagger-ui .topbar .download-url-wrapper { display: none }' );
            done();
        });
    });
    it( 'contains the Pet Store API', function( done ) {
        superagent
        .get( 'http://localhost:3000/api-doc-title/swagger-ui-init.js' )
        .end( function( e, res ) {
            expect( e ).to.be.null;
            expect( Buffer.isBuffer( res.body ) ).to.be.true;
            expect( res.body.toString() ).to.contain( '"/pets"' );
            expect( res.body.toString() ).to.contain( '"Pet"' );
            done();
        });
    });
});

describe( 'Explorer', function() {
    it( 'renders HTML', function( done ) {
        superagent
        .get( 'http://localhost:3000/api-doc-explorer' )
        .end( function( e, res ) {
            expect( e ).to.be.null;
            expect( res.text ).to.contain( '<title>Swagger UI</title>' );
            expect( res.text ).to.not.contain( '.swagger-ui .topbar .download-url-wrapper { display: none }' );
            done();
        });
    });
    it( 'contains the Pet Store API', function( done ) {
        superagent
        .get( 'http://localhost:3000/api-doc-explorer/swagger-ui-init.js' )
        .end( function( e, res ) {
            expect( e ).to.be.null;
            expect( Buffer.isBuffer( res.body ) ).to.be.true;
            expect( res.body.toString() ).to.contain( '"/pets"' );
            expect( res.body.toString() ).to.contain( '"Pet"' );
            done();
        });
    });
});


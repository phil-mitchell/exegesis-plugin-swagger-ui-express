'use strict';

const express = require( 'express' );
const exegesisExpress = require( 'exegesis-express' );
const http = require( 'http' );
const path = require( 'path' );

async function createServer() {
    const app = express();

    const options = {
        controllers: {},
        allowMissingControllers: true,
        plugins: [
            require( '../src/index.js' )({
                app: app,
                path: '/api-doc'
            }),
            require( '../src/index.js' )({
                app: app,
                path: '/api-doc-title',
                swaggerUIOptions: {
                    customSiteTitle: 'Petstore API'
                }
            }),
            require( '../src/index.js' )({
                app: app,
                path: '/api-doc-explorer',
                swaggerUIOptions: {
                    explorer: true
                }
            })
        ]
    };

    const exegesisMiddleware = await exegesisExpress.middleware(
        path.resolve( __dirname, './petstore.yaml' ),
        options
    );

    app.use( exegesisMiddleware );
    // Return a 404
    app.use( ( req, res ) => {
        res.status( 404 ).json({ message: `Not found` });
    });

    // Handle any unexpected errors
    app.use( ( err, req, res, next ) => {
        res.status( 500 ).json({ message: `Internal error: ${err.message}` });
        next();
    });

    const server = http.createServer( app );

    return server;
}

createServer()
.then( server => {
    server.listen( 3000 );
    console.log( 'Listening on port 3000' );
    console.log( 'Try visiting http://localhost:3000/api-docs' );
})
.catch( err => {
    console.error( err.stack );
    process.exit( 1 );
});

'use strict';
const swaggerUi = require( 'swagger-ui-express' );

class SwaggerUIPlugin {
    constructor( options ) {
        this._options = options;

        if( !this._options.app || typeof( this._options.app.use ) !== 'function' ) {
            throw new Error( 'options.app is not an Express app' );
        }
    }

    preCompile({ apiDoc }) {
        this._options.app.use(
            this._options.path || '/',
            swaggerUi.serve,
            swaggerUi.setup( apiDoc, this._options.swaggerUIOptions || {})
        );
    }
}

module.exports = function plugin( options ) {
    return{
        info: {
            name: 'exegesis-plugin-swagger-ui-express'
        },
        options: options,
        makeExegesisPlugin: function makeExegesisPlugin() {
            return new SwaggerUIPlugin( options );
        }
    };
};

# exegesis-plugin-swagger-ui-express

## Description

Adds exegesis support for the Swagger UI using Express.

## Installation

```sh
npm install exegesis-plugin-swagger-ui-express
```

## Example

Add this to your Exegesis options:

```js
const exegesisSwaggerUIPlugin = require( 'exegesis-plugin-swagger-ui-express' );

options = {
    plugins: [
        exegesisSwaggerUIPlugin({
            // Express app (required)
            app: app,

            // URL path to expose API docs (default /)
            path: '/api-docs',

            // Options to pass to Swagger UI
            swaggerUIOptions: {
                explorer: true
            }
            
        })
    ]
};
```

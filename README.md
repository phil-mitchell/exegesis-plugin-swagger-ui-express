# exegesis-plugin-swagger-ui-express

[![Run Status](https://api.shippable.com/projects/5c3011d2302eb707003b9ffe/badge?branch=master)]()
[![Coverage Badge](https://api.shippable.com/projects/5c3011d2302eb707003b9ffe/coverageBadge?branch=master)]()
![](https://img.shields.io/github/issues/phil-mitchell/exegesis-plugin-swagger-ui-express.svg)
![](https://img.shields.io/github/license/phil-mitchell/exegesis-plugin-swagger-ui-express.svg)
![](https://img.shields.io/node/v/exegesis-plugin-swagger-ui-express.svg)
![](https://img.shields.io/npm/dependency-version/exegesis-plugin-swagger-ui-express/swagger-ui-express.svg)

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

# Serverless Book API
__Description__  
Serverless bookapi was an existing Express.js API, [github.com/Tochukz/ojlinks-api](https://github.com/Tochukz/ojlinks-api), that was converted to a Serverless API.   
The details that follows describes how it was adapted to work in a serverless environment.  

__Setup the Environment__  
See the _readme_ document at [github.com/Tochukz/serverless-framework](https://github.com/Tochukz/Cloud-Architecture/tree/master/Serverless-Framework) to learn how to setup your local environment for serverless development.  

__Installing project dependencies__  
```
$ npm install serverless-http
$ npm install --save-dev serverless-offline

``` 
__Add the serverless.yaml__  
```
org: tochukz
app: serverless-bookapp
service: serverless-bookapp
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs14.x

functions:
  api:
    handler: handler.handler
    events:
      - httpApi: '*'
      
plugins:
  - serverless-off
```

__Create the handler__  
```
const serverless = require('serverless-http');
const app = require('./app');
module.exports.handler = serverless(app);
``` 

__Add script to you packge.json__  
```
...
"scripts": {
  ...
  "local": "export ENV=staging && npx serverless offline start"
},
...

```  

__Start your serverless application offline__  
```
$ npm run local
```
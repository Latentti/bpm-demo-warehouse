# latentti-camunda-template
The following project serves as a boilerplate for Latentti Oy Camunda projects built with an external Node.js service.

## **Getting started**

### Prerequisites
* [Node](https://nodejs.org/en/) - Node.js
* [Camunda](https://camunda.com/developers/getting-started/) - Camunda

### Installing
Clone Git repo and install dependencies using NPM:
```
npm install
```

### Config
All configurations are consumed as environment variables. To ease configuration dotenv is used. You can find an example environment file called .env.example

### Running the service
The service should be started with NPM to benefit from nodemon. Upon startup all diagrams are deployed if ```CAMUNDA_DEPLOY=true```.
```
npm start
```

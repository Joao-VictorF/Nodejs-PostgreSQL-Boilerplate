
# API Boilerplate - Node.js + Express + PostgresSQL

## Modify this Boilerplate

- Edit the [Database Config file](https://github.com/Joao-VictorF/Nodejs-PostgreSQL-Boilerplate/tree/main/src/database/config/config.json)

- Edit the .env file

## How To?

Start the server

```
npm run start:dev
```  

Create a model and its migration

```
npx sequelize-cli model:generate --name MODEL --attributes bar:string,foo:string
```

Run migrations

```
npm install -g sequelize-cli
npm install -g pg

npx sequelize-cli db:migrate
```

Test email (remember to edit the test file with your email)
```
npm run test:email
```

Commit a change with commitizen

```
npm run commit
```

### Package list

| Package                    | Description                                                                                                                                                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bcrypt](https://www.npmjs.com/package/bcrypt)                     | Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.                                                                                 |
| [cors](https://www.npmjs.com/package/cors)                       | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.                                                                                              |
| [crypto-random-string](https://www.npmjs.com/package/crypto-random-string)       | Generate a cryptographically strong random string                                                                                                                                                                       |
| [dotenv](https://www.npmjs.com/package/dotenv)                     | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.       |
| [nodemailer](https://www.npmjs.com/package/nodemailer)            | Send e-mails from Node.js – easy as cake! 🍰✉️ |
| [email-templates](https://www.npmjs.com/package/email-templates)            | Create, preview, and send custom email templates for Node.js. Highly configurable and supports automatic inline CSS, stylesheets, embedded images and fonts, and much more! Made for sending beautiful emails with Lad. |
| [express](https://www.npmjs.com/package/express)                    | Fast, unopinionated, minimalist web framework for node.                                                                                                                                                                 |
| [body-parser](https://www.npmjs.com/package/body-parser)                    | Parse incoming request bodies in a middleware before your handlers, available under the req.body property.                                                                                                                                                                 |
| [pg](https://www.npmjs.com/package/pg)                    | Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.                                                                                                                                                                 |
| [sequelize](https://www.npmjs.com/package/sequelize)                    | Sequelize is a promise-based Node.js ORM tool for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.                                                                                                                                                                 |
| [http-status-codes](https://www.npmjs.com/package/http-status-codes)          | Constants enumerating the HTTP status codes.                                                                                                                                                                            |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)               | This was developed against draft-ietf-oauth-json-web-token-08. It makes use of node-jws                                                                                                                                 |
| [module-alias](https://www.npmjs.com/package/module-alias)               | Create aliases of directories and register custom module paths in NodeJS like a boss!                                                                                                                                   |
| [moment](https://www.npmjs.com/package/moment)                     | A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.                                                                                                                      |
| [validator](https://www.npmjs.com/package/validator)                  | A library of string validators and sanitizers.                                                                                                                                                                          |
| [winston](https://www.npmjs.com/package/winston)                    | A logger for just about everything.                                                                                                                                                                                     |
| [morgan](https://www.npmjs.com/package/morgan)  | HTTP request logger middleware for node.js


## Features

- Database management with Sequelize

- No callback hell. All promise based

- Logs with levels in separated files

- Modules paths with Aliases. No more "require('../../../../some/very/deep/module')"

- Easy email send using templates with pug and attachments!
  
  

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
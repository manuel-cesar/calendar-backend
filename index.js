const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

//Create express server
const app = express();

//Database
dbConnection();

//Public directory
app.use( express.static('public') );


//Body lecture and parse
app.use( express.json() );


//Routes
//---Auth---
app.use('/api/auth', require('./routes/auth') );


//CRUD: Events.


//Listen requests
app.listen( process.env.PORT, () =>{
    console.log(`Server running in port: ${ process.env.PORT }`)
} );
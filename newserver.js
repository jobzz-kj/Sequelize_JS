const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const _USERS = require('./users.json');

const app = express();
const port = 8001;

const connection = new Sequelize('db','user','pass',{
    host:'localhost',
    dialect:'sqlite',
    storage:'db-sqlite',
    operatorsAliases:false,
    define: {
        freezeTableName:true
    }
})

//create model user
const User = connection.define('User',{
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:Sequelize.STRING,
        validate:{
            isAlphanumeric:true
        }
    }
})

//Sync Model with database--we can remove authenticate as
//Sync will perform authenticate internally
connection.sync({
  //  logging:console.log,
   // force:true
})
.then(()=>{
    User.bulkCreate(_USERS)
    .then(()=>{
        console.log('Success adding the users');
    })
    .catch(error =>{
        console.log(error);
    })
})

// .then(()=>{
//     User.create({
//         name:'Joe',
//         bio:'New bio entry'
//     })
// })
.then(()=>{
    console.log('Connection establised successfully');
})
.catch(err=>{
    console.log('Unable to connect to db ',err);
});

app.listen(port, ()=>{
    console.log('Running server on port '+port);
})
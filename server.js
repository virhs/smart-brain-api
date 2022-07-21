const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const onRegister = require('./controllers/register');
const onSignin = require('./controllers/signin');
const onSearch = require('./controllers/profile');
const onImage = require('./controllers/entry-count');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'virmani5',
      database : 'smart-brain'
    }
  })


const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/',(req,res)=>{
    res.json(db)
})

app.post('/signin',(req,res)=>{onSignin(req,res,bcrypt,db)})


app.post('/register',(req,res)=>{onRegister(req,res,bcrypt,db)});

app.get('/profile/:id',(req,res)=>{onSearch(req,res,db)})

app.put('/image',(req,res)=>{onImage(req,res,db)})

app.listen(3000,()=>{
    console.log('server is running');
});
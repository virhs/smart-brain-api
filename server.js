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
      host : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  })


const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/',(req,res)=>{
    res.json('its working')
})

app.post('/signin',(req,res)=>{onSignin(req,res,bcrypt,db)})


app.post('/register',(req,res)=>{onRegister(req,res,bcrypt,db)});

app.get('/profile/:id',(req,res)=>{onSearch(req,res,db)})

app.put('/image',(req,res)=>{onImage(req,res,db)})

app.listen(process.env.PORT || 3000,()=>{
    console.log('server is running',process.env.PORT);
});
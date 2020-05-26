const express = require('express')
require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool()

const app = express()

app.get('/', (req, res)=> {
    pool
        .query('SELECT * FROM users')
        .then(data => res.json(data))
        .catch(err => console.log(err.message))
})



const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('server is running' + port)
})
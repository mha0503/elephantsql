const express = require('express')
require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool()

const app = express()

app.get('/', (req, res)=> {
    pool
        .query('SELECT * FROM users')
        .then(data => res.json(data.rows))
        .catch(err => console.log(err))
})

app.get('/', (req, res)=> {
    const {id} = req.params
    pool
        .query('SELECT * FROM user WHERE id=$1', [id])
        .then(data => res.json(data.rows))
        .catch(err => console.log(err))
})

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('server is running' + port)
})
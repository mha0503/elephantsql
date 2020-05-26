const express = require('express')
require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool()

var bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.get('/', (req, res)=> {
    pool
        .query('SELECT * FROM orders')
        .then(data => res.json(data.rows))
        .catch(err => console.log(err))
})

app.get('/', (req, res)=> {
    const {id} = req.params
    pool
        .query('SELECT * FROM orders WHERE id=$1', [id])
        .then(data => res.json(data.rows))
        .catch(err => console.log(err))
})

app.post('/', (req, res)=> {
    const {first_name, last_name, age} = req.body
    pool
        .query('INSERT INTO users (first_name, last_name, age) Values($1,$2,$3) RETURNING *', [first_name, last_name, age])
        .then(data => res.json(data.rows))
        .catch(err => console.log(err))
})

app.put('/:id', (req, res)=> {
    const {id} = req.params
    const {first_name, last_name, age} = req.body
    pool
        .query('UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *', [first_name, last_name, age, id])
        .then(data => res.json(data.rows))
        .catch(err => console.log(err))
})

app.delete('/:id', (req, res)=> {
    const {id} = req.params

    pool
        .query('DELETE FROM users WHERE id=$1 RETURNING *', [id])
        .then(data => res.json(data.rows))
        .catch(err => console.log(err))
})


const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('server is running' + port)
})
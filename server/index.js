
require('dotenv').config() // Čita .env datoteku i učitava varijable okoline
const express = require('express') // Framework za server
const cors = require('cors') // Middleware za dozvolu CORS zahtjeva
const { Pool } = require('pg') // PostgreSQL connection pool

const app = express()
app.use(cors()) // Omogućava pristup API iz drugih domena (frontend)
app.use(express.json()) // Omogućava parsiranje JSON tijela zahtjeva

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
})

app.post('/items', async (req, res) => {
  const { name, description } = req.body //podaci koji se pošalju iz front-enda kao zahtjev
  try {
    await pool.query('INSERT INTO items (name, description) VALUES ($1, $2)', [name, description]) //izvršavanje upita na BP
    res.status(201).json({ message: 'Item created' }) //uspjeh
  } catch (err) {
    res.status(500).json({ error: err.message }) //greška
  }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`)
})


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
  
  try {
    await pool.query(`INSERT INTO items (name, description) VALUES ($1, $2)`) //izvršavanje upita na BP
    res.status(201).json({ message: 'Item created' }) //uspjeh
  } catch (err) {
    res.status(500).json({ error: err.message }) //greška
  }
})
 app.post('/objava', async (req, res) =>{
    const username = req.body.username
    const email = req.body.email

    try {
    await pool.query(`INSERT INTO users (username, email) VALUES (${username}, ${email})`) //izvršavanje upita na BP
    res.status(201).json({ message: 'Item created' }) //uspjeh
    } catch (err) {
    res.status(500).json({ error: err.message }) //greška
    }
  }
)


javascript
app.post('/verify-password', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Query database for user by email
    const query = `SELECT userid, hashed_password FROM users WHERE email = ${email}`;
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.hashed_password);

    if (isValid) {
      res.json({ success: true, message: 'Password verified' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});






const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`)
})


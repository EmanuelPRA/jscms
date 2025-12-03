const bcrypt = require('bcrypt')
require('dotenv').config() // Čita .env datoteku i učitava varijable okoline
const express = require('express') // Framework za server
const cors = require('cors') // Middleware za dozvolu CORS zahtjeva
const { Pool } = require('pg') // PostgreSQL connection pool
const multer = require('multer')
const path = require('path')

const app = express()
app.use(cors()) // Omogućava pristup API iz drugih domena (frontend)
app.use(express.json()) // Omogućava parsiranje JSON tijela zahtjeva
app.use(express.static(path.join(__dirname, 'public/images')))

const storage = multer.diskStorage({
  destination: (req,file, cb) =>{
    cb(null, 'public/images')
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})


const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
})       

/*-------------------------------------CRUD on stories-------------------------------------*/
//CREATE
app.post("/post", upload.single("thumbnail"), async (req, res)=>{
    try {
      const {title, content, author, theme} = req.body
      
      const file = req.file;
      if (!file) {
      return res.status(400).json({ error: "Thumbnail image is required" });
      }

      const thumbnailPath = file.filename;
      pool.query(`INSERT INTO story (title, storycontent, author, theme, thumbnail) VALUES 
        ('${title}','${content}',${author},${theme},'${thumbnailPath}')`)
      res.status(201).json({message: "Post successfully added"})
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error creating post" });
    }
})


//READ
app.get("/stories", async (req, res)=>{
  try {
    if (typeof(req.body.theme) !== "undefined") {
      result = await pool.query(`SELECT * FROM posts WHERE theme='${req.body.theme}'`)  
    }else{
      result = await pool.query(`SELECT * FROM posts`)
    }
    res.send(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Server Error"})
  }
  
})

//UPDATE
app.post("/updatePost", async (req, res)=>{
    const {ID, title, content, thumbnail, author, theme} = req.body

    try {
      await pool.query(`UPDATE posts SET
                        title='${title}'
                        content='${content}'
                        thumbnail='${thumbnail}'
                        author=${author}
                        theme=${theme}
                      WHERE postID=${ID}`)
      res.status(200).json({message: "Story successfully posted"})
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "Server Error!", err: error})
    }
})


//DELETE
app.delete("/deletPost", async (req, res) =>{
  const ID = req.body.postID
  try{
    pool.query(`DELETE FROM posts WHERE postID =${ID}`)
  }catch{

  }
})

/*-------------------------------------Admin auth-------------------------------------*/


app.post("/login", async (req, res) =>{
  const {email, password} = req.body

  try {
    const result = await pool.query(`SELECT userid, username, email, pass FROM admins WHERE email='${email}'`)
    if (result.rows.length == 0) {
      return res.status(401).json({message: "Authentification error"})
    }

    const user = result.rows[0]
    if (await bcrypt.compare(password, user.password)) {
      res.send(result)
    }else{
      res.status(401).json({message: "Incorrect password!"})

    }

  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Server Error!"})
  }

})

//TODO Set up a 1st level admin(complete control over admin accounts)



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`)
})


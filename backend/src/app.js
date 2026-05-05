const express = require('express')
const cors = require('cors')

require("dotenv").config();

const app = express()

// middleware  
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// routes
app.get('/api/health', (req, res) =>{
    res.send('server ok')
})

// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`)
})
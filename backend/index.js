const connectToMongo = require('./db');
const express = require('express');
const path = require('path');
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

// For image to see in browser also
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Available Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/notes', require('./routes/notes.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/posts', require('./routes/post.routes'))

app.listen(port, ()=>{
    console.log(`Example app listeningat http://localhost:${port}`)
})

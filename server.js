var routes = require('./routes')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

var cors = require('cors')
app.use(cors())
app.use(express.json())

app.use('/api/v1/', routes)

app.listen(port, () => console.log(`Hauscore Backend is listening on jean's back port: ${port}!`));
const express = require('express')
const cors = require('cors')
const models = require('./app/src/models/index')
const app = express()
const port = 3000;

const corsOptions = {
  origin: '*',
  credentials: true,
}

// register middleware
app.use(cors(corsOptions))
app.use(express.json())

// server
app.listen(port, () => {
  console.log(`Rest API listening on port ${port}`)
})

// connection
models.mongoose.connect(models.url)
  .then(async () => {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.log(`Error! --> ${err.message}`)
    process.exit()
  });

// routes
require('./app/src/routes/user.routes')(app); // URL for users
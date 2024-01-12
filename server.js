const express = require('express');
const cors = require('cors');
const models = require('./app/models/index');   
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
};

// register middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());

// connection

// FIXME:
// const mongooseConfig = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }

models.mongoose.connect(models.url)
    .then(() => {
        console.log('Connected to database')
    })
    .catch((err) => {
        console.log(`Error! --> ${err.message}`)
        process.exit()
    })

// routes
require('./app/routes/user.route')(app)   // URL for user

app.listen(port, () => {  
  console.log(`Rest API listening on port ${port}`);
});
const PORT = process.env.PORT||3000;
//const db = require('./database.js');
const express = require('express');
const db = require('./dbConnect');
const app = express();
var cors = require('cors');
const setRouts = require('./routs')
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get('/welcome', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

setRouts(app,db);

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
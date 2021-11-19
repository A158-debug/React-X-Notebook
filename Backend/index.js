const express = require('express');
const connectToMongo = require('./db');

connectToMongo()
const app = express();
const port = 27017;

app.use('/',(req, res) => {
    res.send(`My name is Abhishek Kumar`)
})
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
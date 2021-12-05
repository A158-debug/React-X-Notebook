const express = require('express');
const connectToMongo = require('./db');
connectToMongo()

const app = express();
const port = 5000;

app.use(express.json())

// Routers
app.use('/api/auth', require('./routes/auth'))
app.get('api/notes',require('./routes/notes'))

//Listening to the port
app.listen(port, () => {
  console.log(`i-Notebook run on server http://localhost:${port}`);
});
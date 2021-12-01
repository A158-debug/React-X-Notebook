const express = require('express');
const connectToMongo = require('./db');
connectToMongo()

const app = express();
const port = 3000;

app.use(express.json())

// app.use('/',(req, res) => {
//     res.send(`My name is Abhishek Kumar`)
// })


// Routers
app.use('/api/auth', require('./routes/auth'))
// app.get('api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
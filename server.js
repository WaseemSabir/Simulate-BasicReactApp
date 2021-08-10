const express = require('express')
const app = express()
var cors = require('cors');
const port = 4400

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Only post req")
})

app.post('/', (req, res) => {
  console.log('Got body:', req.body);
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

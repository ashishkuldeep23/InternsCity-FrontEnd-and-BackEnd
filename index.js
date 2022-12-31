const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors')
const route = require("./src/router/router")
const app = express();

// // // Below is for read our local .env file and it's value.
require('dotenv').config()
// console.log(process.env.TEST) 
// console.log(process.env.TOKEN) 


app.use(express.json())
app.use(cors())



mongoose.connect( process.env.TOKEN, {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )




// // // Below for Home page 
app.use(express.static('public'))

app.get("/" , (req ,res)=>{
    res.sendFile(process.cwd() + "/public/index.html")
})


app.use('/', route)

const port = process.env.PORT || 3001

app.listen(port, function () {
    console.log('Express app running on port ' + port)
});

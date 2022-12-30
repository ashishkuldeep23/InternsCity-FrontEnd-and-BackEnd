const express = require('express');
const mongoose  = require('mongoose');
// const multer = require('multer')
const cors = require('cors')
const route = require("./src/router/router")
const app = express();

// // // Below is for read our local .env file and it's value.
require('dotenv').config()


app.use(express.json())

// app.use(multer().any())

app.use(cors())



mongoose.connect( "mongodb+srv://izazsarkar11:pQ1xcwJzAI5R7SC6@izazlithium.7ghyokt.mongodb.net/Project-2", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



// // // In below line i'm testing .env file is working or not
// const test = process.env.Test
// console.log(test)


// // // Below for Home page 

app.use(express.static('public'))

app.get("/" , (req ,res)=>{
    res.sendFile(process.cwd() + "/public/index.html")
})


app.use('/', route)

// app.use( (req ,res) => {
//     res.status(404).send({status : false , message :`Page Not Found , Given URL ${req.url} is incorrect for this application.`})
// })

const port = process.env.PORT || 3001

app.listen(port, function () {
    console.log('Express app running on port ' + port)
});

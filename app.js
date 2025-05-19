const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const adminRouter = require('./routes/users')
const authJwt = require('./middlewares/jwt')
const errorHandler = require('./middlewares/error_handler')
require('dotenv/config')
const app = express()
const API = process.env.API_URL
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(authJwt())
app.use(errorHandler)
// app.options('*', cors())


app.use(`${API}/`,authRouter)
app.use(`${API}/users`,usersRouter)
app.use(`${API}/admin`,adminRouter)



//Start the server
const hostname = process.env.HOSTNAME
const port = process.env.PORT

mongoose.connect(process.env.MONGODB_STRING_SESSION).then(() => { 
    console.log("connected to database")
}).catch((error)=>{
    console.error(error)
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

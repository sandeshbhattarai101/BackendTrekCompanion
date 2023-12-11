const express = require("express")
const app = express();
const { connectDatabase } = require("./database/database")
const cors = require("cors")
const cookieParser = require('cookie-parser')

//   ROUTES HERE
const authRoute = require("./routes/authRoute")
const destinationRoute = require("./routes/destinationRoute")
const helpRoute = require("./routes/helpRoute")


// ROUTES END HERE


// TELL NODE TO USE DOTENV
require("dotenv").config()

app.use(cors({
  origin : "http://localhost:5173"
}
))


//DATABASE CONNECTION FUNCTION FROM database.js
connectDatabase()


app.use(cookieParser()) //token lai browser ma save ra browser bata lina help garxa
// node js lai form bata aako data parse gar vaneko ho jun json format ma hunxa
app.use(express.json());
app.use(express.urlencoded({extended:true})) //kaile kaai url encoded ni huna sakxa data tesaile 


// nodejs lai  file access garna dey vaneko hae yo code lay (browser ma/ frontend ma access garna payo uploads/ vitra ko file)
app.use(express.static("./uploads/"))


app.use("",authRoute)
app.use("",destinationRoute)
app.use("",helpRoute)

const PORT = process.env.PORT

app.listen(PORT,(res, req )=>{
  console.log(`Server has started at port ${PORT}`)
})
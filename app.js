const express = require("express")
const app = express();
const { connectDatabase } = require("./database/database")
const cors = require("cors")

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

// node js lai form bata aako data parse gar vaneko ho jun json format ma hunxa
app.use(express.json());
app.use(express.urlencoded({extended:true})) //kaile kaai url encoded ni huna sakxa data tesaile 

//DATABASE CONNECTION FUNCTION FROM database.js
connectDatabase()


app.use("",authRoute)
app.use("",destinationRoute)
app.use("",helpRoute)

const PORT = process.env.PORT

app.listen(PORT,(res, req )=>{
  console.log(`Server has started at port ${PORT}`)
})
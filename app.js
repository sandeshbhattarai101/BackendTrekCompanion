const express = require("express")
const app = express();

// TELL NODE TO USE DOTENV
require("dotenv").config()

const { connectDatabase } = require("./database/database")
const cors = require("cors")
const cookieParser = require('cookie-parser')

//   ROUTES HERE
const authRoute = require("./routes/authRoute")
const guideAuthRoute = require("./routes/guideAuthRoute")
const guideRoute = require("./routes/guideRoute")
const destinationRoute = require("./routes/destinationRoute")
const helpRoute = require("./routes/helpRoute")
const paymentRoute = require("./routes/paymentRoute")
const orderRoute = require("./routes/orderRoute")
const adminUsersRoute = require("./routes/adminUsersRoute")
const userProfileRoute = require("./routes/userProfileRoute")
const guideProfileRoute = require("./routes/guideProfileRoute")
const userReviewRoute = require("./routes/userReviewRoute")


// ROUTES END HERE



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
app.use("",guideAuthRoute)
app.use("",guideRoute)
app.use("",destinationRoute)
app.use("",helpRoute)
app.use("",orderRoute)
app.use("",paymentRoute)
app.use("",adminUsersRoute)
app.use("",userProfileRoute)
app.use("",guideProfileRoute)
app.use("",userReviewRoute)

const PORT = process.env.PORT

app.listen(PORT,(res, req )=>{
  console.log(`Server has started at port ${PORT}`)
})
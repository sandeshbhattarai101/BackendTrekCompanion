const express = require("express")
const app = express();
//const { exec } = require('child_process');
//const { promisify } = require('util');
 //const { spawn } = require('child_process');

// TELL NODE TO USE DOTENV
require("dotenv").config()

const { connectDatabase } = require("./database/database")
const cors = require("cors")
const cookieParser = require('cookie-parser')

// Node lai socket.io use garna Server Class banako
//const {Server} = require("socket.io")

// require express-session and connect-flash
const flash = require("connect-flash")

//   ROUTES HERE
const authRoute = require("./routes/authRoute")
// const guideAuthRoute = require("./routes/guideAuthRoute")
// const guideRoute = require("./routes/guideRoute")
const chatRoute = require("./routes/chatRoute")
const messageRoute = require("./routes/messageRoute")
const destinationRoute = require("./routes/destinationRoute")
const helpRoute = require("./routes/helpRoute")
const paymentRoute = require("./routes/paymentRoute")
const orderRoute = require("./routes/orderRoute")
const adminUsersRoute = require("./routes/adminUsersRoute")
const userProfileRoute = require("./routes/userProfileRoute")
const userReviewRoute = require("./routes/userReviewRoute")


// ROUTES END HERE


const corsOptions = {
  origin : "http://localhost:5173",
  credentials: true,
 
};

app.use(cors(corsOptions));



//DATABASE CONNECTION FUNCTION FROM database.js
connectDatabase()





app.use(flash())



app.use(cookieParser()) //token lai browser ma save ra browser bata lina help garxa
// node js lai form bata aako data parse gar vaneko ho jun json format ma hunxa
app.use(express.json());
app.use(express.urlencoded({extended:true})) //kaile kaai url encoded ni huna sakxa data tesaile 


// nodejs lai  file access garna dey vaneko hae yo code lay (browser ma/ frontend ma access garna payo uploads/ vitra ko file)
app.use(express.static("./uploads/"))


app.use("",authRoute)
app.use("",chatRoute)
app.use("",messageRoute)
app.use("",destinationRoute)
app.use("",helpRoute)
app.use("",orderRoute)
app.use("",paymentRoute)
app.use("",adminUsersRoute)
app.use("",userProfileRoute)
app.use("",userReviewRoute)


// Recommendation part

// app.get('/recommend', async (req, res) => {
//   const variableValue = req.query.destination;
//   //console.log(variableValue)

//   const jupyterExecutable = 'C:\\Users\\Sandesh\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\jupyter.exe';


//   const jupyterProcess = spawn(jupyterExecutable, ['nbconvert', '--to', 'script', 'C:\\Users\\Sandesh\\Desktop\\BackendTrekCompanion\\Trekrecommender.ipynb']);
  
//   // Pass variable value to Jupyter script via standard input
//   jupyterProcess.stdin.write(`destination = "${variableValue}"\n`);
//   jupyterProcess.stdin.end();
  
 
// // Handle Jupyter process events
// jupyterProcess.stdout.on('data', (data) => {
//   console.log(`Jupyter script output: ${data}`);
// });

// jupyterProcess.stderr.on('data', (data) => {
//   console.error(`Error from Jupyter script: ${data}`);
// });

// jupyterProcess.on('close', (code) => {
//   console.log(`Jupyter script exited with code ${code}`);
// });

//     });


// app.get('/recommend', (req, res) => {
//   const destination = req.query.destination;

//   // Call Python script with the given destination
//   const command = `C:\Users\Sandesh\AppData\Local\Programs\Python\Python311\python.exe recommender.py ${destination}`;
//   exec(command, (error, stdout, stderr) => {
//       if (error) {
//           console.error(`Error: ${stderr}`);
//           res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//           const recommendations = stdout.trim().split('\n');
//           res.json({ recommendations });
//       }
//   });
// });




// app.get('/recommend', async (req, res) => {
//   // Extract variable value from the query parameters
//   const variableValue = req.query.destination;
//   console.log(variableValue);

//   // Replace 'python' with the correct command to invoke the Python interpreter on your system
//   const pythonExecutable = 'C:\Users\Sandesh\AppData\Local\Programs\Python\Python311\python.exe';

//   // Replace 'path/to/your_script.py' with the actual path to your Python script
//   const pythonScript = 'C:\\Users\\Sandesh\\Desktop\\BackendTrekCompanion\\Trekrecommender.py';

//   // Spawn a Python process, passing the variable value as a command-line argument
//   const pythonProcess = spawn(pythonExecutable, [pythonScript, variableValue]);

//   // Variables to capture output from the Python script
//   let pythonScriptOutput = '';
//   let pythonScriptError = '';

//   // Handle Python process events
//   pythonProcess.stdout.on('data', (data) => {
//     pythonScriptOutput += data;
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     pythonScriptError += data;
//   });

//   pythonProcess.on('close', (code) => {
//     if (code === 0) {
//       // Successful execution
//       try {
//         // Parse the JSON-formatted result from the Python script
//         const resultObject = JSON.parse(pythonScriptOutput);

//         // Access the result in your Node.js code
//         const processedValue = resultObject.result;

//         // Send the processed value as a response
//         res.send(`Processed value in Node.js: ${processedValue}`);
//       } catch (error) {
//         console.error('Error parsing JSON result:', error);
//         res.status(500).send('Internal Server Error');
//       }
//     } else {
//       // Python script exited with an error
//       console.error(`Error from Python script: ${pythonScriptError}`);
//       res.status(500).send('Internal Server Error');
//     }
//   });
// });



const PORT = process.env.PORT

 const server = app.listen(PORT,(res, req )=>{
  console.log(`Server has started at port ${PORT}`)
})


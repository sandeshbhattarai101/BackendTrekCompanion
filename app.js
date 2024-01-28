const express = require("express")
const app = express();

 const { spawn } = require('child_process');

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
const userReviewRoute = require("./routes/userReviewRoute");
const Destination = require("./model/destinationModel");


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


app.get('/recommend', async (req, res) => {
  // Extract variable value from the query parameters
  const variableValue = req.query.destination;
  

  // Replace 'python' with the correct command to invoke the Python interpreter on your system
  const pythonExecutable = 'C:\\Users\\ACER\\anaconda3\\python.exe';

  // Replace 'path/to/your_script.py' with the actual path to your Python script
  const pythonScript = 'C:\\Users\\ACER\\Desktop\\BackendTrekCompanion\\Trekrecommender.py';
  

  // Spawn a Python process, passing the variable value as a command-line argument
  const pythonProcess = spawn(pythonExecutable, [pythonScript, variableValue]);

  // Variables to capture output from the Python script
  let pythonScriptOutput = '';
  let pythonScriptError = '';

  // Handle Python process events

pythonProcess.stdout.on('data', (data) => {
    pythonScriptOutput += data.toString();  // Convert data to string
});

pythonProcess.on('close', (code) => {
  if (code === 0) {
    // Successful execution
    try {
      // Parse the JSON-formatted result from the Python script
      const resultObject = JSON.parse(pythonScriptOutput);

      // Access the result in your Node.js code
      const processedValue = resultObject.result;

      // Send the processed value as a response
      res.status(200).json({
        message : " recommended destination fetched",
        data : processedValue
      });
    } catch (error) {
console.error('Error parsing JSON result:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    // Python script exited with an error
    console.error(`Error from Python script: ${pythonScriptError}`);
    res.status(500).send('Internal Server Error');
  }
});

});




// pythonProcess.on('close', async (code) => {
//     if (code === 0) {
//         // Successful execution
//         if (!pythonScriptOutput.trim()) {
//           console.error('Empty or malformed JSON input');
//           res.status(500).send('Internal Server Error');
//           return;
//       }
      

//         try {
//             // Parse the entire accumulated output as JSON
//             const resultObject = JSON.parse(pythonScriptOutput);

//             // Access the result in your Node.js code
//             const processedValue = resultObject.result;
//             console.log('Processed value:', processedValue);

//             const recommendations = await recommendedDestination(processedValue);

//             // Send the processed value as a response
//             res.status(200).json({
//                 message: "Recommendations fetched successfully",
//                 data: 
//             });
//         } catch (error) {
//             console.error('Error parsing JSON result:', error);
//             res.status(500).send('Internal Server Error');
//         }
//     } else {
//         // Python script exited with an error
//         console.error(`Error from Python script: ${pythonScriptError}`);
//         res.status(500).send('Internal Server Error');
//     }
// });




  // pythonProcess.stdout.on('data', (data) => {
  //   pythonScriptOutput += data;
  //   console.log(JSON.parse(pythonScriptOutput))
  // });

 

//   pythonProcess.stderr.on('data', (data) => {
//     pythonScriptError += data;
//   });

//   pythonProcess.on('close', async (code) => {
//     if (code === 0) {
//       // Successful execution
//       try {
//         // Parse the JSON-formatted result from the Python script
//         const resultObject = JSON.parse(pythonScriptOutput);

//         // Access the result in your Node.js code
//         const processedValue = resultObject.result;
//         // console.log(resultObject);

//         const recommendations = await recommendedDestination(resultObject)

//         // Send the processed value as a response
//       //  res.send(`Processed value in Node.js: ${processedValue}`);

//       res.status(200).json({
//         message : " Recommendations fetched successfully",
//         data : recommendations
//     })
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




//for recommended destinations

// const recommendedDestination= async(destinations)=>{
//   console.log(destinations)
//   await Promise.all(
    
//     destinations.map(async (destination) => {
      
//   // const keyword = destination?{
//   //   destinationName :{ $regex: destination , $options: 'i'}   
//   //  } : {};
//    let resultObj = {};
//    resultObj = await Destination.find({destinationName:destination});  
//    return resultObj;
//       })
//       );
// }

// const recommendedDestination =  (destinations) => {
//   console.log(destinations,typeof(destinations));

  // try {
  //   if (!destinations || !Array.isArray(destinations)) {
  //     throw new Error('Invalid destinations array');
  //   }

  //   const results = await Promise.all(
  //     destinations.map(async (destination) => {
  //       let resultObj = {};
  //       resultObj = await Destination.find({ destinationName: destination });
  //       return resultObj;
  //     })
  //   );

  //   // Do something with the results if needed
  //   console.log(results);

  //   return results; // Return the results if necessary
  // } catch (error) {
  //   console.error('Error:', error.message);
  //   // Handle the error appropriately
  //   // For example, you might want to return an error object or throw a new error
  // }
// };







const PORT = process.env.PORT

 const server = app.listen(PORT,(res, req )=>{
  console.log(`Server has started at port ${PORT}`)
})

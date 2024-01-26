const express = require("express");
const { Connection } = require("./config/db");
const UserRouter = require("./routes/User.route");
const PostRouter = require("./routes/Post.route");
const cors =  require("cors");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors())


app.get('/',(req,res)=>
{
  res.send("Welcome")
})


app.use('/user', UserRouter)
app.use('/post', PostRouter)

// Error handlers
const PORT = process.env.PORT || 8001;
// app.use((err, req,res, next)=>
// {
//     const status = err.status || 500
//     const message = err.message || "Something went wrong"
//     return res.status(status).json({
//         success:false,
//         status,
//         message
//     })

// })

 


app.listen(PORT, async() => {
  try {
    await Connection
    console.log("Listening on port " + process.env.PORT);
  } catch (error) {
    console.log("Not Connected");
  }
});

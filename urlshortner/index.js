const express =require("express")
const dotenv=require("dotenv");
const connectDB = require("./config/config");
dotenv.config();
const cors=require("cors");
const urlRoutes = require("./routes/routes");
const port=process.env.PORT ||8080;

const app=express();
app.use(cors())
app.use(express.json())

app.use('/', urlRoutes);

app.listen(port,()=>{
    connectDB()
    console.log("listening to 8080")
})


